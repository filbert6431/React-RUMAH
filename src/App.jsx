import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Routes, Route } from "react-router-dom";
import './assets/tailwind.css';
import React, { Suspense } from "react";

function App() {

  const AdminLayout = React.lazy(() => import("./Layout/AdminLayout"));
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const OrdersDetail = React.lazy(() => import("./pages/OrdersDetail"));
  const POS = React.lazy(() => import("./pages/POS"));

  const Customer = React.lazy(() => import("./pages/Customer"));
  const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));

  const Membership = React.lazy(() => import("./pages/Membership"));
  const MemberShipDetail = React.lazy(() => import("./pages/MemberShipDetail"));
  const Staff = React.lazy(() => import("./pages/Staff"));
  const Reviews = React.lazy(() => import("./pages/Reviews"));
  const Products = React.lazy(() => import("./pages/Products"));
  const Promo = React.lazy(() => import("./pages/Promo"));

  const AuthLayout = React.lazy(() => import("./Layout/AuthLayout"));
  const Login = React.lazy(() => import("./pages/Auth/Halaman_login"));
  const Register = React.lazy(() => import("./pages/Auth/register"));

  const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));


  return (
    <Suspense fallback={<AiOutlineLoading3Quarters className="animate-spin" />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/Orders/:id" element={<OrdersDetail/>} />

          <Route path="/Customer" element={<Customer/>} />
          <Route path="/Customer/:id" element={<CustomerDetail />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/Promo" element={<Promo />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Products" element={<Products />} />

          <Route path= "/Membership/:id" element={<MemberShipDetail/>} />
          <Route path="/Membership" element={<Membership />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        {/* Halaman Error Spesifik */}
        <Route path="/Unauthorized" element={<ErrorPage code="401" />} />
        <Route path="/Forbidden" element={<ErrorPage code="403" />} />
        <Route path="/404" element={<ErrorPage code="404" />} />

        {/* Catch-all untuk 404 Not Found */}
        <Route path="*" element={<ErrorPage code="404" />} />
      </Routes>

    </Suspense>
  );
}

export default App;
