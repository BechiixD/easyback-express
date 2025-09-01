function EndpointForm() {
  return (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md">
      <div>
        <label
          htmlFor="route"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Route:
        </label>
        <input
          type="text"
          name="route"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <select
          name="method"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Create Route
      </button>
    </form>
  );
}

export default EndpointForm;
