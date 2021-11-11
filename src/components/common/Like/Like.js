import React, { useEffect, useState } from 'react'

function Like() {
    const [Like, setLike] = useState(false);

    const toggleLike = () => {
        setLike(!Like);
    }



    return (
        <div className="like-wrap">
            <button>좋아요</button>
        </div>
    )
}

export default Like
