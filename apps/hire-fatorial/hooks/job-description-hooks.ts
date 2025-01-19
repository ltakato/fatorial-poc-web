import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/fatorial-app-client-http";

export function useJobDescriptionTranslate(successCallback: () => void) {
  return useMutation({
    mutationFn: async (jobDescription: string) => {
      const res = await apiClient.post<
        { jobDescription: string },
        { tags: string[] }
      >("/job-description/translate", {
        jobDescription,
      });

      return res.tags as string[];
    },
    onSuccess: successCallback,
  });
}
