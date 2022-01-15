import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';
import './BeerMatch.css';
import MatchRawData from "../../MatchData.json";

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
        if (AnswerData.length === MatchData.length) {
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
        <div className='beermatch-wrap'>
            <div className='matchimage-wrap'>
                <p>{Submitted} / {MatchData.length}</p>
            </div>
            <div className='match-sheet'>
                <div className={'match-container submit-' + Submitted}>
                    {MatchData && MatchData.map((data, i) => (
                        <div className='question'>
                            <div className='question-title'>
                                <p>{data.title}</p>
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
    )
}

export default BeerMatch
