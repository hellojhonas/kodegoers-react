import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import '../css/notes.css';
import Swal from 'sweetalert2';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getNotes();
  }, [])

  const onDeleteClick = notes => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axiosClient.delete(`/notes/${notes.id}`)
        .then(() => {
          setNotification('Note was successfully deleted')
          getNotes()
        })
      }
    });
  }

  const getNotes = () => {
    setLoading(true)
    axiosClient.get('/notes')
      .then(({ data }) => {
        setLoading(false)
        setNotes(data.data)
        console.log(data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="card animated fadeInDown">
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Notes</h1>
          <Link className="btn-add" to="/notes/new">Add new</Link>
        </div>
        <table>
          <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Title</th>
            <th>Content</th>
            {/* <th>Create Date</th> */}
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {notes && notes.map(n => (
              <tr className="notes-row" key={n.id}>
                {/* <td>{n.id}</td> */}
                <td>{n.note_title}</td>
                <td className="content-overflow">{n.note_content}</td>
                {/* <td>{n.created_at}</td> */}
                <td>
                  <Link className="btn-edit" to={'/notes/' + n.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(n)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
