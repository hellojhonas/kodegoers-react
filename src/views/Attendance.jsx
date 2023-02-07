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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#B9AFBE',
  padding: theme.spacing(1),
    border: '1px solid #000000',
    borderRadius: '8px'
}));

export default function Attendance() {
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
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>January 10, 2023</td>
                                    <td>Present</td>
                                </tr>
                            </tbody>
                        </table>
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <div className='attendance-quote'>
                        <h2>
                        Vivamus at augue eget arcu dictum varius duis.
                        </h2>
                    </div>
                    <img className="hero-img" src={attendanceastro}/>
                    <Grid item xs={12}>
                    <Item className='attendance-report-card'>
                        <Typography variant='h6'>Student Attendance Helpdesk</Typography>
                        <Paper className='attendance-report' square>
                            <div>
                                <h3>File for a leave</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <button className="btn btn-block">File Leave</button>
                            </div>
                            <div>
                                <h3>Appeal for Excuse</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <button className="btn btn-block">File Report</button>
                            </div>
                        </Paper>
                    </Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
  );
}