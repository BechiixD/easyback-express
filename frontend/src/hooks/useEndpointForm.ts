import { useState } from "react";
import { Endpoint } from "../types/endpoint";

export function useEndpointForm() {
  const [formData, setFormData] = useState<Partial<Endpoint>>({
    path: "",
    method: "GET",
    description: "",
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.path) newErrors.path = "Path is required";
    if (!formData.method) newErrors.method = "Method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ path: "", method: "GET", description: "" });
    setErrors({});
  };

  return { formData, errors, updateField, validateForm, resetForm };
}
