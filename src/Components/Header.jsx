import { useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import React, { useState } from "react";
import { Notification } from "./Notification";
import "../css/App.css";
import Switch from "./Switch";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const { t } = useTranslation();

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
  };

  return (
    <header className="header">
      <div className="menu-icon" onClick={toggleMenu}>
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

      <h1 className="logo">GoalPlan</h1>

      <div className="switch-box">
        <Switch />
      </div>

      {/* 🌐 Language Selector */}
      <LanguageSelector language={language} onSelectLanguage={setLanguage} />

      <div className="notification">
        <Notification />
      </div>

      <nav className={`menu ${menuVisible ? "show" : ""}`}>
        <ul>
          <li>
            <a href="/Dashboard">{t("Dashboard")}</a>
          </li>
          <li>
            <a href="/task-overview">{t("Task Overview")}</a>
          </li>
          <li>
            <a href="/complete-task">{t("Archived Complete Task")}</a>
          </li>
          <li>
            <button className="button-logout" onClick={signOut}>
              {t("Logout")}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
