import React, { useEffect, useState } from 'react';
import TypesRawData from "../../../datas/TypeData.json";
import './BeerTypes.css';

function BeerTypes() {

    const [TypesData, setTypesData] = useState([]);

    useEffect(() => {
        setTypesData(TypesRawData);
    }, [])


    return (
        <div className='types-container'>
            <div className='types-list-wrap'>
                <ul>
                    {TypesData.map((data, i) => (
                        <li>{data.type}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BeerTypes;
