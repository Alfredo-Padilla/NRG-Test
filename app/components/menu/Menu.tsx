import { FC, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface MenuProps {
    toggleSidebar: () => void;
}

const Menu: FC<MenuProps> = ({ toggleSidebar }) => {
    const name = localStorage.getItem('username');
    return (
        <header className="flex flex-row items-center justify-between w-full h-16 px-8 bg-gray-dark">
            <div className="flex items-center cursor-pointer" onClick={() => toggleSidebar()}>
                <Bars3Icon className="h-8 w-8 text-gray-light" />
            </div>
            <h1 className="text-2xl font-bold text-gray-light select-none">{'Welcome back ' + name}</h1>
        </header>
    );
};

export default Menu;