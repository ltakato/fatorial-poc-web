import { useMutation } from "@tanstack/react-query";

type Profile = {
  name: string;
  pictureUrl: string;
  currentJobTitle: string;
  currentCompany: string;
  linkedinUrl: string;
  matchedTags: string[];
};

export function useProfilesFind(onSuccess: () => void) {
  return useMutation({
    mutationFn: async (tags: string[]) => {
      await new Promise((resolve) => setTimeout(() => resolve(null), 3000));
      const result: Profile[] = [
        {
          name: "Mario Andrade",
          pictureUrl: "",
          currentJobTitle: "Acessor de investimentos",
          currentCompany: "BTG Pactual",
          linkedinUrl: "https://www.linkedin.com",
          matchedTags: [
            "Gestão de patrimônio",
            "Elaboração de portfóliios",
            "Acompanhamento de tendências de mercado",
            "Análise de alocações externas",
          ],
        },
      ];

      return result;
    },
    onSuccess,
  });
}
