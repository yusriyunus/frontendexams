import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { API_URL } from "../apiurl";
import { onMovieClicked } from "../actioncreators";

class Home extends Component {
  state = {
    movielist: [
      {
        id: 1,
        title: "Big Brother (Taai si hing)",
        studio: "studio1",
        description: "Best Movies",
        image:
          "https://www.showcasecinemas.com/sites/default/files/field/image/275213h1_2.jpg",
        jadwalBookedIndex: []
      },
      {
        id: 2,
        title: "Mile 22",
        studio: "studio2",
        description: "Best Movies",
        image:
          "https://www.showcasecinemas.com/sites/default/files/field/image/219033h1.jpg",
        jadwalBookedIndex: []
      },
      {
        id: 3,
        title: "Slender Man",
        studio: "studio 3",
        description: "Best Movies",
        image:
          "https://www.showcasecinemas.com/sites/default/files/field/image/243963h1.jpg",
        jadwalBookedIndex: []
      }
    ]
  };

  componentWillMount() {
    this.getDataMovie();
  }

  getDataMovie = () => {
    axios.get(API_URL + "/movielist").then(res =>
      this.setState({
        movielist: res.data
      })
    );
  };

  onMovieClicked = e => {
    console.log("hai");
    this.props.onMovieClicked(e);
  };
  renderCarousel = () => {
    return this.state.movielist.map(e => {
      return (
        <div>
          <img src={e.image} />
        </div>
      );
    });
  };

  renderImage = () => {
    return <Carousel>{this.renderCarousel()}</Carousel>;
  };
  renderMovieLogin = () => {
    return this.state.movielist.map(e => {
      return (
        <div>
          <img src={e.image} />
          <br />
          <center>
            {e.title}
            <br />
            {e.studio}
            <br />
            <Link to="/checkout">
              <div
                className="btn btn-success"
                onClick={() => this.onMovieClicked(e.id - 1)}
              >
                lihat
              </div>
            </Link>
          </center>
        </div>
      );
    });
  };

  renderMovieNotLogin = () => {
    return this.state.movielist.map(e => {
      return (
        <div>
          <img src={e.image} />
          <br />
          <center>
            {e.title}
            <br />
            {e.studio}
          </center>
        </div>
      );
    });
  };

  render() {
    console.log(this.state);
    if (this.props.auth.email === "") {
      return (
        <div>
          <center>
            <h1>CINEMAX</h1>
          </center>
          <div className="d-flex justify-content-center">
            {this.renderMovieNotLogin()}
          </div>
          Baron, ini udah coba ulang2 bikin carousel, tapi malah kayak di
          bawah...
          <Carousel
            className="container kucing"
            showThumbs={false}
            showStatus={false}
          >
            <div className="merdeka">
              <img src={this.state.movielist[0].image} />
            </div>
            <div className="merdeka">
              <img src={this.state.movielist[1].image} />
            </div>
            <div className="merdeka">
              <img src={this.state.movielist[2].image} />
            </div>
          </Carousel>
        </div>
      );
    }

    return (
      <div>
        <center>
          <h1>CINEMAX</h1>
        </center>
        <div className="row d-flex justify-content-center">
          {this.renderMovieLogin()}
          {/* Baron, ini udah aku coba brapa kali carouselnya, jadi kacau hasilnya */}
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
  { onMovieClicked }
)(Home);
