import { FC, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={"sidebar flex flex-col items-center justify-start h-full bg-white text-black select-none overflow-hidden transition-all " + (isOpen ? "w-1/5" : "w-0")}>
            <SidebarItem label="Home" path="/dashboard"/>
            <SidebarItem label="Contracts" path="/dashboard/contracts"/>
            <SidebarItem label="Counterparties" path="/dashboard/counterparties" />
            <SidebarItem label="Settings" path="" />
        </div>
    );
};

export default Sidebar;