import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const email = localStorage.getItem("email");

  if (!email) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}