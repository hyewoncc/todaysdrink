import React, { useEffect, useState } from 'react'
import { BEERCARD_IMG_URL } from '../../Config';
import { Link } from 'react-router-dom';
import './BeerCard.css';

function BeerCard(props) {

    /**
     * TODO
     * 1. 이미지 파일 경로를 props에서 맥주 이름 받아서 지정하도록 교체 
     * 2. imageindex 의 max 값을 props에서 총 이미지 수 받아서 하도록 교체 
     */

    const [MouseX, setMouseX] = useState(0);
    const [MouseY, setMouseY] = useState(0);
    const [ImageIndex, setImageIndex] = useState(1);
    const [RotationState, setRotationState] = useState(false);
    const [RotationDirection, setRotationDirection] = useState(0);
    const [EnterTime, setEnterTime] = useState(new Date());
    const [LeaveTime, setLeaveTime] = useState(new Date());
    const [TimeGap, setTimeGap] = useState(0);

    const initMousePosition = (e) => {
        setEnterTime(new Date());
        setRotationState(false);
        setMouseX(e.screenX);
    }

    const rotateClockwise = () => {
        if(ImageIndex < 25) {
            setImageIndex(ImageIndex + 1);
        }else if(ImageIndex === 25) {
            setImageIndex(1);
        }
    }

    const rotateAntiClockwise = () => {
        if(ImageIndex > 1) {
            setImageIndex(ImageIndex - 1);
        }else if(ImageIndex === 1){
            setImageIndex(24);
        }
    }

    const detectMouseDirection = (e) => {
        if((MouseX + 10) < e.screenX) {
            rotateClockwise();
            setRotationDirection(1);
            setMouseX(e.screenX);
        }
        if((MouseX - 10) > e.screenX) {
            rotateAntiClockwise();
            setRotationDirection(-1);
            setMouseX(e.screenX);
        }
    }

    const runAutoRotation = () => {
        setTimeGap(0);
        setLeaveTime(new Date());
        setTimeGap(EnterTime.getTime() - LeaveTime.getTime());
        setRotationState(true);
    }
    
    useEffect(() => {
        function autoRotation() {
            if(RotationState){
                RotationDirection === 1 ? rotateClockwise() : rotateAntiClockwise();
            }
        }

        if(Math.round(TimeGap/10) === 0) {
            setTimeGap(10);
        }

        const rotate = setInterval(autoRotation, Math.round(TimeGap/10) + 1);
        return () => { clearInterval(rotate);};
    }, [RotationState, ImageIndex]);

    useEffect(() => {
        makeSlow();
        return () => { }
    }, [ImageIndex])

    const makeSlow = () => {
        setTimeGap(Math.round(TimeGap * 1.1));
        if(TimeGap > 4000){
            setRotationState(!RotationState);
            setTimeGap(0);
        }
    }

    return (
        <div className="beercard-wrap">
            <div className="beercard">
                <Link to = {{
                    pathname: `/beers/${props.beerId}`,
                    state: { apiLink : props.apiLink }}}>
                    <div className="beerimage-wrap" onMouseEnter={initMousePosition} onMouseMove={detectMouseDirection} onMouseLeave={runAutoRotation}>
                        <img src={BEERCARD_IMG_URL + '/' + props.beerName + '/' + props.beerName + ImageIndex + '.png'}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BeerCard
