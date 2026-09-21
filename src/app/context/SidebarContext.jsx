"use client";
import { useState, createContext, useEffect,useContext } from "react";
import React from "react";
const SidebarContext = createContext();

export function useSidebar(){
  return useContext(SidebarContext)
}
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
