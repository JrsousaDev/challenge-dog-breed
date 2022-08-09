import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import useAuth from "./hooks/useAuth";
import ListDogs from "./pages/listDogs";
import Register from "./pages/register";

interface IChildren {
  children: any
}

export default function AppRoutes() {

  const Private = ({ children }: IChildren) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/" />
    return children;
  }

  const UserIsAuthenticated = ({ children }: IChildren) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/list" />
    return children;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route
            path="/"
            element={
              <UserIsAuthenticated>
                <Register />
              </UserIsAuthenticated>
            }
          />

          <Route
            path="/list"
            element={
              <Private>
                <ListDogs />
              </Private>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>

  )
}