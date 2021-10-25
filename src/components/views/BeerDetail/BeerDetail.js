import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';
import './BeerDetail.css';

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
        <div className="info-wrap">
            <div className="info-container">
                <div className="beer-image">

                </div>
                <div className="beer-info">

                </div>
                <div className="comment-container">

                </div>
            </div>
        </div>
    )
}

export default BeerDetail
