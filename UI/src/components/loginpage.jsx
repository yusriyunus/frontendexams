import React, { Component } from "react";
import { connect } from "react-redux";
import { onLogin } from "../actioncreators";
import { Redirect } from "react-router-dom";
import "./css/loginpage.css";

class Login extends Component {
  state = {};

  onLoginClick = () => {
    console.log(this.props.auth);
    this.props.onLogin({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  };
  componentWillReceiveProps(newProps) {
    console.log(newProps.auth);
    if (newProps.auth.email !== "") {
      this.render = () => {
        return <Redirect to="/" />;
      };
    }
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Welcome</h5>
                <form class="form-signin">
                  <div class="form-label-group">
                    <input
                      ref="email"
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      ref="password"
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Remember password
                    </label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="button"
                    onClick={this.onLoginClick}
                  >
                    Login
                  </button>
                  <hr class="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(
  mapStateToProps,
  { onLogin }
)(Login);
