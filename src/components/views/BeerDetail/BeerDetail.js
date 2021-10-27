import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';
import { BEERCARD_IMG_URL } from '../../Config';
import './BeerDetail.css';

function BeerDetail(props) {

    const [Beer, setBeer] = useState([]);

    useEffect(() => {
        const endpoint = `${API_URL}beers/${props.match.params.beerId}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setBeer(response);
                console.log(response);
            })
    }, [])

    return (
        <div className="info-wrap">
            <div className="info-container">
                <div className="low">
                    <div className="beer-image">
                        <img src={'../' + BEERCARD_IMG_URL + Beer.name + '/' + Beer.name + '1.png'}/>
                    </div>
                    <div className="beer-info">
                        <div className="low-text beer-name">
                            {Beer.name}
                        </div>
                        <div className="low-text beer-type">
                            {Beer.beerType}
                        </div>
                        <div className="low-text beer-country">
                            {Beer.country}
                        </div>
                        <div className="low-text beer-description">
                            {Beer.description}
                        </div>
                    </div>
                </div>
                <div className="low">
                    <div className="comment-container">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerDetail
