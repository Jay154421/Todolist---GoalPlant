import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./Page/LoginPage";
import { SignupPage } from "./Page/SignupPage";
import { HomePage } from "./Page/HomePage";
import { DashBoardPage } from "./Page/DashboardPage";
import { ProtectedRoute } from "./Supabase/ProtectedRoute";
import { CreateTaskPage } from "./Page/CreateTaskPage";
import { CompleteTaskPage } from "./Page/CompleteTaskPage";
import "./css/App.css";
import TestPage from "./Page/testPage";
import TestPage2 from "./Page/testPage2";
import { EditPage } from "./Page/EditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test2" element={<TestPage2 />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-task"
          element={
            <ProtectedRoute>
              <CompleteTaskPage />
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

        <Route
          path="/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
