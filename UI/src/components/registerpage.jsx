import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { onRegister } from "../actioncreators";
import "./css/loginpage.css";

class Register extends Component {
  state = {};

  componentWillReceiveProps(newProps) {
    if (newProps.auth.username !== undefined) {
      this.render = () => {
        return <Redirect to="/" />;
      };
    }
  }
  onRegisterClick = () => {
    this.props.onRegister({
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      movie: "",
      studio: "",
      jadwal: "",
      seat: ""
    });
  };
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
                      type="text"
                      id="inputUserName"
                      ref="username"
                      class="form-control"
                      placeholder="User Name"
                      required
                      autofocus
                    />
                    <label for="inputUserName">User Name</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      ref="email"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      ref="password"
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
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="button"
                    onClick={this.onRegisterClick}
                  >
                    Register
                  </button>
                  <hr class="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // }
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { onRegister }
)(Register);
