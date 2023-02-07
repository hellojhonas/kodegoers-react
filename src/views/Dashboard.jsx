import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import { Typography, Container } from '@mui/material';
import '../css/dashboard.css'
import { ForkLeft } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#B9AFBE',
  padding: theme.spacing(1),
    border: '1px solid #000000',
    borderRadius: '8px'
}));

export default function Dashboard() {
    return (
        <div>
            <Grid justifyContent="space-evenly" container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Topics</Typography>
                        <Paper className='scroll' square>
                            <ul>
                                <li><Checkbox/>
                                    Jargons and Terms
                                </li>
                                <li><Checkbox/>
                                    Web Development Stages
                                </li>
                            </ul>
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Tasks</Typography>
                        <Paper className='scroll' square>
                        <ul>
                                <li><Checkbox/>
                                    Paragraphs and Headings
                                </li>
                                <li><Checkbox/>
                                    Basic CSS
                                </li>
                            </ul>
                            </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Events</Typography>
                        <Paper className='scroll' square>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Leo integer malesuada nunc vel risus commodo. Blandit massa enim nec dui nunc mattis enim ut tellus. Eget mauris pharetra et ultrices neque ornare aenean euismod. Interdum varius sit amet mattis vulputate enim nulla. At elementum eu facilisis sed odio morbi quis commodo odio. Eget nullam non nisi est sit amet facilisis. Egestas diam in arcu cursus euismod quis. Et molestie ac feugiat sed lectus vestibulum. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Egestas sed tempus urna et pharetra pharetra. Sapien faucibus et molestie ac feugiat sed lectus. Eget felis eget nunc lobortis mattis aliquam. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet dictum sit amet justo donec enim. Nunc consequat interdum varius sit amet mattis vulputate.
                        </Paper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Typography variant='h6'>Notifications</Typography>
                        <Paper className='scroll' square>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Leo integer malesuada nunc vel risus commodo. Blandit massa enim nec dui nunc mattis enim ut tellus. Eget mauris pharetra et ultrices neque ornare aenean euismod. Interdum varius sit amet mattis vulputate enim nulla. At elementum eu facilisis sed odio morbi quis commodo odio. Eget nullam non nisi est sit amet facilisis. Egestas diam in arcu cursus euismod quis. Et molestie ac feugiat sed lectus vestibulum. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Egestas sed tempus urna et pharetra pharetra. Sapien faucibus et molestie ac feugiat sed lectus. Eget felis eget nunc lobortis mattis aliquam. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet dictum sit amet justo donec enim. Nunc consequat interdum varius sit amet mattis vulputate.
                            </Paper>
                    </Item>
                </Grid>
            </Grid>
        </div>
  );
}