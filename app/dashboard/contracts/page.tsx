"use client";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

interface Contract {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export default function Contracts() {
    const [contracts, setContracts] = useState([] as Contract[]);
    const [allContracts, setAll] = useState([]);

    useEffect(() => {
      const fetchContracts = async () => {
        try {
            const response = await fetch('http://178.33.249.178:8002'+'/api/deals/contacts', {
              headers: {
                  'Authorization': `Token ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json'
              }
            });
            console.log(`Token ${localStorage.getItem('token')}`);
            if (response.ok) {
                const data = await response.json();
                sort('id');
                setContracts(data);
                setAll(data);
            } else {
                console.error('Failed to fetch contracts');
            }
        } catch (error) {
            console.error('Error fetching contracts:', error);
        }
    };  


        fetchContracts();
    }, []);

    /* SORT */
    const sort = (key: string) => {
        const sorted = [...contracts].sort((a: any, b: any) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setContracts(sorted);
    };

    /* SEARCH */
    const search = (name: string) => {
        console.log(name);
        const name_match = [...contracts].filter((contract: any) => contract.name.includes(name));
        const id_match = [...contracts].filter((contract: any) => contract.id.toString().includes(name));
        const email_match = [...contracts].filter((contract: any) => contract.email.includes(name));
        const phone_match = [...contracts].filter((contract: any) => contract.phone.includes(name));
        // Make sure there are no duplicates in searched
        const searched = Array.from(new Set([...name_match, ...id_match, ...email_match, ...phone_match]));
        setContracts(searched);

        if (name.length === 0) {
          setContracts(allContracts);
        }
    }

    return (
      <div className="dashboard-page flex flex-col items-center justify-center">
        <h1>Contracts</h1>
        
        <div className="flex flex-col shadow bg-white p-4 ">
          <div className="flex flex-row justify-between mb-4">
            <input className='bg-gray-light p-1' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
            <div className="flex flex-row">
              <button className='button mr-1' onClick={() => sort('id')}>Sort by ID</button>
              <button className='button mr-1' onClick={() => sort('email')}>Sort by Email</button>
              <button className='button' onClick={() => sort('phone')}>Sort by Phone</button>
            </div>
          </div>

          <table className="table table-auto text-left">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {contracts.map((contract: Contract) => (
                <tr>
                    <td>{contract.id}</td>
                    <td>{contract.name}</td>
                    <td>{contract.email}</td>
                    <td>{contract.phone}</td>
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