import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import trainup from "./redux/trainup.js";

import PrivateRoute from "./components/PrivateRoute.jsx";

// Auth
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/Register";

import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile.jsx";
import UserList from "./pages/Admin/UserList";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import { StrictMode } from "react";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { RutinaContextProvider } from "./context/RutinaContext.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//        Registered users
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={<Profile />} />
//       </Route>

//       <Route path="/admin" element={<AdminRoute />}>
//         <Route path="userlist" element={<UserList />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//       </Route> */}
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={trainup}>
  //   <RouterProvider router={router} />,
  // </Provider>
  <StrictMode>
    <AuthContextProvider>
      <RutinaContextProvider>
        <App />
      </RutinaContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
