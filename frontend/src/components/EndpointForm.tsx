import React from "react";
import { useEndpointContext } from "../context/EndpointContext";
import { useEndpointForm } from "../hooks/useEndpointForm";
import { Endpoint } from "../types/endpoint";

interface EndpointFormProps {
  onSuccess?: () => void;
}

function EndpointForm({ onSuccess }: EndpointFormProps) {
  const { dispatch } = useEndpointContext();
  const { formData, errors, updateField, validateForm, resetForm } =
    useEndpointForm();

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
