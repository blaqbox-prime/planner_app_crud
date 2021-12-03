import React from 'react'

function AppointmentForm() {
    return (
        <form className="TaskForm" autoComplete="off">
      {/* close btn */}
      <IconButton className="TaskForm__close" onClick={() => {toggleTaskForm(); setCurrentTask(null);}}><CloseIcon/></IconButton>
      <div className="form-group">
        <label for="title">{currentTask ? 'Edit Task' : `New Task`}</label>
        <input
          type="text"
          className="form-control"
          placeholder="What task needs to be done?"
          value={title}
          onChange={updateTitle}
          required
        />
      </div>
      <div className="form-group">
        <label for="category">Category</label>
        <select className="TaskForm__category form-control" name='categories' id='categories'>
          {_buildCategoryOptions()}
        </select>
      </div>
      <div className="form-group">
        <label for="deadline">Deadline</label>
        <input
          type="date"
          className="form-control"
          value={deadline}
          onChange={updateDeadline}
          required
        />
      </div>

      <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} user={currentTask && currentTask.author}/>
        </div>
      </div>
      <button className="btn TaskForm__btn form-control" onClick={saveTask}>{currentTask ? 'Update Task' : 'Create Task'}</button>
    </form>
    )
}

export default AppointmentForm
