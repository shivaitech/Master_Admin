import { StrictMode, useEffect, useState, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux-config/store.js";
import "./index.css";

// Loading component
const Loading = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600">Loading...</p>
    </div>
  </div>
);

const App = lazy(() => import("./App.jsx"));

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadStyles = async () => {
      try {
        await import("./assets/css/Style.css");
      } catch (error) {
        console.error("Failed to load styles:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    setIsLoading(true);
    loadStyles();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
