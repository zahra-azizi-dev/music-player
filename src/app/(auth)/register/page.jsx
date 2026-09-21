"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
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
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError(data.error?.message);
        return;
      } else {
        login(data.user, data.jwt, rememberMe);
        router.push("/");
      }
    } catch (error) {
      setError("there are some problems");
    } finally {
      setIsLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#ff2a2a_0%,#8b0000_35%,#1a0000_100%)]">
      <div className="login-container flex justify-center items-center min-h-screen">
        {isLoading && (
          <div className="fixed flex justify-center drop-shadow(0 0 12px rgba(255, 180, 80, 0.35))  items-center inset-0 z-50 backdrop-blur-lg bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.4)_0%,rgba(0,0,0,0.85)_70%)]">
            <Image
              className="relative z-10  "
              src="/mainlogo.png"
              width={100}
              height={50}
              alt="photo"
            />
          </div>
        )}
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="login-form flex w-[400] bg-black/10 backdrop-blur-lg rounded-2xl  gap-8  p-10 border  flex-col"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-32 h-32 rounded-full bg-orange-400/20 blur-3xl" />

            <Image
              src="/mainlogo.png"
              alt="gramaphon.png"
              width={160}
              height={80}
              className="relative z-10 mx-auto drop-shadow-[0_0_12px_rgba(255,180,80,0.5)]"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="input-group">
            <input
              name="username"
              value={formData.username}
              className="login-input  w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white/60 outline-none"
              type="text"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="input-group ">
            <input
              name="email"
              value={formData.email}
              className="login-input  w-full  bg-white/10 border border-white/20 rounded-lg p-3 text-white/60 outline-none"
              type="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="input-group">
            <input
              name="password"
              value={formData.password}
              className="login-input  w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white/60 outline-none"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </motion.div>

          <button
            disabled={isLoading}
            className="login-btn bg-black/40 border border-white/20 text-white font-bold py-3 rounded-lg backdrop-blur-lg hover:bg-black/60 transition duration-300 hover:scale-105 shadow-lg "
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="flex justify-between items-center text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label>Remember me</label>
            </div>

            <a href="#">Forgot Password?</a>
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