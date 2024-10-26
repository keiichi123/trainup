import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [requires2FA, setRequires2FA] = useState(false);
  const [secretCode, setSecretCode] = useState(null);
  const [userId, setUserId] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const trySignin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/trylogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      setRequires2FA(true);
      setUserId(data.userId);
      setSecretCode(data.secretcode);
      setIsLoading(false);
    }
  };

  const verify2FACode = async (code) => {
    const response = await fetch("/api/users/verify2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        code,
        secretCode,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setUserId(data._id);
      signin(userId);
    }
  };

  const signin = async (idUser) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUser,
      }),
    });
    const data = await response.json();
    // Si el código es válido, redirige
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: "LOGIN", payload: data });
    navigate("/");
  };

  const tryChangePass = async (email) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/trychangepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      setRequires2FA(true);
      setUserId(data.userId);
      setSecretCode(data.secretcode);
      setIsLoading(false);
    }
  };

  const verifyChangePass = async (code) => {
    const response = await fetch("/api/users/verify2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        code,
        secretCode,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return false;
    } else {
      setError("");
      setUserId(data._id);
      return true;
    }
  };

  const changeUserPass = async (idUser, passUser, confirmPass) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/users/changepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUser,
        passUser,
        confirmPass,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigate("/");
    }
  };

  return {
    trySignin,
    verify2FACode,
    verifyChangePass,
    tryChangePass,
    changeUserPass,
    isLoading,
    error,
    requires2FA,
    userId,
  };
};
