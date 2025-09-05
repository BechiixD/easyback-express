import React from "react";
import { useEndpointContext } from "../context/EndpointContext";
import { useEndpointForm } from "../hooks/useEndpointForm";
import { Endpoint } from "../types/endpoint";

interface EndpointFormProps {
  onSuccess?: () => void;
}

export function EndpointForm({ onSuccess }: EndpointFormProps) {
  const { dispatch } = useEndpointContext();
  const {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    addHeader,
    updateHeader,
    removeHeader,
  } = useEndpointForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newEndpoint: Endpoint = {
      id: crypto.randomUUID(),
      path: formData.path!,
      method: formData.method!,
      description: formData.description || "",
      parameters: [],
      responses: [],
      headers: formData.headers ?? [],
    };

    dispatch({ type: "ADD_ENDPOINT", payload: newEndpoint });
    resetForm();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Route Path */}
      <div>
        <label
          htmlFor="path"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Route Path *
        </label>
        <input
          id="path"
          type="text"
          value={formData.path || ""}
          onChange={(e) => updateField("path", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
            errors.path
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:border-green-500"
          }`}
          placeholder="/api/users"
        />
        {errors.path && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.path}
          </p>
        )}
      </div>

      {/* HTTP Method */}
      <div>
        <label
          htmlFor="method"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          HTTP Method *
        </label>
        <select
          id="method"
          value={formData.method || "GET"}
          onChange={(e) => updateField("method", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
          placeholder="Describe what this endpoint does..."
        />
      </div>

      {/* Custom Headers */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Custom Headers
          </label>
          <button
            type="button"
            onClick={addHeader}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition duration-200 flex items-center space-x-1"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Header</span>
          </button>
        </div>

        <div className="space-y-3">
          {(formData.headers ?? []).map((header) => (
            <div
              key={header.id}
              className="flex space-x-3 items-center bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) =>
                    updateHeader(header.id, "key", e.target.value)
                  }
                  placeholder="Header Key (e.g., Authorization)"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) =>
                    updateHeader(header.id, "value", e.target.value)
                  }
                  placeholder="Header Value (e.g., Bearer token)"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeHeader(header.id)}
                className="text-red-600 hover:text-red-800 p-1 rounded transition duration-200"
                title="Remove header"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {(!formData.headers || formData.headers.length === 0) && (
            <div className="text-gray-500 text-sm italic text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
              No custom headers added. Click "Add Header" to add one.
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Create Endpoint
      </button>
    </form>
  );
}

export default EndpointForm;
