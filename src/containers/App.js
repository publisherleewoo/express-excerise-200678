import React from "react";
import { Header } from "components";
import { connect } from "react-redux";
import { getStatusRequest, logoutRequest } from "actions/authentication";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie("key");

        // if loginData is undefined, do nothing
        if (typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if (!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(() => {
            console.log(this.props.status);
            // if session is not valid
            if (!this.props.status.valid) {
                // logout the session
                loginData = {
                    isLoggedIn: false,
                    username: "",
                };

                document.cookie = "key=" + btoa(JSON.stringify(loginData));

                // and notify

                alert("Your session is expired, please log in again");
            }
        });
    }
    handleLogout() {
        this.props.logoutRequest().then(() => {
            alert("Good Bye");

            // EMPTIES THE SESSION
            let loginData = {
                isLoggedIn: false,
                username: "",
            };

            document.cookie = "key=" + btoa(JSON.stringify(loginData));
        });
    }
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                {isAuth ? undefined : (
                    <Header
                        isLoggedIn={this.props.status.isLoggedIn}
                        onLogout={this.handleLogout}
                    />
                )}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
