import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, Container } from '@mui/material';
// import '../css/dashboard.css'
import { ForkLeft } from '@mui/icons-material';
import attendanceastro from '../assets/attendance-astro.png';
import '../css/attendance.css';
import {useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#B9AFBE',
  padding: theme.spacing(1),
    border: '1px solid #000000',
    borderRadius: '8px'
}));

export default function Attendances() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    const {user, token, notification, setUser, setToken} = useStateContext()
  
    useEffect(() => {
      getAttendances();
    }, [])

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])
  
  
    const getAttendances = () => {
      setLoading(true)
      axiosClient.get('/attendances')
        .then(({ data }) => {
          setLoading(false)
          setAttendances(data.data)
          console.log(data);
        })
        .catch(() => {
          setLoading(false)
        })
    }


    return (
        <div>
            <Grid justifyContent="space-evenly" container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item className='attendance-card'>
                        <Typography variant='h6'>Your Attendance</Typography>
                        <Paper className='attendance-scroll'>
                        <table>
                            <thead>
                            <tr>
                                <th>Attendance Date</th>
                                <th>Attendance Status</th>
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
                                {attendances.filter(a => a.attendance_status === 'Present').map(a => (
                                <tr key={a.id}>
                                    <td>{a.created_at}</td>
                                    <td>{a.attendance_status}</td>
                                </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        </Paper>
                    </Item>
                    <Item className='attendance-card'>
                        <Typography variant='h6'>Your Request</Typography>
                        <Paper className='attendance-scroll'>
                        <table>
                            <thead>
                            <tr>
                                <th>Request Title</th>
                                <th>Request Content</th>
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
                                {attendances.filter(at => at.attendance_status !== 'Present').map(at => (
                                <tr key={at.id}>
                                    <td>{at.attendance_title}</td>
                                    <td>{at.attendance_content}</td>
                                    <td><Link className="btn-edit" to={'/attendances/' + at.id}>Update Request</Link></td>
                                </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div className='attendance-quote'>
                        <h4>
                        "Attending every class is key to getting the most out of the bootcamp program, so make sure to be present and fully participate for maximum success!"
                        </h4>
                    </div>
                    <img className="hero-img" src={attendanceastro}/>
                    <Grid item xs={12}>
                    <Item className='attendance-report-card'>
                        <Typography variant='h6'>Student Attendance Helpdesk</Typography>
                        <Paper className='attendance-report' square>
                            <div>
                                <h3>File for a leave</h3>
                                <p>Don't forget to reach out to the program administrator if you need to take a break from your studies and request a leave of absence - just be sure to give the details and time frame in your friendly request.</p>
                                <Link className="btn-add" to="/attendances/new">File Leave</Link>
                            </div>
                            <div>
                                <h3>Appeal for Excuse</h3>
                                <p>Hey there, make sure to send in your report as soon as possible so that your absence can be considered excused and you can stay on track with the bootcamp program!</p>
                                <Link className="btn-add" to="/attendances/new">File Report</Link>
                            </div>
                        </Paper>
                    </Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
  );
}