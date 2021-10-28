import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import BeerCard from '../../common/BeerCard/BeerCard';
import { API_URL } from '../../Config';
import './BeerList.css';

function BeerList() {

    const [Beers, setBeers] = useState([]);
    const [Page, setPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}beers`;
        fetchBeers(endpoint);
    }, [])

    const fetchBeers = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setBeers([...Beers, ...response._embedded.beerDtoes]);
            }, (err) => {
                console.error('Fetch failed : ' + err);
            })
    }

    return (
        <div className="beerlist-wrap">
            <div className="beerlist-container">
                {Beers && Beers.map((beer, index) => (
                    <React.Fragment key = {index}>
                        <BeerCard 
                            apiLink = {beer._links.self} 
                            beerId = {beer.id}
                            beerName = {beer.name}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default withRouter(BeerList);
