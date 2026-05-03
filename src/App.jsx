import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Routes, Route, Navigate } from "react-router-dom";
import './assets/tailwind.css';
import React, { Suspense } from "react";

function App() {

  const AdminLayout = React.lazy(() => import("./Layout/AdminLayout"));
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const Membership = React.lazy(() => import("./pages/Membership"));

  const AuthLayout = React.lazy(() => import("./Layout/AuthLayout"));
  const Login = React.lazy(() => import("./pages/Auth/Halaman_login"));
  const Register = React.lazy(() => import("./pages/Auth/register"));

  const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));


  return (
    <Suspense fallback={<AiOutlineLoading3Quarters className="animate-spin" />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Membership" element={<Membership />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        {/* Halaman Error Spesifik */}
        <Route path="/unauthorized" element={<ErrorPage code="401" />} />
        <Route path="/forbidden" element={<ErrorPage code="403" />} />

        {/* Catch-all untuk 404 Not Found */}
        <Route path="*" element={<ErrorPage code="404" />} />
      </Routes>

    </Suspense>
  );
}

export default App;