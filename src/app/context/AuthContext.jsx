"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, useEffect } from "react";
import React from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router=useRouter()
  useEffect(() => {
    const saveUser = localStorage.getItem("user");
    const session=sessionStorage.getItem('user')
    if (saveUser) {
      setUser(JSON.parse(saveUser));
    }else if (session){
      setUser(JSON.parse(session))
    }else{
      setUser(null)
    }
  }, []);
  const login = (userData, token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", token);
    }
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login")
  };
  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
