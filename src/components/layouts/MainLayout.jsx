import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../common/Header';
import TopNav from '../navs/TopNav';
import MainNav from '../navs/MainNav';
import Footer from '../common/Footer';
import Breadcrumb from '../common/Breadcrumb';
import Helmet from 'react-helmet';

const MainLayout = (props) => {
    const {pathname} = props.location;
    return (  
        <Fragment>
            <Helmet>
                <title>
                    تاپلرن
                </title>
            </Helmet>
            <div className="landing-layer">
                <div className="container">
                    <TopNav/>
                    {pathname === '/' ? <Header/> : null}
                </div>
            </div>
            <MainNav/>
            {/* <Breadcrumb/> */}
            {props.children}
            <Footer/>
        </Fragment>
    );
}
 
export default withRouter(MainLayout);