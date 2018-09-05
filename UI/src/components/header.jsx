import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onLogout } from "../actioncreators";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick = () => {
    this.props.onLogout();
  };
  render() {
    if (this.props.auth.username !== "") {
      console.log(this.props.auth);
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Cinema Booking-Seat</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hello, {this.props.auth.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Change Seat</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.onLogoutClick}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Cinema Booking-Seat</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/login">Login</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/register">Register</Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(
  mapStateToProps,
  { onLogout }
)(Header);
