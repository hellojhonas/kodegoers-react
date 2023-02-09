import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../css/defaultLayout.css';

import { useEffect } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import TodayIcon from '@mui/icons-material/Today';
import QuizIcon from '@mui/icons-material/Quiz';
import NotesIcon from '@mui/icons-material/Notes';
import FolderIcon from '@mui/icons-material/Folder';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';


export default function DefaultLayout(props) {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
        .then (() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    const drawerWidth = 240;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const onSubmit = ev => {
        ev.preventDefault();
        
        const attendance = {
        user_id: user.id,
        attendance_status: 'Present',
        created_at: new Date(),
        attendance_title: 'This user is present',
        attendance_content: 'This student is rocking his attendance'
        };
        
        axiosClient.post("/attendances", attendance)
        .then(() => {
        setNotification("Attendance was successfully recorded");
        navigate("/attendance");
        // window.open("https://www.example.com", "_blank");
        })
        .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
        setErrors(response.data.errors);
        }
        });
        };

    return (
        <div className='with-bg'>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar className='appbar'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        KodeGoers 
                    </Typography>
                    <button 
                        className="btn btn-block" onClick={onSubmit}>
                        Enter Session<MeetingRoomIcon/>
                    </button>
                    </Toolbar>

                </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            <div>
                <Toolbar />
                <Divider />
                <nav className="nav">
                    <ul>
                        <p>User: {user.name}</p>
                        <li><DashboardIcon/><Link to="/dashboard">Dashboard</Link></li>
                        <li><TodayIcon/><Link to="/attendances">Attendance</Link></li>
                        <li><QuizIcon/><Link to="/exercises">Exercises</Link></li>
                        <li><NotesIcon/><Link to="/notes">Notes</Link></li>
                        <li><FolderIcon/><Link to="/files">Files</Link></li>
                        {/* <li><Link to="/users">Users</Link></li> */}
                    </ul>
                </nav>
            </div>

            <nav className='bot-nav'>
                <ul>
                <li>
                    <SettingsIcon/>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <LogoutIcon/>
                    <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                </li>
                </ul>
            </nav>

            <nav className='footer'>
                <ul>
                <li>Copyright 2023 KodeGoers</li>
                <li>Terms and Services</li>
                <li>Privacy Policy</li>
                </ul>
            </nav>
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            <div>
            <Toolbar />
            <Divider />
                <nav className="nav">
                    <ul>
                        <p>User: {user.name}</p>
                        <li><DashboardIcon/><Link to="/dashboard">Dashboard</Link></li>
                        <li><TodayIcon/><Link to="/attendances">Attendance</Link></li>
                        <li><QuizIcon/><Link to="/exercises">Exercises</Link></li>
                        <li><NotesIcon/><Link to="/notes">Notes</Link></li>
                        <li><FolderIcon/><Link to="/files">Files</Link></li>
                        {/* <li><Link to="/users">Users</Link></li> */}
                    </ul>
                </nav>
            </div>

            <nav className='bot-nav'>
                <ul>
                <li><SettingsIcon/><Link to="/settings">Settings</Link></li>
                <li>
                    <LogoutIcon/>
                    <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                </li>
                </ul>
            </nav>

            <nav className='footer'>
                <ul>
                <li>Copyright 2023 KodeGoers</li>
                <li>Terms and Services</li>
                <li>Privacy Policy</li>
                </ul>
            </nav>

            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar/>
            <main>
                <Outlet/>
            </main>
            {notification &&
            <div className="notification">
                {notification}
            </div>
            }
        </Box>
        </Box>
        </div>
  );
}