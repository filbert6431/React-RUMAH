import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Guest/Header";
import Footer from "../components/Guest/Footer";
import CartSidebar from "../components/Guest/CartSidebar";

export default function GuestLayout() {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart] = useState([]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFEA] text-[#2D2825] font-sans antialiased">

      <Header
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => navigate("/login")}
      />

      <main className="flex-1 w-full">

        <Outlet
          context={{
            cart,
            setIsCartOpen,
          }}
        />

      </main>

      {isCartOpen && (
        <CartSidebar
          cart={cart}
          total={0}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      <Footer />

    </div>
  );
}
