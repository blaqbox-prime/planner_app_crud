import React, {useState} from 'react'
import Arrow from '../svg/left-arrow.svg'
import {Link} from 'react-router-dom';
import IconTile from './IconTile'
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';


function Channel({title}) {

    const [expanded, setExpanded] = useState(false)

   const arrowDownStyle =  {
    transform: 'RotateX(-90deg)'
   }

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

    return (
        <div className="Channel">
            <div className="Channel__header" onClick={() => togglePanel()}>
                <h2 className="Channel__title">{title || 'My Channel'}</h2>
                <img src={Arrow} alt="" className={`Channel__expand ${!expanded && 'Channel__expand_closed'}`}/>
            </div>
            <ul className={`Channel__links ${!expanded && 'Channel__links_closed'}`}>
                <li>
                    <Link to='dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='tasks' className="active">Tasks</Link>
                </li>
                <li>
                    <Link to='messages'>Messages</Link>
                </li>
                <li>
                    <Link to='appointments'>Appointments</Link>
                </li>
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
