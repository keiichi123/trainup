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
import ChangePassword from "./pages/User/ChangePassword";
import CreateRutinaPer from "./pages/User/CreateRutinaPer";
import CreateRutinaBase from "./pages/User/CreateRutinaBase";
import VerRutina from "./components/VerRutina";
import RunRutina from "./pages/User/RunRutina";
import { useRutinaContext } from "./hooks/useRutinaContext";

function App() {
  const { user } = useAuthContext();
  const { rutina } = useRutinaContext();
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
          path="/changepass"
          element={!user ? <ChangePassword /> : <Navigate to="/" />}
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
          path="/updateejerciciorutina/:id"
          element={user ? <EditRutina /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/createrutinaper"
          element={user ? <CreateRutinaPer /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/createrutinabase"
          element={user ? <CreateRutinaBase /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/verrutina"
          element={user ? <VerRutina /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/runrutina"
          element={rutina ? <RunRutina /> : <Navigate to="/" />}
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
