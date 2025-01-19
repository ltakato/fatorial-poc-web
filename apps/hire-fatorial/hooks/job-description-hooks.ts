import { useMutation } from "@tanstack/react-query";

export function useJobDescriptionTranslate() {
  return useMutation({
    mutationFn: async (jobDescription: string) => {
      await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

      return [
        "Gestão de patrimônio",
        "Elaboração de portfóliios",
        "Acompanhamento de tendências de mercado",
        "Análise de alocações externas",
      ];
    },
  });
}
