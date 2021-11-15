import React, { useEffect, useState } from 'react'

function Like(props) {

    const [LikeState, setLikeState] = useState(false);
    const [Like, setLike] = useState([])

    const toggleLike = () => {
        setLikeState(!LikeState);
    }

    const fetchLike = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setLike(response)
            })
    }

    const upLike = (endpoint) => {
        fetch(endpoint)
            .then(response =>{
                if(response.status == 200) {
                    fetchLike(endpoint)
                }
            })
    }

     useEffect(() => {
         const apiLink = props.apiLink.href
         fetchLike(apiLink)
     }, [])


    return (
        <div className="like-wrap">
            <button className={"btn like " + (LikeState ? "on" : "off")} 
                    onClick={toggleLike}>하트</button>
            <span>{Like.count}</span>
        </div>
    )
}

export default Like
