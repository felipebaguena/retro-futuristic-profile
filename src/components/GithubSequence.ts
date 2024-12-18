type MessageUpdater = (message: string) => void;
type DelayFunction = (ms: number) => Promise<void>;

export const executeGithubSequence = async (
  addMessage: MessageUpdater,
  updateLastMessage: MessageUpdater,
  cleanupCallback: () => void,
  signal?: AbortSignal
) => {
  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => resolve(), ms);
      signal?.addEventListener("abort", () => {
        clearTimeout(timeout);
        reject(new Error("cancelled"));
      });
    });
  };

  try {
    addMessage("Iniciando conexión con GitHub...");
    await delay(800);

    addMessage("Cargando repositorios...");
    await delay(1000);

    addMessage("Preparando código...");
    for (let i = 0; i <= 100; i += 5) {
      updateLastMessage(`Preparando código: ${i}%`);
      await delay(40);
    }
    updateLastMessage("Código preparado.");
    await delay(800);

    addMessage("Viajando a GitHub...");
    await delay(1000);

    window.open("https://github.com/felipebaguena", "_blank");

    await delay(2000);
    addMessage("Limpiando terminal...");
    await delay(800);

    cleanupCallback();
  } catch (error) {
    if (error instanceof Error && error.message === "cancelled") {
      cleanupCallback();
    }
  }
};
