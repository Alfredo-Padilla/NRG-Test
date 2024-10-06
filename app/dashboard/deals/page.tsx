"use client";
import { DocumentMagnifyingGlassIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

interface Deal {
    id: string,
    code: string,
    trade_date: string,
    status: string,
    proposed_to: string,
    sense: string,
    volume: number,
    measurement_unit: string,
    fixed_price: number,
    counterparty: {
        id: number,
        name: string,
        type: number
    },
    commodity_group: string,
    broker: string
}

export default function Deals() {
    const [deals, setDeals] = useState([] as Deal[]);
    const [allDeals, setAll] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch('http://178.33.249.178:8002'+'/api/deals/?scenario=datatable', {
                    headers: {
                        authorization: `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setDeals(data);
                    setAll(data);
                } else {
                    console.error('Failed to fetch deals');
                }
            } catch (error) {
                console.error('Error fetching deals:', error);
            }
        }
        fetchDeals();
    }, []);

    const sort = (key: string) => {
        const sorted = [...deals].sort((a: any, b: any) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setDeals(sorted);
    };

    const search = (name: string) => {
        name = name.toLowerCase();
        const code_match = [...deals].filter((deal: any) => deal.code.toLowerCase().includes(name));
        const trade_date_match = [...deals].filter((deal: any) => deal.trade_date.toLowerCase().includes(name));
        const status_match = [...deals].filter((deal: any) => deal.status.toLowerCase().includes(name));
        const proposed_to_match = [...deals].filter((deal: any) => deal.proposed_to.toLowerCase().includes(name));
        const sense_match = [...deals].filter((deal: any) => deal.sense.toLowerCase().includes(name));
        const volume_match = [...deals].filter((deal: any) => deal.volume.toString().toLowerCase().includes(name));
        const measurement_unit_match = [...deals].filter((deal: any) => deal.measurement_unit.toLowerCase().includes(name));
        const fixed_price_match = [...deals].filter((deal: any) => deal.fixed_price.toString().toLowerCase().includes(name));
        const counterparty_match = [...deals].filter((deal: any) => deal.counterparty.name.toLowerCase().includes(name));
        const commodity_group_match = [...deals].filter((deal: any) => deal.commodity_group.toLowerCase().includes(name));
        const broker_match = [...deals].filter((deal: any) => deal.broker.toLowerCase().includes(name));
        // Make sure there are no duplicates in searched
        const searched = Array.from(new Set([...code_match, ...trade_date_match, ...status_match, ...proposed_to_match, ...sense_match, ...volume_match, ...measurement_unit_match, ...fixed_price_match, ...counterparty_match, ...commodity_group_match, ...broker_match]));
        setDeals(searched);

        if (name.length === 0) {
            setDeals(allDeals);
        }
    }

    return (
        <div className="dashboard-page flex flex-col items-center justify-center">
            <h1>Deals</h1>

            <div className="shadow bg-white p-4 w-full">
                <div className="flex flex-row justify-between mb-4">
                    <input className='bg-gray-light p-1 mr-5' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />

                    <div className="flex flex-row">
                        <button className='button mr-1' onClick={() => sort('trade_date')}>Trade date</button>
                        <button className='button mr-1' onClick={() => sort('counterparty')}>Counterparty</button>
                        <button className='button mr-1' onClick={() => sort('commodity_group')}>Commodity group</button>
                        <button className='button' onClick={() => sort('broker')}>Broker</button>
                    </div>
                </div>

                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Trade date</th>
                            <th>Counterparty</th>
                            <th>Commodity group</th>
                            <th>Broker</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((deal: Deal) => (
                            <tr>
                                <td>{deal.id}</td>
                                <td>{deal.code}</td>
                                <td>{deal.trade_date}</td>
                                <td>{deal.counterparty.name}</td>
                                <td>{deal.commodity_group}</td>
                                <td>{deal.broker}</td>
                                <td><DocumentMagnifyingGlassIcon className="icon" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}