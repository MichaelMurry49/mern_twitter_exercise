import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            handle: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.renderErrors = this.renderErrors.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if((this.state.form === "Sign In") && (nextProps.currentUser === true) ||
           (this.state.form === "Create Account") && (nextProps.signedIn === true)){
            this.props.history.push(this.state.historyPush);
        }

        this.setState({errors: nextProps.errors})
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            handle: this.state.handle
        }
        this.props.submit(user);
    }

    renderErrors(){
        const {errors} = this.props;
        return(
            <ul>
                {Object.keys(errors).map((error, i) => {
                    return <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                })}
            </ul>
        );
    }

    render() {
        const {email, password, password2, handle, form} = this.props;
        return (
            <div>
                <form onSubmit={ e => this.handleSubmit(e)}>
                    <div>
                        <input type={form === "Create Account" ? "text" : "hidden"}
                            value={handle}
                            onChange={this.update('handle')}
                            placeholder="Handle"
                        />
                        <input type="text"
                            value={email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br/>
                        <input type="password"
                            value={password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br/>
                        <input type={form === "Create Account" ? "password" : "hidden"}
                            value={password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        <br/>
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}

                    </div>
                </form>
            </div>
        )
    }


}

export default withRouter(SessionForm);