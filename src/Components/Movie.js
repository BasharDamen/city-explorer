import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArray:'',
    };
  }

  displayMovie = () => {
    let movieName = this.props.movieName;
    let movieURL = `https://city-explorer-bd-server.herokuapp.com/movie?query=${movieName}`;

    axios
      .get(movieURL)
      .then((result) => {
        // console.log(result);
        this.setState({
          moviesArray: result.data
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <Button
          variant="outline-success"
          type="button"
          onClick={this.displayMovie}
        >
          Related Movies
        </Button>{" "}
        {this.state.moviesArray.map((item, i) => {
          return (
            <Card className="bg-dark text-white">
              <Card.Img src={item[i].imageURL} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>Title: {item[i].title}</Card.Title>
                <Card.Text>overview: {item[i].overview}</Card.Text>
                <Card.Text>Average Votes: {item[i].avgVotes}</Card.Text>
                <Card.Text>popularity: {item[i].popularity}</Card.Text>
                <Card.Text>released:{item[i].released}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          );
        })}
      </>
    );
  }
}

export default Movie;
