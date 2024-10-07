"use client";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

interface User {
    id: number;
    username: string;
    groups: number[];
    is_staff: boolean;
}

export default function Users() {
    const [users, setUsers] = useState([] as User[]);
    const [allUsers, setAll] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
            const response = await fetch('http://178.33.249.178:8002'+''+'/api/auth/users', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                setAll(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
        fetchUsers();
    } , []);

    const sort = (key: string) => {
        const sorted = [...users].sort((a: any, b: any) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setUsers(sorted);
    };

    const search = (name: string) => {
        name = name.toLowerCase();
        const name_match = [...users].filter((user: any) => user.username.toLowerCase().includes(name));
        const id_match = [...users].filter((user: any) => user.id.toString().toLowerCase().includes(name));
        const groups_match = [...users].filter((user: any) => user.groups.toString().toLowerCase().includes(name));
        // Make sure there are no duplicates in searched
        const searched = Array.from(new Set([...name_match, ...id_match, ...groups_match]));
        setUsers(searched);

        if (name.length === 0) {
          setUsers(allUsers);
        }
    }

    return (
        <div className="dashboard-page flex flex-col items-center justify-center">
            <h1>Users</h1>
            
            <div className="shadow bg-white p-5 w-full">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex-col">
                        <h2 className="mb-2">Search</h2>
                        <input className='bg-gray-light p-1' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
                    </div>
                    
                    <div className="flex-col">
                        <h2 className="mb-2">Sort By</h2>
                        <div className="flex flex-row">
                            <button className='button mr-1' onClick={() => sort('id')}>ID</button>
                            <button className='button mr-1' onClick={() => sort('username')}>Username</button>
                            <button className='button' onClick={() => sort('is_staff')}>Staff</button>
                        </div>
                    </div>
                </div>

                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Groups</th>
                            <th>Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.groups}</td>
                            <td>{user.is_staff}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}