import React, { useEffect, useState } from 'react';
import CommentsList from '../../common/Comments/CommentsList';
import { API_URL } from '../../Config';
import { BEERCARD_IMG_URL } from '../../Config';
import BeerCard from '../../common/BeerCard/BeerCard';
import './BeerDetail.css';

function BeerDetail(props) {

    const [Beer, setBeer] = useState([]);
    const [TypeRecommendBeers, setTypeRecommendBeers] = useState([]);
    const beerId = props.match.params.beerId;

    useEffect(() => {
        //url값으로 생성하되, 백엔드에서 받은 link가 있다면 link로 처리 
        let endpoint = `${API_URL}beers/${props.match.params.beerId}`;

        if(props.location.state) {
            endpoint = props.location.state.apiLink.href;
        }

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setBeer(response);
                fetchTypeRecommendBeers(response._links.typeRecommend.href);
            })
    }, [])

    const fetchTypeRecommendBeers = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setTypeRecommendBeers(response._embedded.beerDtoes);
            })
    }

    return (
        <div className="info-wrap">
            <div className="info-container">
                <div className="low">
                    <div className="beer-image">
                        <img src={BEERCARD_IMG_URL + Beer.name + '/' + Beer.name + '1.png'}/>
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
                        {Beer.id && 
                            <CommentsList 
                                beerId = {Beer.id} 
                                apiLink = {Beer._links.comments}
                            />
                        }
                    </div>
                </div>
                <div className="low wrap">
                    <div className="recommend-title low">
                        <p>같은 타입 맥주 추천</p>
                    </div>
                    <div className="recommend-container">
                        {TypeRecommendBeers && TypeRecommendBeers.map((beer, index) => (
                            <React.Fragment key = {index}>
                                <BeerCard
                                    apiLinks = {beer._links}
                                    beerId = {beer.id}
                                    beerName = {beer.name}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerDetail
