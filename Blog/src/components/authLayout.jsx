import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useSelector } from "react-redux";
import authService from "../service/auth";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./index";

export default function authLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);
  const authStatus = useSelector((state) => state.auth.state);

  useEffect(() => {
    if (authentication && authStatus) {
      //   setloader(false);
      navigate("/login");
    } else {
      navigate("/");
    }
    setloader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <LoadingSpinner /> : children;
}
