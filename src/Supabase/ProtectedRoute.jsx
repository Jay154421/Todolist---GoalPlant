import React, { useEffect, useState } from "react";
import supabase from "./SupabaseClient";
import { Navigate } from "react-router-dom";
import { Loading } from "../Components/Loading";

export function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (authenticated) {
      return <>{children}</>;
    }
    return <Navigate to="/"></Navigate>;
  }
}
