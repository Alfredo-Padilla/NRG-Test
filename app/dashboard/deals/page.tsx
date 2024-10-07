"use client";
import { EyeIcon } from '@heroicons/react/24/solid';
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
        const id_match = [...deals].filter((deal: any) => deal.id.toLowerCase().includes(name));
        const code_match = [...deals].filter((deal: any) => deal.code.toLowerCase().includes(name));
        const trade_date_match = [...deals].filter((deal: any) => deal.trade_date.toLowerCase().includes(name));
        const counterparty_match = [...deals].filter((deal: any) => deal.counterparty.name.toLowerCase().includes(name));
        const commodity_group_match = [...deals].filter((deal: any) => deal.commodity_group.toLowerCase().includes(name));
        const broker_match = [...deals].filter((deal: any) => deal.broker.toLowerCase().includes(name));

        const searched = Array.from(new Set([...id_match, ...code_match, ...trade_date_match, ...counterparty_match, ...commodity_group_match, ...broker_match]));
        setDeals(searched);

        if (name.length === 0) {
            setDeals(allDeals);
        }
    }

    const openDetails = (row_id: string) => {
        const details = document.querySelector('tr['+`data-row-id="${row_id}"] .details-pop-up`);
        details?.classList.remove('hidden');
    }

    const closeDetails = (row_id: string) => {
        const details = document.querySelector('tr['+`data-row-id="${row_id}"] .details-pop-up`);
        details?.classList.add('hidden');
    }

    return (
        <div className="dashboard-page flex flex-col items-center justify-center">
            <h1>Deals</h1>

            <div className="shadow bg-white p-5 w-full">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex-col">
                        <h2 className="mb-2">Search</h2>
                        <input className='bg-gray-light p-1 mr-5' type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
                    </div>

                    <div className="flex-col">
                        <h2 className="mb-2">Sort by</h2>
                        <div className="flex flex-row">
                            <button className='button mr-1' onClick={() => sort('trade_date')}>Trade date</button>
                            <button className='button mr-1' onClick={() => sort('counterparty')}>Counterparty</button>
                            <button className='button mr-1' onClick={() => sort('commodity_group')}>Commodity group</button>
                            <button className='button' onClick={() => sort('broker')}>Broker</button>
                        </div>
                    </div>
                </div>

                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Trade date</th>
                            <th>Counterparty</th>
                            <th>Group</th>
                            <th>Broker</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((deal: Deal) => (
                            <tr data-row-id={deal.id}>
                                <td>{deal.id}</td>
                                <td>{deal.code}</td>
                                <td>{deal.trade_date}</td>
                                <td>{deal.counterparty.name}</td>
                                <td>{deal.commodity_group}</td>
                                <td>{deal.broker}</td>
                                <td className="view-details"><EyeIcon onClick={() => openDetails(deal.id)} className="cursor-pointer hover:opacity-50" /></td>
                                    <div className="details-pop-up hidden">
                                        <div className="flex flex-col bg-white justify-center align-center">
                                            <div className="bg-white p-5">
                                                <h3 className="text-lg">
                                                    Deal Details
                                                </h3>

                                                <div>
                                                    <p className="">
                                                        <strong>Code:</strong> {deal.code}
                                                    </p>
                                                    <p className="">
                                                        <strong>Trade date:</strong> {deal.trade_date}
                                                    </p>
                                                    <p className="">
                                                        <strong>Status:</strong> {deal.status}
                                                    </p>
                                                    <p className="">
                                                        <strong>Proposed to:</strong> {deal.proposed_to}
                                                    </p>
                                                    <p className="">
                                                        <strong>Sense:</strong> {deal.sense}
                                                    </p>
                                                    <p className="">
                                                        <strong>Volume:</strong> {deal.volume} {deal.measurement_unit}
                                                    </p>
                                                    <p className="">
                                                        <strong>Fixed price:</strong> {deal.fixed_price}
                                                    </p>
                                                    <p className="">
                                                        <strong>Counterparty:</strong> {deal.counterparty.name}
                                                    </p>
                                                    <p className="">
                                                        <strong>Commodity group:</strong> {deal.commodity_group}
                                                    </p>
                                                    <p className="">
                                                        <strong>Broker:</strong> {deal.broker}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="button mb-5 mx-auto" onClick={() => closeDetails(deal.id)}>Close</button>
                                        </div>
                                    </div>
                                </tr>
                            ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}