import { BrowserRouter, Routes, Route } from "react-router";

import { LoginPage } from "./Page/LoginPage";
import { SignupPage } from "./Page/SignupPage";
import { HomePage } from "./Page/HomePage";
import { DashBoardPage } from "./Page/DashboardPage";
import { ProtectedRoute } from "./Supabase/ProtectedRoute";
import { CreateTaskPage } from "./Page/CreateTaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />

        <Route path="/test" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
