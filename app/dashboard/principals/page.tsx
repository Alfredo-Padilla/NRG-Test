"use client";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

interface Principal {
    id: number;
    name: string;
    short_name: string;
}

export default function Principals() {
    const [principals, setPrincipals] = useState([] as Principal[]);
    const [allPrincipals, setAll] = useState([]);

    useEffect(() => {
      const fetchPrincipals = async () => {
        try {
            const response = await fetch('http://178.33.249.178:8002'+''+'/api/deals/principal', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPrincipals(data);
                setAll(data);
            } else {
                console.error('Failed to fetch principals');
            }
        } catch (error) {
            console.error('Error fetching principals:', error);
        }
    }
        fetchPrincipals();
    }, []);

    const sort = (key: string) => {
        const sorted = [...principals].sort((a: any, b: any) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setPrincipals(sorted);
    };

    const search = (name: string) => {
        name = name.toLowerCase();
        const name_match = [...principals].filter((principal: any) => principal.name.toLowerCase().includes(name));
        const id_match = [...principals].filter((principal: any) => principal.id.toString().toLowerCase().includes(name));
        const short_name_match = [...principals].filter((principal: any) => principal.short_name.toLowerCase().includes(name));
        // Make sure there are no duplicates in searched
        const searched = Array.from(new Set([...name_match, ...id_match, ...short_name_match]));
        setPrincipals(searched);

        if (name.length === 0) {
          setPrincipals(allPrincipals);
        }
    }

    return (
        <div className="dashboard-page flex flex-col items-center justify-center">
        <h1>Principals</h1>
        
        <div className="shadow bg-white p-4 w-full">
          <div className="flex flex-row justify-between mb-4">
            <input className='bg-gray-light p-1 mr-5' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />

            <div className="flex flex-row">
              <button className='button mr-1' onClick={() => sort('id')}>Sort by ID</button>
              <button className='button mr-1' onClick={() => sort('name')}>Sort by Name</button>
              <button className='button' onClick={() => sort('short_name')}>Sort by Short Name</button>
            </div>
          </div>

          <table className="dashboard-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {principals.map((principal: Principal) => (
                <tr>
                    <td>{principal.id}</td>
                    <td>{principal.name}</td>
                    <td>{principal.short_name}</td>
                    <td><DocumentMagnifyingGlassIcon className="h-5 w-5 text-blue-500" /></td>
                    <td><PencilSquareIcon className="h-5 w-5 text-blue-500" /></td>
                    <td><TrashIcon className="h-5 w-5 text-blue-500" /></td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}