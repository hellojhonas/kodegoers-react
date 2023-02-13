import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import sessionastro from '../assets/session-astro.png'
import '../css/session.css'
export default function Session() {
    const navigate = useNavigate();
    const onSubmit = ev => {
        ev.preventDefault();
        navigate("/dashboard");
    }
    return (
        <div class="container-session">
            <div class="child">
                <h1>Welcome to Kodegoers</h1>
                <h1>Zoom Session</h1>
                <p className='session-p'>Waiting for host to start the Session</p>
                <img className="hero-img" src={sessionastro}/>
                <button 
                        className="session-btn" onClick={onSubmit}>Back to Dashboard
                </button>
            </div>
        </div>
    )
}