export interface Endpoint {
  id: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description?: string;
  parameters?: EndpointParameter[];
  responses?: EndpointResponse[];
  headers?: EndpointHeader[];
}

export interface EndpointParameter {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
  description?: string;
}

export interface EndpointHeader {
  id: string;
  key: string;
  value: string;
}

export interface EndpointResponse {
  status: number;
  description: string;
}
