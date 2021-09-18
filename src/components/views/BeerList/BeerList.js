import React from 'react';
import { withRouter } from 'react-router-dom';
import BeerCard from '../../common/BeerCard/BeerCard';
import './BeerList.css';

function BeerList() {
    return (
        <div className="beerlist-wrap">
            <div className="beerlist-container">
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
                <BeerCard />
            </div>
        </div>
    )
}

export default withRouter(BeerList);
