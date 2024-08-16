import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutesAdmin({isAdminAuth}) {
    return isAdminAuth ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateRoutesAdmin
