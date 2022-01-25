import React, { useEffect, useState } from 'react';
import TypesRawData from "../../../datas/TypeData.json";
import './BeerTypes.css';

function BeerTypes() {

    const [TypesData, setTypesData] = useState([]);
    const [TypeData, setTypeData] = useState();

    useEffect(() => {
        setTypesData(TypesRawData);
    }, [])

    return (
        <div className='types-container'>
            <div className='types-list-wrap'>
                <ul>
                    {TypesData.map((data, i) => (
                        <li onClick={() => setTypeData(data.explain)}>{data.type}</li>
                    ))}
                </ul>
            </div>    
            <div className='types-explain-wrap'>
                <p>
                    {TypeData && TypeData.split('\\n').map(line => (
                        <span>{line}<br/></span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default BeerTypes;
