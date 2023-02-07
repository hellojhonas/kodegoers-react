import { createContext, useState, useContext } from "react";
import Swal from 'sweetalert2';

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token)  => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        Swal.fire({
            text: message,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            onClose: () => {
              // Perform any necessary actions after the notification has been closed
            }
          });
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);