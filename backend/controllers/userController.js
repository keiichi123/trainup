import User from "../models/userModel.js";
//import asyncHandler from "../middlewares/asyncHandler.js";
import { send2FACode } from "../utils/emailService.js";
import speakeasy from "speakeasy";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import validator from "validator";

const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    cpassword,
    edad,
    estatura,
    peso,
    systmedida,
  } = req.body;
  const userExists = await User.findOne({ email });

  if (
    !username ||
    !email ||
    !cpassword ||
    !password ||
    !edad ||
    !estatura ||
    !peso
  ) {
    return res.status(400).json({ error: "Ingrese todos los datos" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email no valido" });
  }
  if (userExists) {
    return res.status(400).json({ error: "El email ya está en uso" });
  }
  if (password !== cpassword) {
    return res.status(400).json({ error: "La contraseña no coincide" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Contraseña débil" });
  }
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  const edadUsuario = calcularEdad(edad);

  if (!validator.isInt(String(edadUsuario), { min: 18, max: 100 })) {
    return res.status(400).json({ error: "Edad no válida" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    edad,
    estatura,
    peso,
    systmedida,
  });

  try {
    await newUser.save();
    const token = createToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      edad: newUser.edad,
      estatura: newUser.estatura,
      peso: newUser.peso,
      systmedida: newUser.systmedida,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Datos no válidos" });
  }
};

const tryLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Ingrese todos los datos" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      const twoFACode = speakeasy.totp({
        secret: process.env.TWOFA_SECRET,
        encoding: "base32",
      });

      await send2FACode(existingUser.email, twoFACode);

      existingUser.twoFACode = twoFACode;
      await existingUser.save();

      return res.status(200).json({
        message: "Código de verificación enviado a tu correo",
        userId: existingUser._id,
        secretcode: existingUser.twoFACode,
      });
    } else {
      return res.status(400).json({ error: "Inicio de sesión fallido" });
    }
  } else {
    return res.status(400).json({ error: "Ese usuario no existe" });
  }
};

const tryChangePass = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Ingrese su correo electronico" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const twoFACode = speakeasy.totp({
      secret: process.env.TWOFA_SECRET,
      encoding: "base32",
    });

    await send2FACode(existingUser.email, twoFACode);

    existingUser.twoFACode = twoFACode;
    await existingUser.save();

    return res.status(200).json({
      message: "Código de verificación enviado a tu correo",
      userId: existingUser._id,
      secretcode: existingUser.twoFACode,
    });
  } else {
    return res.status(400).json({ error: "Ese usuario no existe" });
  }
};

const changeUserPass = async (req, res) => {
  const { idUser, passUser, confirmPass } = req.body;
  const user = await User.findById(idUser);

  if (!passUser) {
    return res.status(400).json({ error: "Ingrese su nueva contraseña" });
  }
  if (passUser !== confirmPass) {
    return res.status(400).json({ error: "La contraseña no coincide" });
  }
  if (!validator.isStrongPassword(req.body.passUser)) {
    return res.status(400).json({ error: "Contraseña débil" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.passUser, salt);
  user.password = hashedPassword;
  const updatedUser = await user.save();
  const token = createToken(res, updatedUser._id);
  return res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    edad: updatedUser.edad,
    estatura: updatedUser.estatura,
    peso: updatedUser.peso,
    systmedida: updatedUser.systmedida,
    token,
  });
};

const loginUser = async (req, res) => {
  const { idUser } = req.body;
  const user = await User.findById(idUser);
  const token = createToken(res, user._id);

  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    edad: user.edad,
    estatura: user.estatura,
    peso: user.peso,
    systmedida: user.systmedida,
    token,
  });
};

const verify2FA = async (req, res) => {
  const { userId, code, secretCode } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }
  if (secretCode === code) {
    return res.status(200).json({
      _id: user._id,
    });
  } else {
    return res.status(400).json({ error: "Código de verificación incorrecto" });
  }
};

const logoutCurrentUser = async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getCurrentUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
};

const updateCurrentUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.edad = req.body.edad || user.edad;
    user.estatura = req.body.estatura || user.estatura;
    user.peso = req.body.peso || user.peso;
    user.systmedida = req.body.systmedida;

    if (req.body.password) {
      if (!validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({ error: "Contraseña débil" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    if (!validator.isInt(String(user.edad), { min: 18, max: 100 })) {
      return res.status(400).json({ error: "Edad no válida" });
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      edad: updatedUser.edad,
      estatura: updatedUser.estatura,
      peso: updatedUser.peso,
      systmedida: updatedUser.systmedida,
    });
    return;
  } else {
    res.status(404);
    return res.status(400).json({ error: "Ese usuario no existe" });
  }
};

const deleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export {
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
};
