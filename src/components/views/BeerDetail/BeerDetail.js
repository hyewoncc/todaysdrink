import React, { useEffect, useState } from 'react';
import CommentsList from '../../common/Comments/CommentsList';
import { API_URL } from '../../Config';
import { BEERCARD_IMG_URL, BEER_IMG_URL } from '../../Config';
import BeerCard from '../../common/BeerCard/BeerCard';
import './BeerDetail.css';

function BeerDetail(props) {

    const [Beer, setBeer] = useState([]);
    const [TypeRecommendBeers, setTypeRecommendBeers] = useState([]);
    const beerId = props.match.params.beerId;

    useEffect(() => {
        //url값으로 생성하되, 백엔드에서 받은 link가 있다면 link로 처리 
        let endpoint = `${API_URL}beers/${beerId}`;

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
                if(Object.keys(response).length !== 0) {
                    setTypeRecommendBeers(response._embedded.beerDtoes);
                }
            })
    }

    return (
        <div className="info-wrap">
            <div className="info-container">
                <div className="low">
                    <div className="beer-image">
                        <img src={BEER_IMG_URL + Beer.name + '.png'}
                            alt={Beer.name}/>
                    </div>
                    <div className="beer-info-wrap">
                        <div className='beer-info'>
                            <h2 className="low-text beer-name">
                                {Beer.nickname}
                            </h2>
                            <p className="low-text beer-type">
                                {Beer.beerType} | {Beer.alcohol}%
                            </p>
                            <div className="low-text beer-country">
                                {Beer.country}
                            </div>
                            <p className="low-text beer-description">
                                {Beer.description && Beer.description.split('\\n').map(line => (
                                    <span>{line}<br/></span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="low comment-container">
                    <div className="comment-wrap">
                        {Beer.id && 
                            <CommentsList 
                                beerId = {Beer.id} 
                                beerNickname = {Beer.nickname} 
                                apiLink = {Beer._links.comments}
                            />
                        }
                    </div>
                </div>
                <div className="low wrap recommend-container">
                    {TypeRecommendBeers.length !== 0 && 
                        <div className='type-recommend-container'>
                            <div className="recommend-title low">
                                <p>같은 타입 맥주 추천</p>
                            </div>
                            <div className="type-recommend recommend-wrap">
                                {TypeRecommendBeers.map((beer, index) => (
                                    <React.Fragment key = {index}>
                                        <BeerCard
                                            apiLinks = {beer._links}
                                            beerId = {beer.id}
                                            beerName = {beer.name}
                                            beerNickname = {beer.nickname}
                                            images = {beer.images}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BeerDetail
