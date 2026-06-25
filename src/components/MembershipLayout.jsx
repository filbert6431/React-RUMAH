import { Outlet } from "react-router-dom";

export default function MembershipLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#141414] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {children}
        <Outlet />
      </div>
    </div>
  );
}

