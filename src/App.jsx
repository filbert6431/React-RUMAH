import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Routes, Route } from "react-router-dom";
import './assets/tailwind.css';
import React, { Suspense } from "react";

function App() {

  const AdminLayout = React.lazy(() => import("./Layout/AdminLayout"));
  const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Admin/Orders"));
  const OrdersDetail = React.lazy(() => import("./pages/Admin/OrdersDetail"));
  const POS = React.lazy(() => import("./pages/Admin/POS"));

  const Customer = React.lazy(() => import("./pages/Admin/Customer"));
  const CustomerDetail = React.lazy(() => import("./pages/Admin/CustomerDetail"));

  const Membership = React.lazy(() => import("./pages/Admin/Membership"));
  const MemberShipDetail = React.lazy(() => import("./pages/Admin/MemberShipDetail"));
  const Staff = React.lazy(() => import("./pages/Admin/Staff"));
  const Reviews = React.lazy(() => import("./pages/Admin/Reviews"));
  const Products = React.lazy(() => import("./pages/Admin/Products"));
  const Promo = React.lazy(() => import("./pages/Admin/Promo"));

  const AuthLayout = React.lazy(() => import("./Layout/AuthLayout"));
  const Login = React.lazy(() => import("./pages/Auth/Halaman_login"));
  const Register = React.lazy(() => import("./pages/Auth/register"));

  const ErrorPage = React.lazy(() => import("./pages/Admin/ErrorPage"));

  const GuestLayout = React.lazy(() => import("./Layout/GuestLayout"));
  const Home = React.lazy(() =>import("./pages/Guest/Home"));
  const Menu = React.lazy(() =>import("./pages/Guest/Menu"));
  const AboutUs = React.lazy(() =>import("./pages/Guest/AboutUs"));
  const Review_Guest = React.lazy(() =>import ("./pages/Guest/Reviews"));
  const ContactUs = React.lazy(() => import("./pages/Guest/ContactUs"));
  const MemberLogin = React.lazy(() => import("./pages/Member/MemberLogin"));
  const MemberDashboard = React.lazy(() => import("./pages/Member/MemberDashboard"));


  return (
    <Suspense fallback={<AiOutlineLoading3Quarters className="animate-spin" />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/Orders/:id" element={<OrdersDetail />} />

          <Route path="/Customer" element={<Customer />} />
          <Route path="/Customer/:id" element={<CustomerDetail />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/Promo" element={<Promo />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Products" element={<Products />} />

          <Route path="/Membership/:id" element={<MemberShipDetail />} />
          <Route path="/Membership" element={<Membership />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member" element={<MemberDashboard />} />


        {/* Halaman Error Spesifik */}
        <Route path="/Unauthorized" element={<ErrorPage code="401" />} />
        <Route path="/Forbidden" element={<ErrorPage code="403" />} />
        <Route path="/404" element={<ErrorPage code="404" />} />

        {/* Catch-all untuk 404 Not Found */}
        <Route path="*" element={<ErrorPage code="404" />} />

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/Review_Guest" element={<Review_Guest/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Menu" element={<Menu/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
        </Route>

      </Routes>

    </Suspense >
  );
}

export default App;
