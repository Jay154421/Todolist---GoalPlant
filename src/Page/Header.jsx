import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import "../css/Header.css";

export function Header() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
  };

  return (
    <header className="header">
      <h1>Goal Plan</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <button onClick={signOut} className="sign-out-button">
        Sign Out
      </button>
    </header>
  );
}
