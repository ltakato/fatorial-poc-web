import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/fatorial-app-client-http";

type ProfileFindResponse = {
  url: string;
  data: {
    fullName: string;
    profilePic: string;
    experiences: {
      title: string;
      subtitle: string;
    }[];
    skills: {
      title: string;
    }[];
  };
};
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
      const res = await apiClient.post<
        { tags: string[] },
        { data: ProfileFindResponse[] }
      >("/profile/find", {
        tags,
      });
      return res.data.map((item) => ({
        name: item.data.fullName,
        pictureUrl: item.data.profilePic,
        currentJobTitle: item.data.experiences[0]?.title,
        currentCompany: item.data.experiences[0]?.subtitle,
        linkedinUrl: item.url,
        matchedTags: item.data.skills.map(({ title }) => title),
      })) as Profile[];
    },
    onSuccess,
  });
}
