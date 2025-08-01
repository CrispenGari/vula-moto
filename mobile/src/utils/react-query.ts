import { Id } from "@/convex/_generated/dataModel";
import Constants from "expo-constants";
export const uploadFile = async ({ file }: { file: Blob }) => {
  const url = `${Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_SITE!}/upload-file`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const fileId = await res.json();
  return {
    id: fileId as Id<"_storage">,
  };
};
