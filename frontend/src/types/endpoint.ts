export interface Endpoint {
  id: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description?: string;
  parameters?: EndpointParameter[];
  responses?: EndpointResponse[];
}

export interface EndpointParameter {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
  description?: string;
}
