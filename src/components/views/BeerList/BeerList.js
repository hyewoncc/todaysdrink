import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import BeerCard from '../../common/BeerCard/BeerCard';
import { API_URL } from '../../Config';
import './BeerList.css';

function BeerList() {

    const [Beers, setBeers] = useState([]);
    const [Page, setPage] = useState(0);
    const [Option, setOption] = useState([[]]);
    const likeOption = [["많은 순으로", "desc"], ["적은 순으로", "asc"]];
    const alcoholOption = [["높은 순으로", "desc"], ["낮은 순으로", "asc"]];
    const typeOption = [["라거", "lager"], ["스타우트", "stout"], ["IPA", "IPA"]];
    const countryOption = [["한국", "KOR"], ["일본", "JPN"], ["독일", "DEU"]];

    useEffect(() => {
        const endpoint = `${API_URL}beers`;
        setOption(likeOption);
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

    const onOptionSelectHandler = (e) => {
        let option = e.target.value;

        switch(option) {
            case "like":
                setOption(likeOption);
                break;
            case "alcohol":
                setOption(alcoholOption);
                break;
            case "type":
                setOption(typeOption);
                break;
            case "country":
                setOption(countryOption);
                break;
            default:
                break;
        }
    }

    return (
        <div className="beerlist-wrap">
            <div className="beerlist-option">
                <span>맥주 진열은</span>
                <select onChange={onOptionSelectHandler}>
                    <option key="like" value="like">좋아요</option>
                    <option key="alcohol" value="alcohol">도수</option>
                    <option key="type" value="type">종류</option>
                    <option key="country" value="country">국가</option>
                </select>
                <select>
                    {Option.map((op, index) => (
                        <option value={op[1]}>{op[0]}</option>
                    ))}
                </select>
            </div>
            <div className="beerlist-container">
                {Beers && Beers.map((beer, index) => (
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
    )
}

export default withRouter(BeerList);
