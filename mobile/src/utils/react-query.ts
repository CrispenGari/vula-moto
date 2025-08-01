import { Id } from "@/convex/_generated/dataModel";
import Constants from "expo-constants";
import { TLanguage } from "../types";
import { SERVER_BASE_URL } from "../constants";

export const translateText = async ({
  text,
  to,
}: {
  text: string;
  to: TLanguage;
}) => {
  const url = `${SERVER_BASE_URL}/api/v1/translate`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, to }),
  });
  const data = (await res.json()) as {
    success: boolean;
    translation?: string;
    error?: string;
  };
  return data;
};

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
