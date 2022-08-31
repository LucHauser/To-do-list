import axios from 'axios';
import React, { useState } from 'react';

export interface IProps {
    setToken: (tocken: "") => void;
}

const initBody = { "email": "", "password": ""};

function Login (props: IProps) {
    const baseURL = "http://localhost:3000/auth/jwt/sign";

    const [formValue, setFormValue] = useState(initBody);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    function onFormSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        axios.post(baseURL, { "email": formValue.email, "password": formValue.password }).then((response) => {
            let token = response.data.token;
            props.setToken(token);
        }).catch((error) => {
            alert("Login failed");
        });
    }
    return (
        <div className='loginForm'>
            <h2>Login</h2>
            <form className="formLogin" onSubmit={onFormSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    placeholder="please input your email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    value={formValue.email}
                    onChange={onInputChange}
                />
                <br/>
                <label>Password: </label>
                <input
                    type="password"
                    placeholder="please input your password"
                    name="password"
                    value={formValue.password}
                    onChange={onInputChange}
                />
                <button className='btn btn-dark'>Login</button>
        </form>
        </div>
    );
}

export default Login;