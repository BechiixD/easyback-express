import { useState } from "react";
import { Endpoint, EndpointHeader } from "../types/endpoint";

export function useEndpointForm() {
  const [formData, setFormData] = useState<Partial<Endpoint>>({
    path: "",
    method: "GET",
    description: "",
    headers: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof Endpoint, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const addHeader = () => {
    const newHeader: EndpointHeader = {
      id: crypto.randomUUID(),
      key: "",
      value: "",
    };
    setFormData((prev) => ({
      ...prev,
      headers: [...(prev.headers ?? []), newHeader],
    }));
  };

  const updateHeader = (
    id: string,
    field: keyof EndpointHeader,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      headers: (prev.headers ?? []).map((header) =>
        header.id === id ? { ...header, [field]: value } : header,
      ),
    }));
  };

  const removeHeader = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      headers: (prev.headers ?? []).filter((header) => header.id !== id),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.path) newErrors.path = "Path is required";
    if (!formData.method) newErrors.method = "Method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ path: "", method: "GET", description: "", headers: [] });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    addHeader,
    updateHeader,
    removeHeader,
  };
}
