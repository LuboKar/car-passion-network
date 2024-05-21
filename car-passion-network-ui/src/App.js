import "./App.css";
import HomePage from "./component/page/HomePage";
import DashboardPage from "./component/page/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
