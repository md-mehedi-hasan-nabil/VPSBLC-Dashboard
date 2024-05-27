import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Home /></PrivateRoute>,
    }
]);