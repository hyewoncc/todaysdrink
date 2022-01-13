import React, { useEffect, useState } from 'react';
import './Like.css';
import { ICON_IMG_URL } from '../../Config';

function Like(props) {

    const [LikeState, setLikeState] = useState(false);
    const [Like, setLike] = useState([]);
    const [Links, setLinks] = useState([]);

    const toggleLike = () => {
        const getLink = props.apiLinks.like.href;
        const upLink = props.apiLinks.uplike.href;
        const dislikeLink = props.apiLinks.dislike.href;
        if(!LikeState) {
            fetchUpLike(getLink, upLink);
        } else if(LikeState) {
            fetchDisLike(getLink, dislikeLink);
        }
        setLikeState(!LikeState);
    }

    const fetchLike = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setLike(response)
            })
    }

    const fetchUpLike = (getEndpoint, upEndpoint) => {
        fetch(upEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if(response.status == 200) {
                    fetchLike(getEndpoint)
                }
            })
    }

    const fetchDisLike = (getEndpoint, dislikeEndpoint) => {
        fetch(dislikeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if(response.status == 200) {
                    fetchLike(getEndpoint)
                }
            })
    }

     useEffect(() => {
         const getLink = props.apiLinks.like.href;
         fetchLike(getLink);
     }, [])

    return (
        <div className="like-wrap">
            <button className={"btn like " + (LikeState ? "on" : "off")} 
                    onClick={toggleLike}>
                    <img src={ICON_IMG_URL + 'heart/' + (LikeState ? "up" : "down") + '.png'}/></button>
            <span>{Like.count}</span>
        </div>
    )
}

export default Like
