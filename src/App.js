import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Toplearn from './containers/Toplearn';

const App = () => {

    useEffect(() => {
        require('./utils/script');
    },[]);

    return (  
        <BrowserRouter>
            <Toplearn />
            <ToastContainer rtl/>
        </BrowserRouter>
    );
}
 
export default App;