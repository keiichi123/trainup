import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const editProfile = async (updatedUser) => {
    setIsLoading(true);
    setError(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser.token;
    const response = await fetch("/api/users/updateuser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      data.token = token;
      dispatch({ type: "UPDATE_USER", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      navigate("/");
    }
  };

  return { editProfile, isLoading, error };
};
