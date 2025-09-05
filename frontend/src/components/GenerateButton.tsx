import React, { useState, useEffect } from "react";
import { useEndpointContext } from "../context/EndpointContext";
import { useApi } from "../hooks/useApi";

interface GenerateButtonProps {
  className?: string;
}

function GenerateButton({ className = "" }: GenerateButtonProps) {
  const { state } = useEndpointContext();
  const { loading, error, generateCode, downloadFile, clearError } = useApi();
  const [generatedFiles, setGeneratedFiles] = useState<any>(null);
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      const API_URLS = [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://localhost:8000",
      ];

      const debug = [];

      for (const baseUrl of API_URLS) {
        try {
          debug.push(`Checking ${baseUrl}...`);
          const response = await fetch(`${baseUrl}/api/health`, {
            method: "GET",
            signal: AbortSignal.timeout(3000), // 3 second timeout
          });
          if (response.ok) {
            debug.push(`✅ Connected to ${baseUrl}`);
            setServerStatus("online");
            setDebugInfo(debug);
            return;
          } else {
            debug.push(`❌ ${baseUrl} returned ${response.status}`);
          }
        } catch (err) {
          debug.push(`❌ ${baseUrl} failed: ${err.message}`);
          continue;
        }
      }

      debug.push("No servers found. Please start with 'npm run server'");
      setDebugInfo(debug);
      setServerStatus("offline");
    };

    checkServerStatus();
  }, []);

  const handleGenerate = async () => {
    if (state.endpoints.length === 0) {
      alert("Please add at least one endpoint before generating code.");
      return;
    }

    if (serverStatus === "offline") {
      alert(
        "Backend server is not running. Please start the server with 'npm run server' in the main directory.",
      );
      return;
    }

    clearError();

    // Add debug info for generation attempt
    const newDebug = [
      ...debugInfo,
      `Attempting to generate code with ${state.endpoints.length} endpoints...`,
    ];
    setDebugInfo(newDebug);

    try {
      const result = await generateCode(state.endpoints);

      if (result) {
        setGeneratedFiles(result);
        setDebugInfo([...newDebug, "✅ Code generation successful!"]);
        // Auto-download the main server file
        await downloadFile(result.downloadUrl, result.filename);
      }
    } catch (err) {
      console.error("Generation failed:", err);
      setDebugInfo([...newDebug, `❌ Generation failed: ${err.message}`]);
    }
  };

  const handleDownloadAdditional = async (url: string, filename: string) => {
    await downloadFile(url, filename);
  };

  const isDisabled =
    state.endpoints.length === 0 || loading || serverStatus === "offline";

  return (
    <div className={`${className}`}>
      {/* Server Status Indicator */}
      <div className="mb-4 p-3 rounded-lg border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Server Status:
          </span>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                serverStatus === "online"
                  ? "bg-green-500"
                  : serverStatus === "offline"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${
                serverStatus === "online"
                  ? "text-green-700"
                  : serverStatus === "offline"
                    ? "text-red-700"
                    : "text-yellow-700"
              }`}
            >
              {serverStatus === "online"
                ? "Online"
                : serverStatus === "offline"
                  ? "Offline"
                  : "Checking..."}
            </span>
          </div>
        </div>
        {serverStatus === "offline" && (
          <div className="mt-2">
            <p className="text-xs text-red-600">
              Run{" "}
              <code className="bg-gray-100 px-1 rounded">npm run server</code>{" "}
              in the main directory
            </p>
            {debugInfo.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-gray-600 cursor-pointer">
                  Debug Info
                </summary>
                <div className="text-xs text-gray-500 mt-1 max-h-20 overflow-y-auto bg-gray-50 p-2 rounded">
                  {debugInfo.map((info, index) => (
                    <div key={index}>{info}</div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Main Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`
          w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform
          ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          }
        `}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Generate & Download</span>
          </>
        )}
      </button>

      {/* Endpoint Count Info */}
      <div className="mt-2 text-center text-sm text-gray-600">
        {state.endpoints.length} endpoint
        {state.endpoints.length !== 1 ? "s" : ""} ready
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-red-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-800 text-sm">{error}</span>
          </div>
          {debugInfo.length > 0 && (
            <details className="mt-2">
              <summary className="text-xs text-red-700 cursor-pointer">
                Technical Details
              </summary>
              <div className="text-xs text-red-600 mt-1 max-h-32 overflow-y-auto bg-red-25 p-2 rounded border">
                {debugInfo.map((info, index) => (
                  <div key={index}>{info}</div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Success Message & Additional Downloads */}
      {generatedFiles && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-3">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-800 font-medium">
              Code Generated Successfully!
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-green-700 text-sm">
              Server file downloaded automatically. Additional files:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  handleDownloadAdditional(
                    generatedFiles.packageUrl,
                    "package.json",
                  )
                }
                className="text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
              >
                📦 package.json
              </button>

              <button
                onClick={() =>
                  handleDownloadAdditional(
                    generatedFiles.readmeUrl,
                    "README.md",
                  )
                }
                className="text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
              >
                📖 README.md
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-blue-800 text-sm">
            <p className="font-medium mb-1">What gets generated:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Express.js server with your endpoints</li>
              <li>Package.json with dependencies</li>
              <li>README with setup instructions</li>
              <li>Custom headers configured</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateButton;
