import React, { useState } from 'react'

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.password) {
            alert("Please provide all login information.");
        }
        console.log(loginForm);
        setLoginForm({
            email: "",
            password: ""
        });
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email address: </label>
                <input type="email" name="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
