import React from 'react'

function IconTile({icon, title}) {
    return (
        <div className="Sidebar__icon-tile">
                {icon && <img src={icon} alt="Inbox Icon" className="Sidebar__icon"/>}
                <p>{title || 'untitled Tile'}</p>
            </div>
    )
}

export default IconTile
