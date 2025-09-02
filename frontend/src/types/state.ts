import { Endpoint } from "./endpoint";

export interface AppState {
  endpoints: Endpoint[];
  currentEndpoint: Partial<Endpoint>;
  isModalVisible: boolean;
  isLoading: boolean;
}
