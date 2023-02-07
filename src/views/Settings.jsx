import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../css/settings.css'
import idastro from '../assets/id-astro.png';
import barcode from '../assets/barcode.png';

export default function UserForm() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const {user, setUser} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
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
    <div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className="student-id">
                    <h2>KodeGoers Bootcamp</h2>
                    <img className="id-image" src={idastro}/>
                    <p>Name: {user.name}</p>
                    <p>ID No. {user.id}</p>
                    <img className="id-barcode" src={barcode}/>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className="login-signup-form settings-id">
                    <div className="form">
                    <h1>Your Information</h1>
                <div>
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
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                        {/* <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/> */}
                        <button className="btn">Save</button>
                    </form>
                    }
                    </div>
                </div>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}
