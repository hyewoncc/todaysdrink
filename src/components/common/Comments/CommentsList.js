import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';
import './CommentsList.css';

function CommentsList(props) {
    const [Comments, setComments] = useState([]);

    useEffect(() => {
        const endpoint = `${API_URL}comments/?beerId=${props.beerId}`;
        fetchComments(endpoint);
    }, [])

    const fetchComments = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setComments(response._embedded.commentDtoes);
        })
    }

    return (
        <div className="comment-wrap low wrap">
            <div className="comments low wrap">
                {Comments && Comments.map((comment, index) => (
                    <div className="comment low">
                        <p>{comment.name} : {comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="new-comment low wrap">
                <div>

                </div>
                <input type="text" className="nickname-input"></input>
                <div>
                    
                </div>
                <input type="text" className="comment-input"></input>
                <button>등록</button>
            </div>
        </div>
    )
}

export default CommentsList
