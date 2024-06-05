import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../pages/not-found/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Home /></PrivateRoute>,
        errorElement: <NotFound />
    }
]);