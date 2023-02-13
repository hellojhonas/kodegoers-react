import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import reportastro from '../assets/report-astro.png'
import '../css/session.css'
export default function NotAvailable() {
    const navigate = useNavigate();
    const onSubmit = ev => {
        ev.preventDefault();
        navigate("/files");
    }
    return (
        <div class="container-session">
            <div class="child">
            <img className="hero-img" src={reportastro}/>
                <h1>Feature not yet available</h1>
                <p className='session-p'>Hello there! We apologize for the inconvenience. The feature you are trying to access is not yet available at this moment. Our team is working hard to bring it to you as soon as possible. Thank you for your patience and understanding.</p>
                <button 
                        className="session-btn" onClick={onSubmit}>Back to Files
                </button>
            </div>
        </div>
    )
}