import { useState, useCallback, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { check } from "express-validator";
import { AuthContext } from "../context/auth.context";
import { useCookies } from "react-cookie";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const { loading, request } = useHttp();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const login = useCallback((jwtToken, refreshToken, id, type) => {
    setToken(jwtToken);
    setUserId(id);
    setUserType(type);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, userType: type })
    );
    setCookie("refresh_token", refreshToken, { path: "/" });
  }, []);

  const logout = useCallback(() => {
    console.log("logout");

    setToken(null);
    setUserId(null);
    setUserType(null);

    localStorage.removeItem(storageName);
    removeCookie("refresh_token", { path: "/" });
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userType);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, userType };
};
