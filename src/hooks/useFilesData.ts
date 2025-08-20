import { useEffect, useState } from "react";
import type { FileModel } from "../types/FileModel";

interface UseFilesDataResult {
  filesData: FileModel[];
  loading: boolean;
  error: string | null;
}

export const useFilesData = (url: string): UseFilesDataResult => {
  const [filesData, setFilesData] = useState<FileModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilesData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const formattedResponse = await response.json();
        setFilesData(formattedResponse.files);
      } catch (err) {
        setError((err as Error).message);
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilesData();
  }, [url]);

  return { filesData, loading, error };
};
