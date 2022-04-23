import React, {useState} from 'react'
import Arrow from '../svg/left-arrow.svg'
import {Link} from 'react-router-dom';
import IconTile from './IconTile'



function Channel({title}) {

    const [expanded, setExpanded] = useState(false)
    const [activeTabIndex, setActiveTabIndex] = useState(0)

   const togglePanel = () => {
       const newState = !expanded;
        setExpanded(newState);

        const panel = document.querySelector('.Channel__links');
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        }else{
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }

   }

   function _buildChannelNav(){
       const channel_tabs = ['dashboard', 'tasks', 'messages', 'appointments']
       return (channel_tabs.map((tab,idx) =>
        activeTabIndex === idx ? 
         (<li> <Link to={tab} className='active'>{tab}</Link> </li>)
        :
        ( <li>
            <Link to={tab}>{tab}</Link>
        </li>)
       ));
   } 

    return (
        <div className="Channel">
            <div className="Channel__header" onClick={() => togglePanel()}>
                <h2 className="Channel__title">{title || 'My Channel'}</h2>
                <img src={Arrow} alt="" className={`Channel__expand ${!expanded && 'Channel__expand_closed'}`}/>
            </div>
            <ul className={`Channel__links ${!expanded && 'Channel__links_closed'}`}>
                {_buildChannelNav()}
                <li>
                    <Link to='settings' className="no-highlight">
                        <IconTile title='settings'/>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Channel
