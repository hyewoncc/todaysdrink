import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';

function BeerDetail(props) {

    const [Beer, setBeer] = useState([]);

    useEffect(() => {
        const endpoint = `${API_URL}beers/${props.match.params.beerId}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setBeer(response);
            })
    }, [])

    return (
        <div>
            <div className="info-container">
                <div className="beer-image">
                    <span>{Beer}</span>
                </div>
                <div className="beer-info">

                </div>
            </div>
            <div className="comment-container">

            </div>
        </div>
    )
}

export default BeerDetail
