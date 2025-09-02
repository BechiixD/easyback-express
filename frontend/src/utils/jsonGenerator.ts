import { Endpoint } from "../types/endpoint";

export function generateEndpointsJSON(endpoints: Endpoint[]): string {
  const apiConfig = {
    version: "1.0.0",
    endpoints: endpoints.map((endpoint) => ({
      path: endpoint.path,
      method: endpoint.method,
      description: endpoint.description,
      parameters: endpoint.parameters || [],
      responses: endpoint.responses || [],
    })),
  };

  return JSON.stringify(apiConfig, null, 2);
}
