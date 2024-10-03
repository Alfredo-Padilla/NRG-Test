/* "use client";
import { useState } from "react";
import localFont from "next/font/local";
import "./styles.css";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <div className="">
                
                {children}
            </div>
        </body>
        </html>
    );
}
 */

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
      <main className="flex flex-row items-center justify-start w-full flex-1 text-center">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}  />
        <div className={"flex flex-col items-center justify-start h-full bg-gray-light transition-all p-4 " + (sidebarOpen ? 'w-4/5' : 'w-full')}>
          {children}
        </div>
      </main>
    </div>
  );
}