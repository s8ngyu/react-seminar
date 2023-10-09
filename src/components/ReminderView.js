import "./ReminderView.css"

const ReminderView = ({ reminder, doneButtonClicked, deleteButtonClicked }) => {
    if (reminder.done === true) {
        return (
            <div className='reminder-view'>
                <div className='reminder-view-header'>
                <div className='reminder-view-header-left'>
                    <h3 className='priority-label-done'>{reminder.priority}</h3>
                    <h3>{reminder.title}</h3>
                </div>
                <div className='reminder-view-header-right'>
                    <button className='reminder-view-button delete-button' onClick={() => deleteButtonClicked(reminder.uuid)}>delete</button>
                </div>
                </div>
                <div className='reminder-view-body'>
                <p>{reminder.detail}</p>
                <p className='date-label'>{reminder.dueDate.toLocaleDateString()}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='reminder-view'>
            <div className='reminder-view-header'>
              <div className='reminder-view-header-left'>
                <h3 className='priority-label'>{reminder.priority}</h3>
                <h3>{reminder.title}</h3>
              </div>
              <div className='reminder-view-header-right'>
                <button className='reminder-view-button' onClick={() => doneButtonClicked(reminder.uuid)}>done</button>
                <button className='reminder-view-button delete-button' onClick={() => deleteButtonClicked(reminder.uuid)}>delete</button>
              </div>
            </div>
            <div className='reminder-view-body'>
              <p>{reminder.detail}</p>
              <p className='date-label'>{reminder.dueDate.toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default ReminderView;