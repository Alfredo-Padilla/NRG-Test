"use client";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

interface Counterparty {
    id: number;
    name: string;
    type: number;
}

export default function Counterparties() {
    const [counterparties, setCounterparties] = useState([] as Counterparty[]);
    const [allCounterparties, setAll] = useState([]);

    useEffect(() => {
      const fetchCounterparties = async () => {
        try {
            const response = await fetch('http://178.33.249.178:8002'+''+'/api/deals/counterparties', {
              headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            });
            console.log(`Token ${localStorage.getItem('token')}`);
            if (response.ok) {
                const data = await response.json();
                setCounterparties(data);
                setAll(data);
            } else {
                console.error('Failed to fetch counterparts');
            }
        } catch (error) {
            console.error('Error fetching counterparts:', error);
        }
    }
        fetchCounterparties();
    }, []);

    const sort = (key: string) => {
        const sorted = [...counterparties].sort((a: any, b: any) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setCounterparties(sorted);
    };

    const search = (name: string) => {
        name = name.toLowerCase();
        const name_match = [...counterparties].filter((counterparty: any) => counterparty.name.toLowerCase().includes(name));
        const id_match = [...counterparties].filter((counterparty: any) => counterparty.id.toString().toLowerCase().includes(name));
        const type_match = [...counterparties].filter((counterparty: any) => counterparty.type.toString().toLowerCase().includes(name));
        // Make sure there are no duplicates in searched
        const searched = Array.from(new Set([...name_match, ...id_match, ...type_match]));
        setCounterparties(searched);

        if (name.length === 0) {
          setCounterparties(allCounterparties);
        }
    }

    return (
      <div className="dashboard-page flex flex-col items-center justify-center">
        <h1>Counterparties</h1>
        
        <div className="shadow bg-white p-4 w-full">
          <div className="flex flex-row justify-between mb-4">
            <input className='bg-gray-light p-1 mr-5' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
            <div className="flex flex-row">
              <button className='button mr-1' onClick={() => sort('id')}>Sort by ID</button>
              <button className='button mr-1' onClick={() => sort('name')}>Sort by Name</button>
              <button className='button' onClick={() => sort('type')}>Sort by Type</button>
            </div>
          </div>

          <table className="dashboard-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {counterparties.map((counterparty: Counterparty) => (
                <tr>
                    <td>{counterparty.id}</td>
                    <td>{counterparty.name}</td>
                    <td>{counterparty.type}</td>
                    <td className=" text-center"><DocumentMagnifyingGlassIcon className="h-6 w-6 mx-auto cursor-pointer" /></td>
                    <td className=" text-center"><PencilSquareIcon className="h-6 w-6 mx-auto cursor-pointer" /></td>
                    <td className=" text-center"><TrashIcon className="h-6 w-6 mx-auto cursor-pointer" /></td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
    