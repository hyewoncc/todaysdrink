import React, { useEffect, useState } from 'react'
import { BEERCARD_IMG_URL } from '../../Config';
import { Link } from 'react-router-dom';
import Like from '../../common/Like/Like';
import './BeerCard.css';

function BeerCard(props) {

    /**
     * TODO
     * 1. 이미지 파일 경로를 props에서 맥주 이름 받아서 지정하도록 교체 
     */

    const [MouseX, setMouseX] = useState(0);
    const [ImageIndex, setImageIndex] = useState(1);
    const [Images, setImages] = useState(0);
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

    const rotateAntiClockwise = () => {
        if(ImageIndex < Images) {
            setImageIndex(ImageIndex + 1);
        }else if(ImageIndex === Images) {
            setImageIndex(1);
        }
    }

    const rotateClockwise = () => {
        if(ImageIndex > 1) {
            setImageIndex(ImageIndex - 1);
        }else if(ImageIndex === 1){
            setImageIndex(Images);
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
        setImages(props.images);
    }, [])
    
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
                    pathname: `/beers/${props.beerName}`,
                    state: { apiLink : props.apiLinks.self }}}>
                    <div className="beerimage-wrap" onMouseEnter={initMousePosition} onMouseMove={detectMouseDirection} onMouseLeave={runAutoRotation}>
                        <img src={BEERCARD_IMG_URL + '/' + props.beerName + '/' + props.beerName + (ImageIndex < 10 ? '0' + ImageIndex : ImageIndex) + '.png'}
                            alt={props.beerName}/>
                    </div>
                </Link>
                <div className="beer-like">
                    <Like
                        apiLinks = {props.apiLinks}
                    />
                </div>
                <div className="card-title">
                    {props.beerName}
                </div>
            </div>
        </div>
    )
}

export default BeerCard
