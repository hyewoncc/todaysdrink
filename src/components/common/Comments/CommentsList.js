import React, { useEffect, useState } from 'react';
import Like from '../../common/Like/Like';
import './CommentsList.css';

function CommentsList(props) {
    const [Name, setName] = useState("");
    const [Content, setContent] = useState("");
    const [Comments, setComments] = useState([]);
    const [BeerId, setBeerId] = useState(0);

    useEffect(() => {
        setBeerId(props.beerId);
        const endpoint = props.apiLink.href;
        fetchComments(endpoint);
    }, [])

    const fetchComments = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                if(response._embedded){
                    setComments(...[response._embedded.commentDtoes]);
                }
        })
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onContentHandler = (e) => {
        setContent(e.currentTarget.value);
    }

    const onCommentSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            beerId: BeerId,
            name: Name,
            content: Content
        }

        const endpoint = props.apiLink.href;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if(response.status === 204){
                    fetchComments(endpoint)
                }
            })
    }

    return (
        <div className="comment-wrap low wrap">
            <div className="comments low wrap">
                {Comments && Comments.map((comment, index) => (
                    <div className="comment low">
                        <p>{comment.name} : {comment.content}</p>
                        <div className="comment-like">
                            <Like
                                apiLinks = {comment._links}
                            />
                        </div>
                    </div>
                ))}
                {!Comments.length && 
                    <div className="comment low">
                        <p>첫 댓글을 등록해보세요</p>
                    </div>
                }
            </div>
            <h4 className='no-margin-title'>내 의견 남기기</h4>
            <div className="new comment low wrap">
                <input type="text" className="nickname-input inputbox" onChange={onNameHandler}
                    autoCorrect='false'></input>
                <input type="text" className="comment-input inputbox" onChange={onContentHandler}></input>
                <button onClick={onCommentSubmitHandler} className='comment-submit-btn'>등록</button>
            </div>
        </div>
    )
}

export default CommentsList
