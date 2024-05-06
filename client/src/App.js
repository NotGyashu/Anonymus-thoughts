import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/authcontext";
import { useContext } from "react";

function App() {
    const RequireAuth = ({ children }) => {
      const { user } = useContext(AuthContext);
      console.log("User in RequireAuth:", user);
      return user ? children : <Navigate to="/login" />;
    };

  return (
    <div class="flex flex-col min-h-screen ">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
