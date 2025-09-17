import { Routes, Route, Navigate } from "react-router-dom";
import FloatingShapes from "./components/FloatingShapes";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import EditProfile from "./Pages/EditProfile";


//Protected Routes (Authentication required).

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children;
}

//Redirect authenticated users to the home page.

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-950 flex items-center justify-center relative overflow-hidden">
        <FloatingShapes color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
        <FloatingShapes color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
        <FloatingShapes color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>} />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoutes>
                <EditProfile/>
              </ProtectedRoutes>} />

          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            } />

          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            } />

          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            } />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App;
