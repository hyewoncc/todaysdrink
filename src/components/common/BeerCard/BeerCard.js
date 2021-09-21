import React, { useEffect, useState } from 'react'
import './BeerCard.css';

function BeerCard() {

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

    const initMousePosition = (e) => {
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
        setRotationState(true);
    }
    
    useEffect(() => {
        function autoRotation() {
            if(RotationState){
                RotationDirection === 1 ? rotateClockwise() : rotateAntiClockwise();
            }
        }
        const rotate = setInterval(autoRotation, 100);
        return () => { clearInterval(rotate) };
    }, [RotationState, ImageIndex]);

    const img_url = 'images/beer_small/singha/singha';

    return (
        <div className="beercard-wrap">
            <div className="beercard" onMouseOver={initMousePosition} onMouseMove={detectMouseDirection} onMouseOut={runAutoRotation}>
                <img src={img_url + ImageIndex + '.png'}/>
            </div>
        </div>
    )
}

export default BeerCard
