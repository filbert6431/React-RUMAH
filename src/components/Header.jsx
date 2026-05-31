import { FaBell, FaSearch, FaPlus } from "react-icons/fa";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-transparent text-white py-4 px-2">

      {/* 1. Welcome Text (Sisi Kiri) */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-400 font-medium">
          Selamat datang di Doge Coffee Dashboard!
        </p>
        <h1 className="text-2xl font-bold tracking-wide">
          Always give the best service
        </h1>
      </div>

      {/* 2. Search & Right Section */}
      <div className="flex items-center gap-6 flex-1 justify-end">

        {/* Search Bar (Cokelat Gelap) */}
        <div className="relative flex items-center bg-dash-search px-4 py-2 rounded-2xl w-full max-w-xs transition-all focus-within:ring-1 focus-within:ring-dash-accent">
          <input
            type="text"
            placeholder="cari menu"
            className="bg-transparent outline-none w-full text-sm text-gray-200 placeholder-gray-400"
          />
          <FaSearch className="text-gray-400 text-sm ml-2" />
        </div>

        {/* Notification Icon */}
        <div className="relative p-2 bg-transparent cursor-pointer">
          <FaBell className="text-xl text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-dash-dark"></span>
        </div>

        {/* Profile Admin (Diego) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto p-2 hover:bg-dash-search rounded-xl"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://avatar.iran.liara.run/public/31"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-dash-accent object-cover"
                />

                <div className="text-left">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                    Admin
                  </p>
                  <p className="font-semibold text-sm text-white">
                    Diego
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 bg-dash-search border border-dash-accent/20 text-white"
          >
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <CreditCardIcon className="w-4 h-4" />
              <span>Billing</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 text-red-400 focus:text-red-400 cursor-pointer"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



      </div>
    </div>
  );
}