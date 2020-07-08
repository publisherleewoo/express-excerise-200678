import React from "react";
import { Authentication } from "components";
import { connect } from "react-redux";
import { loginRequest } from "actions/authentication";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(() => {
            if (this.props.status === "SUCCESS") {
                // create session data
                let loginData = {
                    isLoggedIn: true,
                    username: id,
                };
                document.cookie = "key=" + btoa(JSON.stringify(loginData));
                alert(`환영합니다 ${id} !  `);
                this.props.history.push("/");
                return true;
            } else {
                alert(`Incorrect username or password  `);

                return false;
            }
        });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Authentication mode={true} onLogin={this.handleLogin} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
