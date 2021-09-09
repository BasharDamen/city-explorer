import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArray: [],
    };
  }

  displayMovie = () => {
    let movieName = this.props.movieName;
    let movieURL = `https://city-explorer-bd-server.herokuapp.com/movie?origin_country=${movieName}`;

    axios
      .get(movieURL)
      .then((result) => {
        // console.log(result);
        this.setState({
          moviesArray: result.data,
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
        <Row xs={1} md={3} className="g-4">
        {this.state.moviesArray.map((item, i) => {
          return (
            <Col>
              <Card>
                <Card.Img variant="top" src={item.imageURL} />
                <Card.Body>
                  <Card.Title>Title: {item.title}</Card.Title>
                  <Card.Text>overview: {item.overview}</Card.Text>
                  <Card.Text>Average Votes: {item.avgVotes}</Card.Text>
                  <Card.Text>popularity: {item.popularity}</Card.Text>
                  <Card.Text>released:{item.released}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            // <Card className="bg-dark text-white">
            //   <Card.Img src={item.imageURL} alt="Card image" />
            //   <Card.ImgOverlay>
            //     <Card.Title>Title: {item.title}</Card.Title>
            //     <Card.Text>overview: {item.overview}</Card.Text>
            //     <Card.Text>Average Votes: {item.avgVotes}</Card.Text>
            //     <Card.Text>popularity: {item.popularity}</Card.Text>
            //     <Card.Text>released:{item.released}</Card.Text>
            //   </Card.ImgOverlay>
            // </Card>
          );
        })}
        </Row>
        {/* <Col>
          <Card>
            <Card.Img variant="top" src={item.imageURL} />
            <Card.Body>
              <Card.Title>Title: {item.title}</Card.Title>
              <Card.Text>overview: {item.overview}</Card.Text>
              <Card.Text>Average Votes: {item.avgVotes}</Card.Text>
                <Card.Text>popularity: {item.popularity}</Card.Text>
                <Card.Text>released:{item.released}</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </>
    );
  }
}

export default Movie;
