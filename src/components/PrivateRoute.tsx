import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}