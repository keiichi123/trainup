import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SingUp";
import UserHome from "./pages/User/UserHome";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import EditPerfil from "./pages/User/EditPerfil";
import EditRutina from "./pages/User/EditRutina";
import FrameObjetivos from "./pages/User/FrameObjetivos";
import FrameDescanso from "./pages/User/FrameDescanso";

function App() {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <SignIn /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        ></Route>

        <Route
          path="/"
          element={user ? <UserHome /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/updateuser"
          element={user ? <EditPerfil /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/updaterutina/:id"
          element={user ? <EditRutina /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/frameobjetivos"
          element={user ? <FrameDescanso /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   return (
//     <>
//       <ToastContainer/>
//       <Navigation/>
//       <main className="py-3">
//         <Outlet />
//       </main>
//     </>
//   )
// }

export default App;
