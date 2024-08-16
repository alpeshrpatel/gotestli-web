import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutesUser({isUserAuth}) {
    return isUserAuth ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateRoutesUser
