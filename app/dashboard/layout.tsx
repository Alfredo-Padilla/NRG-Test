"use client";
import {  useState } from "react";
import Sidebar from '../components/sidebar/Sidebar';
import Menu from '../components/menu/Menu';
import './styles.css';

export default function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const newSidebarOpen = !sidebarOpen;
    setSidebarOpen(newSidebarOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Menu toggleSidebar={toggleSidebar} />
      <main className="w-full h-full">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}  />
        <div className={"flex flex-col items-center justify-start h-full bg-gray-light transition-all p-4 "}>
          {children}
        </div>
      </main>
    </div>
  );
}