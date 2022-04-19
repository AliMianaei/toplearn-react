import React from 'react';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
    return ( 
        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeStyle={{color:'red'}}> صفحه اصلی </NavLink>
                            <a href=""> درباره ما </a>
                            <a href=""> تماس با ما </a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea" style={{display:'flex', justifyContent:'flex-end'}}>
                        <div className="loggein" style={{marginLeft:'20px'}}>
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/user-profile" activeStyle={{color:'red'}}> پنل کاربری </NavLink>
                        </div>
                        <div className="signin">
                            <i className="zmdi zmdi-account"></i>
                            <NavLink to="/login" activeStyle={{color:'red'}}> ورود </NavLink> /
                            <NavLink to="/register" activeStyle={{color:'red'}}> عضویت </NavLink>
                        </div>
                    </div>  
                </div>
            </div>
        </nav>
    );
}
 
export default TopNav;