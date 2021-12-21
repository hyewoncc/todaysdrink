import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import BeerCard from '../../common/BeerCard/BeerCard';
import { API_URL } from '../../Config';
import './BeerList.css';

function BeerList() {

    const [Beers, setBeers] = useState([]);
    const [Page, setPage] = useState(0);
    const [Search, setSearch] = useState("");
    const [SelectedOption, setSelectedOption] = useState();
    const [Option, setOption] = useState([[]]);
    const likeOption = [["많은 순으로", "desc"], ["적은 순으로", "asc"]];
    const alcoholOption = [["높은 순으로", "desc"], ["낮은 순으로", "asc"]];
    const typeOption = [["라거", "LAGER"], ["스타우트", "STOUT"], ["IPA", "IPA"]];
    const countryOption = [["한국", "KOR"], ["중국", "CHN"], ["독일", "DEU"]];

    useEffect(() => {
        setOption(likeOption);
        setSearch("like");
        setSelectedOption("desc");
    }, [])

    useEffect(() => {
        onSearchFetchHandler();
    }, [SelectedOption])

    const fetchBeers = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setBeers([]);
                setBeers([...response._embedded.beerDtoes]);
            }, (err) => {
                console.error('Fetch failed : ' + err);
            })
    }

    const onSearchSelectHandler = (e) => {
        let option = e.target.value;
        setSearch(option);

        switch(option) {
            case "like":
                setOption(likeOption);
                setSelectedOption("desc");
                break;
            case "alcohol":
                setOption(alcoholOption);
                setSelectedOption("desc");
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

    const onSearchFetchHandler = () => {
        const filter = {};
        filter[Search] = SelectedOption;
        console.log(filter);
        const endpoint = `${API_URL}beers?filters=${encodeURIComponent(JSON.stringify(filter))}`
        fetchBeers(endpoint);
    }

    const onOptionSelectHandler = (e) => {
        let option = e.target.value;
        setSelectedOption(option);
    }

    return (
        <div className="beerlist-wrap">
            <div className="beerlist-option">
                <span>맥주 진열은</span>
                <select onChange={onSearchSelectHandler}>
                    <option key="like" value="like">좋아요</option>
                    <option key="alcohol" value="alcohol">도수</option>
                    <option key="type" value="type">종류</option>
                    <option key="country" value="country">국가</option>
                </select>
                <select onChange={onOptionSelectHandler}>
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
