import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [jwt, setjwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  if (jwt) {
    fetch(`/api/auth/validate?token=${jwt}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((isValid) => {
        setIsLoading(false);
        setIsValid(isValid);
      });
  } else {
    return <Navigate to="/signinpage" />;
  }

  return isLoading ? (
    <div> ...Loading</div>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
