import './App.css';
import React, { useState, useEffect } from 'react';

import SelectBox from './components/SelectBox';
import ReminderView from './components/ReminderView';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

function App() {
  const priorityList = ["!", "!!", "!!!"];
  const [priority, setPriority] = useState("!");

  const priorityFilterList = ["all", "!", "!!", "!!!", "done"];
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [uuid, setUuid] = useState(0);

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDetail = (e) => {
    setDetail(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e);
  };

  const addReminderButtonClicked = () => {
    if (title === '') {
      alert("what u gon' do?");
      return;
    }

    const newReminder = {
      uuid: uuid,
      priority: priority,
      title: title,
      detail: detail,
      dueDate: dueDate,
      done: false
    };
    setReminders([...reminders, newReminder]);
    setUuid(uuid + 1);
    setPriority('!');
    setTitle('');
    setDetail('');
    setDueDate(new Date());
  };

  const doneButtonClicked = (uuid) => {
    setReminders(reminders.map((reminder) => {
      if (reminder.uuid === uuid) {
        reminder.done = true;
      }

      return reminder;
    }));
  };

  const deleteButtonClicked = (uuid) => {
    setReminders(reminders.filter((reminder) => reminder.uuid !== uuid));
  };

  return (
    <div className='App'>
      <header>
        <h1>reminders</h1>
      </header>
      <div className='wrapper'>
        <div className='main'>
          <SelectBox onChange={handlePriorityFilter} value={priorityFilter} selectList={priorityFilterList} />
          
          {
            reminders.filter((reminder) => {
              if (priorityFilter === "all") {
                return true;
              }
              if (priorityFilter === "done") {
                return false;
              }
              
              return reminder.priority === priorityFilter;
            }).filter((reminder) => (reminder.done === false))
            .map((reminder) => (
              <ReminderView key={reminder.uuid} reminder={reminder} doneButtonClicked={doneButtonClicked} deleteButtonClicked={deleteButtonClicked} />
            ))
          }

          {
            reminders.filter((reminder) => {
              if (priorityFilter === "all") {
                return true;
              }
              if (priorityFilter === "done") {
                return true;
              }

              return reminder.priority === priorityFilter;
            }).filter((reminder) => (reminder.done === true))
            .map((reminder) => (
              <ReminderView key={reminder.uuid} reminder={reminder} doneButtonClicked={doneButtonClicked} deleteButtonClicked={deleteButtonClicked} />
            ))
          }

        </div>
        <div className='sidebar'>
          <h3>magic panel</h3>
          <div className='add-reminder-container'>
            <p>is it important?</p>
            <SelectBox onChange={handlePriority} value={priority} selectList={priorityList} />

            <p>what u gon' do?</p>
            <input type='text' placeholder='something to do' value={title} onChange={handleTitle} />

            <p>details if u need</p>
            <textarea type='text' placeholder='some details' value={detail} onChange={handleDetail} rows='3' />
            
            <p>when u gon' do it?</p>
            <DatePicker selected={dueDate} onChange={handleDueDate} />
          </div>
          <button className='add-reminder-button' onClick={addReminderButtonClicked}>add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
