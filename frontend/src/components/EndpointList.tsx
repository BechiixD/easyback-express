import React from "react";
import { useEndpointContext } from "../context/EndpointContext";

function EndpointList() {
  const { state, dispatch } = useEndpointContext();

  const handleDeleteEndpoint = (id: string) => {
    dispatch({ type: "DELETE_ENDPOINT", payload: id });
  };

  if (state.endpoints.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No endpoints created yet. Create your first endpoint!
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Endpoints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.endpoints.map((endpoint) => (
          <div
            key={endpoint.id}
            className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200 endpoint-card"
          >
            {/* Header with method and delete button */}
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  endpoint.method === "GET"
                    ? "bg-green-100 text-green-800"
                    : endpoint.method === "POST"
                      ? "bg-blue-100 text-blue-800"
                      : endpoint.method === "PUT"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {endpoint.method}
              </span>
              <button
                onClick={() => handleDeleteEndpoint(endpoint.id)}
                className="text-red-600 hover:text-red-800 p-1 rounded transition duration-200"
                title="Delete endpoint"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            {/* Path */}
            <div className="mb-3">
              <code className="text-gray-800 font-mono text-sm bg-gray-100 px-2 py-1 rounded break-all">
                {endpoint.path}
              </code>
            </div>

            {/* Description */}
            {endpoint.description && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {endpoint.description}
                </p>
              </div>
            )}

            {/* Headers */}
            {(endpoint.headers ?? []).length > 0 && (
              <div className="border-t pt-3">
                <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Headers ({(endpoint.headers ?? []).length})
                </h4>
                <div className="space-y-1 max-h-24 overflow-y-auto headers-scroll">
                  {(endpoint.headers ?? []).map((header) => (
                    <div
                      key={header.id}
                      className="flex text-xs bg-gray-50 rounded p-1"
                    >
                      <span className="font-medium text-gray-700 mr-1">
                        {header.key}:
                      </span>
                      <span className="text-gray-600 truncate">
                        {header.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EndpointList;
