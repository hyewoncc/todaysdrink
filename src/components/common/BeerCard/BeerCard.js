import React, { useEffect, useState } from 'react'
import './BeerCard.css';

function BeerCard() {

    const [MouseX, setMouseX] = useState(0);
    const [MouseY, setMouseY] = useState(0);
    const [ImageArr, setImageArr] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', 
                                            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']);
    const [ImageIndex, setImageIndex] = useState(0);

    const initMousePosition = (e) => {
        setMouseX(e.screenX);
    }

    const detectMouseMove = (e) => {
        if((MouseX + 10) < e.screenX) {
            if(ImageIndex < 24) {
                setImageIndex(ImageIndex + 1);
            }else if(ImageIndex === 24) {
                setImageIndex(0);
            }
            setMouseX(e.screenX);
        }
        if((MouseX - 10) > e.screenX) {
            if(ImageIndex > 0) {
                setImageIndex(ImageIndex - 1);
            }else if(ImageIndex === 0){
                setImageIndex(24);
            }
            setMouseX(e.screenX);
        }
    }

    const img_url = 'images/beer_small/singha/singha';

    return (
        <div className="beercard-wrap">
            <div className="beercard" onMouseEnter={initMousePosition} onMouseMove={detectMouseMove}>
                <img src={img_url + ImageArr[ImageIndex] + '.png'}/>
            </div>
        </div>
    )
}

export default BeerCard
