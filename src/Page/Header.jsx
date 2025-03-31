import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import React, { useState } from "react";
import { Notification } from "../Components/Notification";

export function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex items-center relative">
      <div className="fas fa-bars mr-4 cursor-pointer" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"
          />
        </svg>
      </div>
      <h1 className="text-lg font-bold">Todo-List</h1>
      <div className="ml-auto mr-4">
        <Notification />
      </div>

      <nav
        id="menu"
        className={`absolute top-full left-0 w-full bg-white shadow-lg ${menuVisible ? "" : "hidden"
          }`}
      >
        <ul className="flex flex-col ">
          <li className="p-4 border-b border-gray-200 hover:bg-gray-200">
            <a href="/Dashboard" className="text-gray-800">
              Task
            </a>
          </li>
          <li className="p-4 border-b border-gray-200 hover:bg-gray-200">
            <a href="/complete-task" className="text-gray-800">
              Complete Task
            </a>
          </li>

          <li className="p-4 hover:bg-gray-200">
            <button className="text-gray-800 cursor-pointer" onClick={signOut}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
