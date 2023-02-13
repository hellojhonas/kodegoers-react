import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import '../css/notes.css';

export default function NoteForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [note, setNote] = useState({
    id: null,
    note_title: '',
    note_content: '',
    user_id:''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user, setNotification} = useStateContext();

  useEffect(() => {
    setNote({...note, user_id: user.id})
  },[user]);

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/notes/${id}`)
        .then(({data}) => {
          setLoading(false)
          setNote(data)
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (note.id) {
      axiosClient.put(`/notes/${note.id}`, note)
        .then(() => {
          setNotification('Note was successfully updated')
          navigate('/notes')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/notes', note)
        .then(() => {
          setNotification('Note was successfully created')
          navigate('/notes')
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
      {note.id && <h1>Update Note: {note.note_title}</h1>}
      {!note.id && <h1>New Note</h1>}
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
            <input value={note.note_title} onChange={ev => setNote({...note, note_title: ev.target.value})} placeholder="Title"/>
            <textarea value={note.note_content} onChange={ev => setNote({...note, note_content: ev.target.value})} placeholder="Content"/>
            <button className="btn">Save</button><button className="btn"><Link to="/notes">Cancel</Link></button>
          </form>
        }
      </div>
    </>
  )
}
