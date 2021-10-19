import React from 'react'

const buildCategoryIcon = ({category}) => {
    return (<div className={`categoryIcon ${category === 'design' ? 'design' : 'functionality'}`}></div>);
}

function TaskCategory({category}) {
    return (
        <div className="TaskCategory">
            {category && buildCategoryIcon(category)}
            <p>{category || 'none'}</p>
        </div>
    )
}

export default TaskCategory
