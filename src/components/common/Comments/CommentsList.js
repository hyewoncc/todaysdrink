import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';

function CommentsList(props) {
    const [Comments, setComments] = useState([]);

    useEffect(() => {
        const endpoint = `${API_URL}comments/?beerId=${props.beerId}`;
        
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setComments(response._embedded.commentDtoes);
            })
    }, [])

    return (
        <div>
            {Comments && Comments.map((comment, index) => (
                <p>{comment.name} : {comment.content}</p>
            ))}
        </div>
    )
}

export default CommentsList
