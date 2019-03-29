import React from 'react';

class AuthForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registering: false,
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
        };
    }
    handleChange = ev => {
        this.setState({ [ev.target.name]: ev.target.value });
    }
    changeOperation = ev => {
        ev.preventDefault();
        this.setState((prevState) => {
            return {
                registering: !prevState.registering,
                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
            };
        })
    }
    handleSubmit = ev => {
        ev.preventDefault();
        if (this.state.registering){
            const user = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            };
            this.setState({
                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
            });
            this.props.onRegister(user);
        } else {
            const user = {
                username: this.state.username,
                password: this.state.password,
            };
            this.setState({
                username: '',
                password: '',
            });
            this.props.onLogin(user);
        }
    }
    render(){
        return (
            <section className="auth-container">
                {this.state.registering 
                ? (
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <input 
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <input 
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                        />
                        <input 
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                        />
                        <button>Register</button>
                        <button onClick={this.changeOperation}>Already a User?  Sign in!</button>
                    </form>
                )
                : (
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <button>Login</button>
                        <button type="button" onClick={this.changeOperation}>Not Currently a User?  Register!</button>
                    </form>
                )}
            </section>
        );
    }
}

export default AuthForm;