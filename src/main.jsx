import { StrictMode, useEffect, useState, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux-config/store.js";
import "./index.css";

// Loading component
const Loading = () => (
  <div className="loader-container">
    <div className="logo-loader">
      <img
        src="/Shivailogo.svg"
        alt="Loading"
        className="mx-auto h-20 w-20 animate-pulse"
      />
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
