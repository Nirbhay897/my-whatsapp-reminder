import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import DatetTimePicker from 'react-datetime-picker'

function App() {
  const [reminderMesg, setReminderMesg] = useState("")
  const [remindAt, setReminder] = useState("")
  const [reminderList, setReminderList] = useState([])

  useEffect(() => {
    axios.get("https://whatsapp-reminder-5xz9.onrender.com/getdata").then(res => setReminderList(res.data))
  }, [])

  const addReminder = () => {
    axios.post("https://whatsapp-reminder-5xz9.onrender.com/Postdata", { reminderMesg, remindAt })
      .then(res => setReminderList(res.data))
    setReminderMesg("")
    setReminder("")
  }

  const deleteData = (id) => {
    axios.post("https://whatsapp-reminder-5xz9.onrender.com/deleteData", {id })
    .then(res =>setReminderList(res.data))
  }

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me</h1>
          <input type="text" placeholder='Remainder notes here...' value={reminderMesg} onChange={(e) => setReminderMesg(e.target.value)} />
          <DatetTimePicker value={remindAt} onChange={setReminder} minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY" />

          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>
        <div className="homepage_body">

          {reminderList.map( single => (
            <div className="reminder_card" key={single._id}>
              <h2>{single.reminderMesg}</h2>
              <h3>Remind me at:</h3>
              {/* <p>{String(new Date(single.remindAt.tolocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p> */}
              <p>{single.remindAt}</p>
              <div className="button" onClick={()=>deleteData(single._id)}>Delete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
