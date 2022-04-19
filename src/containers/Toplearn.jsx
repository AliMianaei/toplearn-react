import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
// import jwt from 'jsonwebtoken';
import { decodeToken } from '../utils/decodeToken';
import Course from '../components/course/Course';
import Archive from '../components/course/Archive';
import MainLayout from '../components/layouts/MainLayout';
import Login from '../components/login/Login';
import UserProfile from '../components/profile/UserProfile';
import Register from '../components/Register/Register';
import SingleCourse from '../components/course/SingleCourse';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../utils/paginate';
import { addUser } from '../actions/user';

const Toplearn = () => {

    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    const indexCourses = paginate(courses, 1, 8);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if(token) {
    //         // const decodedToken = jwt.decode(token, {complete:true});
    //         const decodedToken = decodeToken(token);
    //         const dateNow = Date.now() / 1000; // ms to s

    //         if(decodedToken.payload.exp < dateNow) {
    //             localStorage.removeItem("token");
    //         } else {
    //             dispatch(addUser(decodedToken.payload.user));
    //         }   
    //     }
    // }, []);

    return ( 
        <MainLayout>
            <Switch>
                <Route path='/login'  component={Login} />
                <Route path='/register'  component={Register} />
                <Route path='/archive'  component={Archive} />
                <Route path='/user-profile'  component={UserProfile} />
                <Route path='/course/:id'  component={SingleCourse} />
                {/* <Route path='/' exact component={Course} /> */}
                <Route path='/' exact render={() => <Course courses={indexCourses}/>} />
            </Switch>
        </MainLayout>
    );
}
 
export default Toplearn;