import { useState } from "react";

interface GenerateResponse {
  success: boolean;
  filename: string;
  downloadUrl: string;
  packageUrl: string;
  readmeUrl: string;
  generatedFiles: string[];
}

interface ApiError {
  error: string;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Try different possible backend URLs
  const API_URLS = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:8000",
  ];

  const generateCode = async (
    endpoints: any[],
  ): Promise<GenerateResponse | null> => {
    setLoading(true);
    setError(null);

    // Try each URL until one works
    for (const baseUrl of API_URLS) {
      try {
        console.log(`Trying to connect to ${baseUrl}/api/generate`);
        const response = await fetch(`${baseUrl}/api/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoints }),
        });

        if (!response.ok) {
          let errorMessage = "Failed to generate code";
          try {
            const errorData: ApiError = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        const data: GenerateResponse = await response.json();
        console.log(`Successfully connected to ${baseUrl}`);
        return data;
      } catch (err) {
        console.log(`Failed to connect to ${baseUrl}:`, err);
        // Continue to next URL
        continue;
      }
    }

    // If all URLs failed
    setError(
      "Could not connect to backend server. Please make sure the server is running on port 3001, 3000, or 8000.",
    );
    setLoading(false);
    return null;
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      // Try each base URL for downloads too
      let response: Response | null = null;
      for (const baseUrl of API_URLS) {
        try {
          response = await fetch(`${baseUrl}${url}`);
          if (response.ok) break;
        } catch {
          continue;
        }
      }

      if (!response || !response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to download file";
      setError(errorMessage);
    }
  };

  const downloadZip = async (files: { url: string; filename: string }[]) => {
    // For now, download files individually
    // In a production app, you might want to create a zip file on the server
    for (const file of files) {
      await downloadFile(file.url, file.filename);
      // Add a small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  return {
    loading,
    error,
    generateCode,
    downloadFile,
    downloadZip,
    clearError: () => setError(null),
  };
}
