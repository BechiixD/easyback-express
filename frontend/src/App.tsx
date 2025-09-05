import { EndpointForm } from "./components/EndpointForm";
import "./App.css";
import EndpointList from "./components/EndpointList";
import GenerateButton from "./components/GenerateButton";
import { EndpointProvider } from "./context/EndpointContext";

function App() {
  return (
    <EndpointProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              EasyBack on Express
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to EasyBack on Express! Create and manage your API
              endpoints easily.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Left Column - Endpoint Form */}
            <div className="order-1 lg:order-1 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky-form">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-green-600"
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
                  Create New Endpoint
                </h2>
                <EndpointForm />
              </div>
            </div>

            {/* Middle Column - Endpoints List */}
            <div className="order-3 lg:order-2 lg:col-span-2">
              <EndpointList />
            </div>

            {/* Right Column - Generate Button */}
            <div className="order-2 lg:order-3 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky-form">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Generate Code
                </h2>
                <GenerateButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EndpointProvider>
  );
}

export default App;
