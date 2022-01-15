import React, { useEffect, useState } from 'react';
import './Like.css';

function Like(props) {

    const [LikeState, setLikeState] = useState(false);
    const [Like, setLike] = useState([]);

    const toggleLike = () => {
        const getLink = props.apiLinks.like.href;
        const upLink = props.apiLinks.uplike.href;
        const dislikeLink = props.apiLinks.dislike.href;
        if(!LikeState) {
            fetchUpLike(getLink, upLink);
            sessionStorage.setItem(getLink, true);
        } else if(LikeState) {
            fetchDisLike(getLink, dislikeLink);
            sessionStorage.setItem(getLink, false);
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
                if(response.status === 200) {
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
                if(response.status === 200) {
                    fetchLike(getEndpoint)
                }
            })
    }

    const checkLiked = (linkIndex) => {
        if (sessionStorage.getItem(linkIndex) === null) {
            sessionStorage.setItem(linkIndex, false);
            return false;
        } 
        if (sessionStorage.getItem(linkIndex) === "true") {
            return true;
        }
        return false;
    }

     useEffect(() => {
         const getLink = props.apiLinks.like.href;
         setLikeState(checkLiked(getLink));
         fetchLike(getLink);
     }, [])

    return (
        <div className="like-wrap">
            <button className={"btn like icon " + (LikeState ? "on" : "off")} 
                    onClick={toggleLike}></button>
            <span className="like-count">{Like.count}</span>
        </div>
    )
}

export default Like
