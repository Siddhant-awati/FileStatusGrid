import type { FileModel } from "../types/FileModel";

export const getFileKey = (file: FileModel): string =>
  `${file.name}-${file.path}`;

export const getAvailableFiles = (files: FileModel[]): FileModel[] =>
  files.filter((f) => f.status === "available");

export type SelectAllState = "none" | "some" | "all";

export const getSelectAllState = (
  selectedKeys: string[],
  availableKeys: string[]
): SelectAllState => {
  if (selectedKeys.length === 0) return "none";
  if (selectedKeys.length === availableKeys.length) return "all";
  return "some";
};

export const toggleKey = (key: string, selectedKeys: string[]): string[] =>
  selectedKeys.includes(key)
    ? selectedKeys.filter((k) => k !== key)
    : [...selectedKeys, key];

export const formatDownloadMessage = (files: FileModel[]): string =>
  files
    .map((file) => `Path: ${file.path}\nDevice: ${file.device}`)
    .join("\n\n");
