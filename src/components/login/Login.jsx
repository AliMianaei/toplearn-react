import React, {useState, useRef} from 'react';
import {withRouter} from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { Lines } from 'react-preloaders';
// import {} from 'react-preloaders';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import Helmet from 'react-helmet';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState();
    const [loading, setLoading] = useState(false);

    const [, forceUpdate] = useState();

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد.",
            min: "حداقل 5 کارکتر مورد نیاز است.",
            email: "ایمیل نوشته شده صحیح نمی باشد.",
            password: "حداقل 6 کارکتر باشد"
        },
        element: message => <div style={{color:'red'}}>{message}</div>
    }));
    
    // console.log(loading);

    const reset = () => {
        setEmail("");
        setPassword("");
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password }

        try {
            if(validator.current.allValid()) {
                // setLoading(true);
                // console.log(loading);
                const {status, data} = await loginUser(user);
                if (status === 200) { // status code for login (retrieve user from DB)
                    // setLoading(false);
                    // console.log(loading);
                    toast.success("ورود با موفقیت انجام شد", {position:'top-right', closeOnClick:true});
                    localStorage.setItem("token", data.token);
                    props.history.replace("/");
                    console.log(data);
                    reset();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch(ex) { 
            // setLoading(false);
            toast.error("مشکل پیش آمده", {position:"top-right", closeOnClick:true});
            console.log(ex);
        }
        
    }
    return (  
        <main className="client-page">
            <div className="container-content">
                <header><h2> ورود به سایت </h2></header>
                <Helmet>
                    <title>
                        تاپلرن | ورود به سایت
                    </title>
                </Helmet>
                {/* {loading ? (<Lines time={0}  color="#888" />) : null} */}
                {/* <Lines time={0}  color="#888" customLoading={loading}/> */}
                <div className="form-layer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="input-group-addon" id="email-address"><i className="zmdi zmdi-email"></i></span>
                            <input 
                                type="text" 
                                name="email"
                                className="form-control" 
                                placeholder="ایمیل" 
                                aria-describedby="email-address" 
                                value={email} 
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor("email");
                                }}
                            
                            />
                        </div>
                        {validator.current.message("email", email, "required|email")}
                        <div className="input-group">
                            <span className="input-group-addon" id="password"><i className="zmdi zmdi-lock"></i></span>
                            <input 
                                type="password" 
                                name="password"
                                className="form-control" 
                                placeholder="رمز عبور " 
                                aria-describedby="password" 
                                value={password} 
                                onChange={e => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor("password");
                                }}
                                />
                        </div>
                        {validator.current.message("password", password, "required|min:5")}
                        <div className="remember-me">
                            <label>
                                <input 
                                type="checkbox" 
                                name="remember" 
                                onChange={e => {
                                    setRemember(e.currentTarget.checked);
                                    validator.current.showMessageFor("remember");
                                }}
                                />  مرا بخاطر بسپار </label>
                        </div>
                        {validator.current.message("remember", remember, "required")}

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-lock"></i> رمز عبور خود را فراموش کرده ام !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> عضویت در سایت </a>
                        </div>
                        <button className="btn btn-success"> ورود به سایت </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
 
export default withRouter(Login);