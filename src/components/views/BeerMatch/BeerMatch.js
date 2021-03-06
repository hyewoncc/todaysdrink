import React, { useEffect, useState } from 'react';
import { API_URL, ICON_IMG_URL } from '../../Config';
import './BeerMatch.css';
import MatchRawData from "../../../datas/MatchData.json";

function BeerMatch() {
    
    const [MatchData, setMatchData] = useState([]);
    const [Submitted, setSubmitted] = useState(0);
    const [AnswerData, setAnswerData] = useState([]);

    const answerSelectHandler = (question, answer) => {
        let data = {
            "question": question,
            "answer": answer
        };
        setAnswerData([...AnswerData, data]);
        setSubmitted(Submitted+1);
    }

    useEffect(() => {
        setMatchData(MatchRawData);
    }, [])

    useEffect(() => {
        if (AnswerData.length === MatchData.length && AnswerData.length !== 0) {
            const endpoint = API_URL + 'match';
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(AnswerData)
            })
                .then(response => {

                })
        }
    }, [AnswerData])

    return (
        <div className='beermatch-container'>
            <h3 className='match-title'>내 취향 맥주 찾기</h3>
            <div className='beermatch-wrap'>
                <div className='matchimage-wrap'>
                    <div className='matchimage'>
                        <img src={ICON_IMG_URL + 'glass.png'} alt='empty glass' className='matchimage-glass'></img>
                        <div className='matchimage-beer-wrap'>
                            <img src={ICON_IMG_URL + 'beer.png'} alt='beer in glass' className={'matchimage-beer step' + Submitted}></img>
                        </div>
                    </div>
                </div>
                <div className='match-sheet'>
                    <div className={'match-container submit-' + Submitted}>
                        {MatchData && MatchData.map((data, i) => (
                            <div className='question'>
                                <div className='question-title'>
                                    {data.title}
                                </div>
                                <div className='question-answers'>
                                    {data.answers && data.answers.map((answer, j) => (
                                        <div className='answer'>
                                            <button className='answer-button' disabled={i === Submitted ? "" : "disabled"} 
                                                    onClick={() => {answerSelectHandler(data.question, answer.answer)}}>{answer.explain}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeerMatch
