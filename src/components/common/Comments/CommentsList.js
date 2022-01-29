import React, { useEffect, useState, useRef } from 'react';
import Like from '../../common/Like/Like';
import './CommentsList.css';

function CommentsList(props) {
    const [Name, setName] = useState("");
    const [Content, setContent] = useState("");
    const [Comments, setComments] = useState([]);
    const [BeerId, setBeerId] = useState(0);
    const [BeerNickname, setBeerNickname] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");

    const lastRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        setBeerId(props.beerId);
        setBeerNickname(props.beerNickname);
        const endpoint = props.apiLink.href;
        fetchComments(endpoint);
    }, [])

    const fetchComments = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                if(response._embedded){
                    setComments(...[response._embedded.commentDtoes]);
                    lastRef.current.scrollIntoView({behavior: "smooth", block: "center"});
                }
        })
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onContentHandler = (e) => {
        setContent(e.currentTarget.value);
    }

    const validateNewComment = () => {
        setName(Name.trim());
        if(Name === "") {
            setErrorMessage("이름이 비었습니다");
            return false;
        }

        if(Name.length > 10) {
            setErrorMessage("이름은 최대 10자까지 입력할 수 있습니다");
            return false;
        }

        setContent(Content.trim());
        if(Content === "") {
            setErrorMessage("내용이 비었습니다");
            return false;
        }

        return true;
    }

    const onCommentSubmitHandler = (e) => {
        e.preventDefault();

        if(!validateNewComment()) {
            return false;
        }

        setErrorMessage("");

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
                    fetchComments(endpoint);
                    setContent("");
                }
            })
    }

    const resizeHandler = () => {
        if (textareaRef === null || textareaRef.current === null) {
            return;
        }
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }

    return (
        <div className="comment-wrap low wrap">
            <span className='comment-title'>{BeerNickname}의 {Comments.length}개 코멘트</span>
            <div className="comments low wrap">
                {Comments && Comments.map((comment, index) => (
                    <div className="comment low align-center" ref={Comments.length === index + 1 ? lastRef : undefined}>
                        <p><span className='comment-name'>{comment.name}</span><br/>
                            {comment.content && comment.content.split('\n').map(line => (
                                <span className='comment-content'>{line}<br/></span>
                            ))}
                        </p>
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
                <textarea ref={textareaRef} className="comment-input inputbox" value={Content} 
                        onChange={onContentHandler} onKeyUp={resizeHandler()}></textarea>
                <button onClick={onCommentSubmitHandler} className='comment-submit-btn'>등록</button>
                <div className='error-message low'>
                    <span>{ErrorMessage}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentsList
