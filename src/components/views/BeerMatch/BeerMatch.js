import React, { useEffect, useState } from 'react'
import './BeerMatch.css';
import MatchRawData from "../../MatchData.json";

function BeerMatch() {
    
    const [MatchData, setMatchData] = useState(MatchRawData);

    return (
        <div className='beermatch-wrap'>
            <div className='beerimage-wrap'>

            </div>
            <div className='match-sheet'>
                <div className='match-container'>
                    {MatchData && MatchData.map((data, index) => (
                        <div className='question'>
                            <div className='question-title'>
                                <p>{data.title}</p>
                            </div>
                            <div className='question-answers'>
                                {data.answers && data.answers.map((answer, index) => (
                                    <div className='answer'>
                                        <p>{answer.explain}</p>
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
