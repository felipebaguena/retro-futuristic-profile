import { Dispatch, SetStateAction } from "react";

type SetLinesFunction = Dispatch<SetStateAction<string[]>>;

export const executePortfolioSequence = async (
  setLines: SetLinesFunction,
  setShowNavbar: (show: boolean) => void,
  setShowMenu: (show: boolean) => void,
  setShowWelcome: (show: boolean) => void,
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

  const commands = [
    { text: "Solicitando acceso al Portfolio...", delay: 1000 },
    {
      text: "Análisis completado",
      delay: 1200,
      loading: async (
        setLine: (text: string) => void,
        delay: (ms: number) => Promise<void>
      ) => {
        setLine("Analizando sistema...");
        await delay(1200);
        return "Análisis completado";
      },
    },
    { text: "Se requiere actualización a la última versión", delay: 1000 },
    { text: "Iniciando proceso de actualización...", delay: 800 },
    {
      text: "Actualización completada",
      delay: 1500,
      loading: async (
        setLine: (text: string) => void,
        delay: (ms: number) => Promise<void>
      ) => {
        const steps = ["Actualizando componentes..."];

        for (const step of steps) {
          setLine(step);
          await delay(600);
        }

        return "Actualización completada";
      },
    },
    { text: "Preparando nueva interfaz...", delay: 500 },
  ];

  try {
    setShowNavbar(false);
    setShowMenu(false);
    setShowWelcome(false);
    await delay(500);

    for (const command of commands) {
      if (command.loading) {
        const finalText = await command.loading((text) => {
          setLines((prev) => [...prev.slice(0, -1), text]);
        }, delay);
        setLines((prev) => [...prev.slice(0, -1), finalText]);
      } else {
        setLines((prev) => [...prev, command.text]);
      }
      await delay(command.delay);
    }

    return true;
  } catch (error) {
    if (error instanceof Error && error.message === "cancelled") {
      throw error;
    }
    setLines(["Error en la actualización. Intente nuevamente."]);
    return false;
  }
};
