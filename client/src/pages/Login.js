import React, { useState } from 'react';
import API from "../utils/API";

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.username || !loginForm.password) {
            alert("Please provide all login information.");
        } else {
            API.createUser(loginForm)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                });
        }
        console.log(loginForm);
        setLoginForm({
            email: "",
            username: "",
            password: ""
        });
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email address: </label>
                <input type="email" name="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}/>
                <label htmlFor="username">Username: </label>
                <input type="username" name="username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
