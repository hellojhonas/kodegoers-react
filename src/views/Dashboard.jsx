import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import { Typography, Container } from '@mui/material';
import '../css/dashboard.css'
import { ForkLeft } from '@mui/icons-material';
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#B9AFBE',
  padding: theme.spacing(1),
    border: '1px solid #000000',
    borderRadius: '8px'
}));


export default function Dashboard() {
    const [topics, setTopics] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        Promise.all([getTopics(), getTasks(), getEvents(), getNotifications()])
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }, [])

    const getTopics = () => {
        return axiosClient.get('/topics')
        .then(({ data }) => {
            setTopics(data.data)
            console.log(data);
        })
    }

    const getTasks = () => {
        return axiosClient.get('/tasks')
        .then(({ data }) => {
            setTasks(data.data)
            console.log(data);
        })
    }

    const getEvents = () => {
        return axiosClient.get('/events')
        .then(({ data }) => {
            setEvents(data.data)
            console.log(data);
        })
    }

    const getNotifications = () => {
        return axiosClient.get('/notifications')
        .then(({ data }) => {
            setNotifications(data.data)
            console.log(data);
        })
    }
    return (
        <div>
            <Grid justifyContent="space-evenly" container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Topics</Typography>
                        <Paper className='scroll' square>
                        {topics && topics.map(t => (
                        <ul key={t.id}>
                            <li><Checkbox/>{t.topic_title}</li>
                            <p>{t.topic_content}</p>
                        </ul>
                        ))}
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Tasks</Typography>
                        <Paper className='scroll' square>
                        {tasks && tasks.map(t => (
                        <ul key={t.id}>
                            <li><Checkbox/>{t.task_title}</li>
                            <p>{t.task_content}</p>
                        </ul>
                        ))}
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Events</Typography>
                        <Paper className='scroll' square>
                        <table>
                            <thead>
                            <tr>
                                <th>Event</th>
                                <th>Detail</th>
                                <th>Date</th>
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
                                {events.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.event_title}</td>
                                        <td>{e.event_content}</td>
                                        <td>{e.event_date}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Notifications</Typography>
                        <Paper className='scroll' square>
                        <table>
                            <thead>
                            <tr>
                                <th>Event</th>
                                <th>Detail</th>
                                <th>Date</th>
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
                                {notifications.map(notif => (
                                    <tr key={notif.id}>
                                        <td>{notif.notification_title}</td>
                                        <td>{notif.notification_content}</td>
                                        <td>{notif.notification_date}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                        </Paper>
                    </Item>
                </Grid>
            </Grid>
        </div>
  );
}