import React, {useRef, useState, useEffect} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/userService';
import Helmet from 'react-helmet';
const Register = ({history}) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();
    const [, forceUpdate] = useState();

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد.",
            min: "حداقل 5 کارکتر مورد نیاز است.",
            email: "ایمیل نوشته شده صحیح نمی باشد.",
            password: "حداقل 6 کارکتر باشد"
        },
        element: message => <div style={{color:'red', marginBottom:'10px'}}>{message}</div>
    }));

    // useEffect(()=> {
    //     document.title = "تاپلرن | عضویت در سایت";
    // },[]);

    const reset = () => {
        setFullname("");
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        }

        try {
            if(validator.current.allValid()) {
                const {status} = await registerUser(user);
                if(status === 201){  // status code for register (create user in DB)
                    toast.success("کاربر ساخته شد", {position:'top-right', closeOnClick:true});
                    history.push("/login");
                    reset();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1); 
            }
        } catch(ex) {
            toast.error("مشکل پیش آمده", {position:"top-right", closeOnClick:true});
            console.log(ex);
        }
    }

    return (  
        <main className="client-page">
            <Helmet>
                <title>
                    تاپلرن | عضویت در سایت
                </title>
            </Helmet>
            <div className="container-content">
                <header><h2> عضویت در سایت </h2></header>
                <div className="form-layer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="input-group-addon" id="username"><i className="zmdi zmdi-account"></i></span>
                            <input 
                                type="text" 
                                name="fullname"
                                className="form-control" 
                                placeholder="نام و نام خانوادگی" 
                                aria-describedby="username"
                                value={fullname}
                                onChange={(e) => {
                                    setFullname(e.target.value);
                                    validator.current.showMessageFor("fullname");
                                }}
                            />
                        </div>
                            {validator.current.message("fullname", fullname, "required|min:5")}

                        <div className="input-group">
                            <span className="input-group-addon" id="email-address"><i className="zmdi zmdi-email"></i></span>
                            <input 
                                type="text" 
                                name="email"
                                className="form-control" 
                                placeholder="ایمیل" 
                                aria-describedby="email-address"
                                value={email}
                                onChange={(e) => {
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validator.current.showMessageFor("password");
                            }}
                            />
                        </div>
                        {validator.current.message("password", password, "required|min:5")}

                        <div className="accept-rules">
                            <label>
                                <input 
                                type="checkbox" 
                                name="policy" 
                                onChange={e => {
                                    setPolicy(e.currentTarget.checked);
                                    validator.current.showMessageFor("policy");
                                }}
                                />  قوانین و مقررات سایت را میپذیرم </label>
                            {validator.current.message("policy", policy,"required")}
                        </div>

                        <div className="link">
                            <a href=""> <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !</a>
                            <a href=""> <i className="zmdi zmdi-account"></i> ورود به سایت </a>
                        </div>
                        <button className="btn btn-success"> عضویت در سایت </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
 
export default Register;