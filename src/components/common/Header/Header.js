import React from 'react';
import { withRouter } from 'react-router-dom';
import './Header.css';

function Header(props) {

    const goMain = () => {
        props.history.push('/');
    }

    const goBeerList = () => {
        props.history.push('/beer');
    }

    const goMatch = () => {
        props.history.push('/match');
    }

    return (
        <div className="header">
            <div className="logo-container">
                <div className="title-logo" onClick={goMain}>
                
                </div>
            </div>
            <div className="header-bar">
                <div className="menu-container">
                    <div className="menus">
                        <div className="menu" onClick={goBeerList}>
                        </div>
                        <div className="menu">
                        </div>
                        <div className="menu" onClick={goMatch}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
