import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutesInstructor({isInstructorAuth}) {
    return isInstructorAuth ? <Outlet /> : <Navigate to="/login" />;
  }

export default PrivateRoutesInstructor
