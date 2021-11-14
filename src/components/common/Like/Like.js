import React, { useEffect, useState } from 'react'

function Like() {
    const [Like, setLike] = useState(false);

    const toggleLike = () => {
        setLike(!Like);
    }



    return (
        <div className="like-wrap">
            <button className={"btn like " + (Like ? "on" : "off")} 
                    onClick={toggleLike}>하트</button>
        </div>
    )
}

export default Like
