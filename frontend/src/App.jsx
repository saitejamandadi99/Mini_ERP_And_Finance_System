import Loader from "./components/Loader";


export default function App() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold text-purple-600">
        🎉 Tailwind is Working!
      </h1>

      <button className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Test Button
      </button>
      <Loader />
    </div>
  );
}
