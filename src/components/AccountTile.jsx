import React from 'react'
import Arrow from '../svg/left-arrow.svg';

function AccountTile() {
    return (
        <div className="AccountTile">
            <h2 className="AccountTile__initials">M</h2>
            <div className="AccountTile__detail">
                <div className="AccountTile__name">Kevin Smithson</div>
                <p className="AccountTile__accountType">Standard Account</p>
            </div>
            <img src={Arrow} alt="left-arrow" />
        </div>
    )
}

export default AccountTile
