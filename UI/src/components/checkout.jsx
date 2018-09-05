import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { API_URL } from "../apiurl";

class Checkout extends Component {
  state = {
    headerDropDown: "Pilih Jadwal",
    clicked: false,
    dropdownOpen: false,
    movie: [],
    jadwal: [],
    jadwalClicked: [],
    jadwalOnClickedIndex: [],
    seats: [],
    seatsClicked: [],
    seatsClickedIndex: [],
    arrSeat: [
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false }
    ]
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  arrSeatCleaner = () => {
    for (let i = 0; i <= this.state.arrSeat.length - 1; i++) {
      this.state.arrSeat[i].checked = false;
    }
    this.setState({});
  };

  componentWillMount() {
    this.getData();
  }

  getJadwal = () => {
    axios.get(API_URL + "/jadwal").then(res =>
      this.setState({
        jadwal: res.data,
        movie: [this.props.movie]
      })
    );
  };

  getSeats = () => {
    axios.get(API_URL + "/seats").then(res =>
      this.setState({
        seats: res.data
      })
    );
  };
  getData = () => {
    this.getJadwal();
    this.getSeats();
  };

  renderMovie = () => {
    return this.state.movie.map(e => {
      return (
        <div className="row">
          <div className="col-md-2">
            <img src={e.image} />
          </div>
          <div className="col d-flex justify-content-left">
            <div>
              <h3>{e.title}</h3>
              <br />
              {e.studio}
              <br />
              <div className="btn btn-light">IMDB</div>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>
                  {this.state.headerDropDown}
                </DropdownToggle>
                <DropdownMenu>{this.renderJadwal()}</DropdownMenu>
              </ButtonDropdown>
            </div>
          </div>
        </div>
      );
    });
  };
  renderJadwal = () => {
    return this.state.jadwal.map(e => (
      <DropdownItem
        onClick={() => {
          this.onJadwalClicked(e);
        }}
      >
        {e.jamTayang}
      </DropdownItem>
    ));
  };
  onJadwalClicked = jadwal => {
    this.state.jadwalClicked.push(jadwal);
    this.state.jadwalOnClickedIndex = jadwal.id - 1;
    if (this.state.clicked) {
      this.state.headerDropDown = "Pilih Jadwal";
    } else {
      this.state.headerDropDown = jadwal.jamTayang;
    }
    this.setState({
      clicked: !this.state.clicked,
      seatsClickedIndex: []
    });
    this.getData();
  };

  renderSeats = () => {
    if (this.state.clicked) {
      // proses disable checkbox jika sudah ada yang booking(sesuai data API)
      if (
        this.state.jadwal[this.state.jadwalOnClickedIndex].seatBookedIndex
          .length > 0
      ) {
        const seatsDisabledIndex = [
          ...this.state.jadwal[this.state.jadwalOnClickedIndex].seatBookedIndex
        ];
        // looping untuk mengganti disabled menjadi false dengan state lokal(sesuai data API)
        for (let i = 0; i < this.state.seats.length; i++) {
          for (let j = 0; j < seatsDisabledIndex.length; j++) {
            if (i === seatsDisabledIndex[j]) {
              this.state.seats[i].disabled = true;
            }
          }
        }
        return this.state.seats.map(e => {
          if (e.id == 11) {
            return <div className="w-100" />;
          }
          return (
            <td className="col">
              <input
                type="checkbox"
                onClick={() => this.onSeatsClicked(e, e.id - 1)}
                disabled={e.disabled}
                checked={this.state.arrSeat[e.id - 1].checked}
              />
              {e.title}
            </td>
          );
        });
      }
      //   jika belum ada yang booking dirender seperti biasa
      else {
        return this.state.seats.map(e => {
          if (e.id == 11) {
            return <div className="w-100" />;
          }
          return (
            <td className="col">
              <input
                type="checkbox"
                onClick={() => this.onSeatsClicked(e, e.id - 1)}
                disabled={e.disabled}
                checked={this.state.arrSeat[e.id - 1].checked}
              />
              {e.title}
            </td>
          );
        });
      }
    }
  };
  onSeatsClicked = (seats, index) => {
    this.state.seatsClicked.push(seats);
    this.state.seatsClickedIndex.push(index);
    if (
      this.state.seatsClicked[this.state.seatsClicked.length - 1] ==
      this.state.seatsClicked[this.state.seatsClicked.length - 2]
    ) {
      this.state.seatsClicked.pop();
      this.state.seatsClickedIndex.pop();
    }
    this.state.arrSeat[index].checked = true;
    this.setState({});
  };

  renderHarga = () => {
    if (this.state.jadwalOnClickedIndex === 0) {
      return 25000 * this.state.seatsClicked.length;
    }
    if (this.state.jadwalOnClickedIndex === 1) {
      return 35000 * this.state.seatsClicked.length;
    }
    if (this.state.jadwalOnClickedIndex === []) {
      return 0;
    }
  };

  onBookingClicked = () => {
    const indexTerakhir = this.state.jadwalClicked.length - 1;
    axios
      .put(API_URL + "/jadwal/" + this.state.jadwalClicked[indexTerakhir].id, {
        id: this.state.jadwalClicked[indexTerakhir].id,
        title: this.state.jadwalClicked[indexTerakhir].title,
        jamTayang: this.state.jadwalClicked[indexTerakhir].jamTayang,
        seatBookedIndex: [...this.state.seatsClickedIndex]
      })
      .then(res => {
        this.arrSeatCleaner();
        this.getData();
      })
      .catch(err => console.log(err));

    //   proses update database berdasarkan film jadwal dan seat dan transaction history user
    if (this.state.jadwalClicked[indexTerakhir].title == "Shift1") {
      //   axios
      //     .put(API_URL + "/movielist/" + this.state.movie[0].id, {
      //       id: this.state.movie[0].id,
      //       title: this.state.movie[0].title,
      //       studio: this.state.movie[0].studio,
      //       description: this.state.movie[0].description,
      //       image: this.state.movie[0].image,
      //       shift1SeatBookedIndex: [...this.state.seatsClickedIndex],
      //       shift2SeatBookedIndex: this.state.movie[0].shift2SeatBookedIndex
      //     })
      //     .then(res => {})
      //     .catch(err => console.log(err));
      axios
        .put(API_URL + "/users/" + this.props.auth.id, {
          email: this.props.auth.email,
          username: this.props.auth.username,
          password: this.props.auth.password,
          movie: this.state.movie[0].title,
          studio: this.state.movie[0].studio,
          jadwal: this.state.jadwalClicked[indexTerakhir].jamTayang,
          seat: [...this.state.seatsClickedIndex],
          id: 1
        })
        .then(e => {
          alert(`Total biaya Rp.${this.renderHarga()}`);
          this.setState({ seatsClicked: [] });
        })
        .catch(err => console.log(err));
    } else {
      //   axios
      //     .put(API_URL + "/movielist/" + this.state.movie[0].id, {
      //       id: this.state.movie[0].id,
      //       title: this.state.movie[0].title,
      //       studio: this.state.movie[0].studio,
      //       description: this.state.movie[0].description,
      //       image: this.state.movie[0].image,
      //       shift1SeatBookedIndex: this.state.movie[0].shift1SeatBookedIndex,
      //       shift2SeatBookedIndex: [...this.state.seatsClickedIndex]
      //     })
      //     .then(res => {})
      //     .catch(err => console.log(err));
      axios
        .put(API_URL + "/users/" + this.props.auth.id, {
          email: this.props.auth.id,
          username: this.props.auth.username,
          password: this.props.auth.password,
          movie: this.state.movie[0].title,
          studio: this.state.movie[0].studio,
          jadwal: this.state.jadwalClicked[indexTerakhir].jamTayang,
          seat: [...this.state.seatsClickedIndex],
          id: 1
        })
        .then(e => {
          alert(`Total biaya Rp.${this.renderHarga()}`);
          this.setState({ seatsClicked: [] });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.state);
    return (
      <div style={{ color: "white", margin: 2 + "em" }}>
        {this.renderMovie()}
        <div>
          {/* <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.state.headerDropDown}</DropdownToggle>
            <DropdownMenu>{this.renderJadwal()}</DropdownMenu>
          </ButtonDropdown> */}
        </div>
        <div>
          <br />
          <br />
          <h3>Seats</h3>
          <div className="col-md-6">
            <div className="row">{this.renderSeats()}</div>
          </div>
          <br />
          <br />
          <h4>Total harga:</h4>
          Rp.
          {this.renderHarga()}
          <br />
          <br />
          <div className="btn btn-success" onClick={this.onBookingClicked}>
            Checkout
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, movie: state.movie };
};

export default connect(mapStateToProps)(Checkout);
