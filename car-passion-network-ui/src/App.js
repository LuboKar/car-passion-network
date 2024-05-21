import "./App.css";
import HomePage from "./component/page/HomePage";
import DashboardPage from "./component/page/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./component/Authentication/ProtectedRoute";
import ProtectedHome from "./component/Authentication/ProtectedHome";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedHome element={HomePage} />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={DashboardPage} />,
    },
    {
      path: "*",
      element: <ProtectedRoute element={DashboardPage} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
