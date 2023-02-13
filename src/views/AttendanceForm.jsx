import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import '../css/attendance.css';

export default function AttendanceForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [attendance, setAttendance] = useState({
    id: null,
    attendance_title: '',
    attendance_content: '',
    attendance_status: 'Absent',
    user_id:'',
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user, setNotification} = useStateContext();

  useEffect(() => {
    setAttendance({...attendance, user_id: user.id, attendance_status: 'Absent'})
  },[user]);

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/attendances/${id}`)
        .then(({data}) => {
          setLoading(false)
          setAttendance(data)
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (attendance.id) {
      axiosClient.put(`/attendances/${attendance.id}`, attendance)
        .then(() => {
          setNotification('Attendance report was successfully updated')
          navigate('/attendances')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/attendances', attendance)
        .then(() => {
          setNotification('Attendance report was successfully submitted')
          navigate('/attendances')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {attendance.id && <h1>Update Attendance Report: {attendance.date}</h1>}
      {!attendance.id && <h1>Submit Attendance Report</h1>}
      <div className="card animated fadeInDown">
        {loading && 
          <div className="text-center">
            Loading...
          </div>
        }
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
            
          </div>
        }
        {!loading && 
          <form onSubmit={onSubmit}>
            <input value={attendance.attendance_title} onChange={ev => setAttendance({...attendance, attendance_title: ev.target.value})} placeholder="Title"/>
            <textarea value={attendance.attendance_content} onChange={ev => setAttendance({...attendance, attendance_content: ev.target.value})} placeholder="Content"/>
            <button className="btn">Save</button>
            <button className="btn"><Link to="/attendances">Cancel</Link></button>
          </form>
        }
      </div>
    </>
  )
}
