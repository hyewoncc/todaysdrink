import React, { useEffect, useState } from 'react';
import TypesRawData from "../../../datas/TypeData.json";
import './BeerTypes.css';

function BeerTypes() {

    const [TypesData, setTypesData] = useState([]);
    const [TypeObject, setTypeObject] = useState(TypesRawData[0]);
    const [Type, setType] = useState("라거");
    const [TypeData, setTypeData] = useState();

    useEffect(() => {
        setTypesData(TypesRawData);
        return () => {
            setTypeObject(TypesData[0]);
            setType(TypeObject.type);
            setTypeData(TypeObject.explain);
        }
    }, [])

    useEffect(() => {
        setType(TypeObject.type);
        setTypeData(TypeObject.explain);
    }, [TypeObject])

    return (
        <div className='types-container'>
            <h3 className='types-title'>종류 별 맥주 특징</h3>
            <div className='types-wrap'>
                <div className='types-list-wrap'>
                    <ul>
                        {TypesData.map((data, i) => (
                            <li onClick={() => setTypeObject(data)}
                                className={data.type === Type ? 'type-selected' : ''}>{data.type}</li>
                        ))}
                    </ul>
                </div>    
                <div className='types-explain-wrap'>
                    <div className='types-image-wrap'>

                    </div>
                    <p>
                        {TypeData && TypeData.split('\\n').map(line => (
                            <span>{line}<br/></span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BeerTypes;
