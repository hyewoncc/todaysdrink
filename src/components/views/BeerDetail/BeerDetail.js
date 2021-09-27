import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';

function BeerDetail(props) {

    const [Beer, setBeer] = useState({});

    useEffect(() => {
        const endpoint = `${API_URL}beers/${props.match.params.beerId}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setBeer(response);
                console.log(Beer);
            })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default BeerDetail
