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

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/login", {
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
      // Si el código es válido, redirige
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigate("/");
    }
  };

  return { signin, verify2FACode, isLoading, error, requires2FA };
};
