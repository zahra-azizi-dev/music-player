"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError(data.error?.message);
        return;
      } else {
        login(data.user, data.jwt);
        router.push("/");
      }
    } catch (error) {
      setError("there are some problems");
    }
  };
  const { login } = useContext(AuthContext);
  function continueAsGuest(){
    router.push("/");
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#ff2a2a_0%,#8b0000_35%,#1a0000_100%)]">
      <div className="login-container flex justify-center items-center min-h-screen">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="login-form flex w-[400] bg-white/10 backdrop-blur-lg rounded-2xl  gap-8  p-10 border  flex-col"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/mainlogo.png"
              alt="gramaphon logo"
              width={160}
              height={80}
              className="mx-auto"
            />
          </motion.div>
          <div className="input-group ">
            <input
              name="email"
              value={formData.email}
              className="login-input  w-full  bg-white/10 border border-white/20 rounded-lg p-3 text-white/60 outline-none"
              type="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              value={formData.password}
              className="login-input  w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white/60 outline-none"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button className="login-btn bg-black/40 border border-white/20 text-white font-bold py-3 rounded-lg backdrop-blur-lg hover:bg-black/60 transition duration-300 hover:scale-105 shadow-lg ">
            Login
          </button>
          <button type="button" onClick={()=>continueAsGuest()} className="login-btn bg-black/40 border capitalize border-white/20 text-white font-bold py-3 rounded-lg backdrop-blur-lg hover:bg-black/60 transition duration-300 hover:scale-105 shadow-lg ">
            Continue as Guest
          </button>
          <div className="flex justify-center items-center text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <p>
                Don't have an account? <Link href="/register">Register</Link>
              </p>
            </div>
           
          </div>
          {error && (
            <div className="error-message  mx-auto w-full bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center rounded-lg py-3 px-4 backdrop-blur-md transition duration-300">
              {error}
            </div>
          )}
        </motion.form>
      </div>
    </main>
  );
}