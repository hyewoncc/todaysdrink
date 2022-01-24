import React from 'react';
import { IMG_URL } from '../../Config';
import { withRouter } from 'react-router-dom';
import './Header.css';

function Header(props) {

    const goMain = () => {
        props.history.push('/');
    }

    const goBeerList = () => {
        props.history.push('/beers');
    }

    const goBeerTypes = () => {
        props.history.push('/types');
    }

    const goMatch = () => {
        props.history.push('/match');
    }

    return (
        <div className="header">
            <div className="logo-container">
                <div className="title-logo" onClick={goMain}>
                    <img className="logo-image" src={IMG_URL + 'logo_test3.png'} alt='logo'/>
                </div>
            </div>
            <div className="header-bar">
                <div className="menu-container">
                    <div className="menus">
                        <div className="menu" onClick={goBeerList}></div>
                        <div className="menu" onClick={goBeerTypes}></div>
                        <div className="menu" onClick={goMatch}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
