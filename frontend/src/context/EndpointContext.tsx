import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Endpoint } from "../types/endpoint";

interface EndpointState {
  endpoints: Endpoint[];
  isLoading: boolean;
  error: string | null;
}

type EndpointAction =
  | { type: "ADD_ENDPOINT"; payload: Endpoint }
  | {
      type: "UPDATE_ENDPOINT";
      payload: { id: string; endpoint: Partial<Endpoint> };
    }
  | { type: "DELETE_ENDPOINT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: EndpointState = {
  endpoints: [],
  isLoading: false,
  error: null,
};

function endpointReducer(
  state: EndpointState,
  action: EndpointAction,
): EndpointState {
  switch (action.type) {
    case "ADD_ENDPOINT":
      return {
        ...state,
        endpoints: [...state.endpoints, action.payload],
      };
    case "UPDATE_ENDPOINT":
      return {
        ...state,
        endpoints: state.endpoints.map((endpoint) =>
          endpoint.id === action.payload.id
            ? { ...endpoint, ...action.payload.endpoint }
            : endpoint,
        ),
      };
    case "DELETE_ENDPOINT":
      return {
        ...state,
        endpoints: state.endpoints.filter(
          (endpoint) => endpoint.id !== action.payload,
        ),
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Add this after the endpointReducer function

interface EndpointContextType {
  state: EndpointState;
  dispatch: React.Dispatch<EndpointAction>;
}

const EndpointContext = createContext<EndpointContextType | undefined>(
  undefined,
);

// Custom hook to use the context
export function useEndpointContext() {
  const context = useContext(EndpointContext);
  if (context === undefined) {
    throw new Error(
      "useEndpointContext must be used within an EndpointProvider",
    );
  }
  return context;
}

// Provider component
interface EndpointProviderProps {
  children: ReactNode;
}

export function EndpointProvider({ children }: EndpointProviderProps) {
  const [state, dispatch] = useReducer(endpointReducer, initialState);

  return (
    <EndpointContext.Provider value={{ state, dispatch }}>
      {children}
    </EndpointContext.Provider>
  );
}

// Export the context for direct use if needed
export { EndpointContext };
