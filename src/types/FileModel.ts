export interface FileModel {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}
