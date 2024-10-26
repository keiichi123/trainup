import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createUser,
  tryLoginUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  verify2FA,
  tryChangePass,
  changeUserPass,
} from "../controllers/userController.js";

//import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
//.get(authenticate, authorizeAdmin, getAllUsers);

router.post("/trylogin", tryLoginUser);
router.post("/login", loginUser);
router.post("/verify2fa", verify2FA);
router.post("/trychangepass", tryChangePass);
router.post("/changepass", changeUserPass);
router.post("/verify2fa", verify2FA);
router.post("/logout", logoutCurrentUser);
router.post("/signup", createUser);
router.patch("/updateuser", authenticate, updateCurrentUserProfile);

router.route("/profile");
//.get(authenticate, getCurrentUserProfile)
//.put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router.route("/:id");
// .delete(authenticate, authorizeAdmin, deleteUserById)
// .get(authenticate, authorizeAdmin, getUserById)
// .put(authenticate, authorizeAdmin, updateUserById);

export default router;
