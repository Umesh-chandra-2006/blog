import { createBrowserRouter, RouterProvider } from "react-router";
import RouteLayout from "./components/RouteLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import ArticleCard from "./components/ArticleCard";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "user-dashboard",
          element: (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "author-dashboard",
          element: (
            <ProtectedRoute>
              <AuthorDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-dashboard",
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "user-profile",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "article",
          element: (
            <ProtectedRoute>
              <ArticleCard />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-article",
          element: (
            <ProtectedRoute>
              <AddArticle />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-article",
          element: (
            <ProtectedRoute>
              <EditArticle />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;
