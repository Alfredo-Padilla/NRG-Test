import { FC, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
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
        <div className={"sidebar shadow transition-all " + (isOpen ? "open" : "")}>
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
                            <SidebarItem label="Log Out" path="/logout" />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;