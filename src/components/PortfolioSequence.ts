type SetLinesFunction = React.Dispatch<React.SetStateAction<string[]>>;

export const executePortfolioSequence = async (
  setLines: SetLinesFunction,
  setShowNavbar: (show: boolean) => void,
  setShowMenu: (show: boolean) => void,
  setShowWelcome: (show: boolean) => void,
  signal?: AbortSignal
) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const addLine = (line: string) => setLines((prev) => [...prev, line]);
  const updateLastLine = (line: string) =>
    setLines((prev) => [...prev.slice(0, -1), line]);

  try {
    // Ocultamos elementos
    setShowNavbar(false);
    setShowMenu(false);
    setShowWelcome(false);
    await delay(500);

    // Iniciamos secuencia
    setLines(["Solicitando acceso al Portfolio..."]);
    await delay(2000);

    addLine("Se requiere actualización a la última versión.");
    await delay(1500);

    addLine("Iniciando actualización...");
    await delay(1000);

    // Secuencia de porcentajes
    for (let i = 0; i <= 100; i += 5) {
      if (signal?.aborted) throw new Error("cancelled");
      updateLastLine(`Progreso: ${i}%`);
      await delay(100);
    }

    addLine("Actualización completada.");
    await delay(1000);

    return true;
  } catch (error) {
    if (error instanceof Error && error.message === "cancelled") {
      throw error;
    }
    setLines(["Error en la actualización. Intente nuevamente."]);
    return false;
  }
};
