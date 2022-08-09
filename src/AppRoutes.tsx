import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Register from "./pages/register";

interface IPrivateAndIsLogged {
  children: any
}

export default function AppRoutes() {

  const Private = ({ children }: IPrivateAndIsLogged) => {
    const isAuthenticated = true;
    // const { isAuthenticated } = useAuth();
    // if (!isAuthenticated) return <Navigate to="/" />
    if (isAuthenticated) return <Navigate to="/" />
    return children;
  }

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Private><></></Private>} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  )
}