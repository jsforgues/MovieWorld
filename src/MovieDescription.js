import React from "react";
import { Button, Image, Dropdown, Grid, Rating, Flag } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "./searchicon.jpg";

const MovieDescription = () => {
  const API_URL = "http://www.omdbapi.com/?apikey=b310fc2a";
  //const API_URL = "https://www.omdbapi.com/?apikey=3c85df2";
  const [movieDes, setMovieDes] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch(`${API_URL}&t=${params.abc}`)
      .then((response) => response.json())
      .then((data) => setMovieDes(data))
      .catch((erreur) => console.log(erreur));
  }, [params.abc]);
  console.log(movieDes);

  // get the film imdb rating, using the element "Rating" in semantic UI
  const getRating = () => {
    console.log(Math.round(movieDes.imdbRating));
    return Math.round(movieDes.imdbRating);
  };

  // not be implemented, will do it later
  const getflag = () => {};

  // setting year selection
  const countryOptions = [
    { key: "1900", value: "1900", text: "1900" },
    { key: "2020", value: "2020", text: "2020" },
    { key: "2021", value: "2021", text: "2021" },
    { key: "2022", value: "2022", text: "2022" },
  ];

  return (
    <div className="App">
      <div className="title">
        <h1 className="titletxt">Movie World</h1>
      </div>
      <div className="search">
        <input
          className="searchtext"
          placeholder="Search for movies"
          value={movieDes.Title}
          onChange={() => {}}
        ></input>
        <img
          className="searchicon"
          src={SearchIcon}
          alt="search"
          onClick={() => {}}
        ></img>
      </div>

      <div className="type">
        <p className="typetitle"> Type </p>
        <div className="typechoice">
          <Button.Group vertical className="choicebutton" color="blue">
            <Button onClick={() => {}}>Movie</Button>
            <Button onClick={() => {}}>Series</Button>
            <Button onClick={() => {}}>Episode</Button>
          </Button.Group>
        </div>
        <div className="yearchoice">
          <p className="yeartitle">
            Year <br />
          </p>
          <Dropdown
            className="yearselect"
            placeholder="Select "
            fluid
            selection
            options={countryOptions}
          />
        </div>
        <div className="imdbidchoice">
          <p className="imdbidtitle">red
            IMDB id <br />
          </p>
          <input
            className="imdbidtext"
            placeholder="Search"
            value={movieDes.imdbID}
            onChange={() => {}}
          ></input>
        </div>
      </div>

      <div className="moviesdisplay">
        <Grid>
          <Grid.Column width={4}>
            <Image
              className="descriptionimg"
              centered="true"
              alt="poster"
              src={movieDes.Poster}
            />
          </Grid.Column>
          <Grid.Column width={10} className="descriptioninfo">
            <h1 className="descriptiontitle">
              {movieDes.Title} ({movieDes.Year} )
            </h1>
            <p className="descriptionrating">
              <Rating icon="star" rating={getRating()} maxRating={10} />
              <span>{movieDes.imdbRating} / 10</span>
              <span className="descriptiontime">
                {movieDes.Runtime} / {movieDes.Released}{" "}
              </span>
            </p>
            <p>
              {" "}
              <span className="prompt">Genre:</span> {movieDes.Genre} <br />
            </p>
            <p>
              {" "}
              <span className="prompt">Country:</span> {movieDes.Country}{" "}
              <Flag name={getflag()} />
              <br />{" "}
            </p>
            <p>
              {" "}
              <span className="prompt">Language:</span> {movieDes.Language}{" "}
              <br />{" "}
            </p>
            <p>
              {" "}
              <span className="prompt">Awards:</span> {movieDes.Awards} <br />{" "}
            </p>
            <p>
              {" "}
              <span className="prompt">Director:</span>
              {movieDes.Director} <br />
            </p>
            <p>
              {" "}
              <span className="prompt">Writer:</span> {movieDes.Writer} <br />{" "}
            </p>
            <p>
              {" "}
              <span className="prompt">Actors:</span> {movieDes.Actors} <br />{" "}
            </p>
            <h2 className="descriptionoverview">Overview</h2>
            <p>{movieDes.Plot} </p>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default MovieDescription;
