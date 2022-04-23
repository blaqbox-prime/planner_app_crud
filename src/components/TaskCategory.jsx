import React from 'react'

const buildCategoryIcon = ({category}) => {
        if (category === 'personal') { return (<div className={`categoryIcon personal`}></div>);}
        else if (category === 'design') {return (<div className={`categoryIcon design`}></div>);}
        else if (category === 'functionality') {return (<div className={`categoryIcon functionality`}></div>);}

    
}

function TaskCategory({category}) {
    return (
        <div className={`TaskCategory ${category}`}>
            {category && buildCategoryIcon({category})}
            <p>{category || ''}</p>
        </div>
    )
}

export default TaskCategory
