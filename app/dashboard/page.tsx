/* "use client";
import {  useState } from "react";
import Sidebar from '../components/sidebar/Sidebar';
import Menu from '../components/menu/Menu';
import './styles.css';

export default function Dashboard() {
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
        <div className={"flex flex-col items-center justify-center h-full bg-light transition-all " + (sidebarOpen ? 'w-4/5' : 'w-full')}>
          <h1 className="text-4xl font-bold text-orange-dark">Main</h1>
        </div>
      </main>
    </div>
  );
} */
"use client";


export default function Dashboard() {
    return (
      <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-orange-dark my-4">Main</h1>
      </div>
    );
}