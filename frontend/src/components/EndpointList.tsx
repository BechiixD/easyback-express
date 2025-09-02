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
      <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
      <div className="space-y-4">
        {state.endpoints.map((endpoint) => (
          <div
            key={endpoint.id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <div className="flex justify-between items-center">
              <div>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium mr-3 ${
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
                <code className="text-gray-800 font-mono">{endpoint.path}</code>
              </div>
              <button
                onClick={() => handleDeleteEndpoint(endpoint.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </div>
            {endpoint.description && (
              <p className="text-gray-600 mt-2 text-sm">
                {endpoint.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EndpointList;
