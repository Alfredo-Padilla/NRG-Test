import { FC, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    let sidebarMenu = null;

    useEffect(() => {
        if (!localStorage.getItem('user') || user === null) {
            window.location.href = '/login';
        }
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className={"sidebar flex flex-col items-center justify-start h-full bg-white text-black select-none overflow-hidden transition-all " + (isOpen ? "open" : "")}>
            {/* sidebarMenu */}
            {sidebarMenu = (
                <div className="w-full">
                    {user.groups[0].name === 'admin' && (
                        <>
                            <SidebarItem label="Deals" path="/dashboard/deals"/>
                            <SidebarItem label="Counterparties" path="/dashboard/counterparties" />
                            <SidebarItem label="Users" path="/dashboard/users" />
                            <SidebarItem label="Principals" path="/dashboard/principals" />
                            <SidebarItem label="Settings" path="/dashboard/settings" />
                            <SidebarItem label="Log Out" path="/logout" />
                        </>
                    )}
                    {user.groups[0].name === 'user' && (
                        <>
                            <SidebarItem label="Deals" path="/dashboard/deals"/>
                            <SidebarItem label="Counterparties" path="/dashboard/counterparties" />
                            <SidebarItem label="Settings" path="/dashboard/settings" />
                            <SidebarItem label="Settings" path="/dashboard/settings" />
                            <SidebarItem label="Log Out" path="/logout" />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;