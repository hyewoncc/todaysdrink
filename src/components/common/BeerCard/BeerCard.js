import React, { useEffect, useState } from 'react'
import './BeerCard.css';

function BeerCard() {

    const [MouseX, setMouseX] = useState(0);
    const [MouseY, setMouseY] = useState(0);
    const [ImageIndex, setImageIndex] = useState(1);

    const initMousePosition = (e) => {
        setMouseX(e.screenX);
    }

    const rotateClockwise = () => {
        if(ImageIndex < 25) {
            setImageIndex(ImageIndex + 1);
        }else if(ImageIndex === 25) {
            setImageIndex(1);
        }
    }

    const rotateAntiColockwise = () => {
        if(ImageIndex > 1) {
            setImageIndex(ImageIndex - 1);
        }else if(ImageIndex === 1){
            setImageIndex(24);
        }
    }

    const detectMouseMove = (e) => {
        if((MouseX + 10) < e.screenX) {
            rotateClockwise();
            setMouseX(e.screenX);
        }
        if((MouseX - 10) > e.screenX) {
            rotateAntiColockwise();
            setMouseX(e.screenX);
        }
    }

    const img_url = 'images/beer_small/singha/singha';

    return (
        <div className="beercard-wrap">
            <div className="beercard" onMouseEnter={initMousePosition} onMouseMove={detectMouseMove}>
                <img src={img_url + ImageIndex + '.png'}/>
            </div>
        </div>
    )
}

export default BeerCard
