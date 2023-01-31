import { useEffect, useRef, useState } from "react";
import Page404 from "./Page404";
import SearchIcon from "./searchicon.jpg";
import MovieCards from "./MovieCards";
import { Button, Dropdown, Input } from "semantic-ui-react";
import Notfound from "./Notfound";
import { Link } from "react-router-dom";

// OMDb Api key=b310fc2a

const API_URL = "http://www.omdbapi.com/?apikey=b310fc2a";
//const API_URL = "https://www.omdbapi.com/?apikey=3c85df2";

// component for Movie Searching

const MoviesSearch = () => {
  const [nom, setNom] = useState(""); // variable for the film's name
  const [searchnbr, setSearchnbr] = useState(""); // the number of the searching by using film name/key words
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState(""); // film's type
  const [id, setId] = useState(""); //film's IMDB id
  const [year, setYear] = useState(""); //film's release year

  //connect to API, using the API search function, get the realted movie list, only searching the first 10 pages
  /*
  const searchMovies = (nom) => {
    setMovies([]);
    setType("");
    for (let i = 1; i < 10; i++) {
      console.log(nom);
      nom === ""
        ? alert("film's name can't be empty")
        : fetch(`${API_URL}&s=${nom}&page=${i}`)
            .then((response) => response.json())
            .then((data) =>
              setMovies((prevMovies) => [...prevMovies, ...data.Search])
            )
            .catch((erreur) => console.log(erreur));
    }
  };
  */

  //connect to API, using the API search function, get the realted movie list, if there are more pages result, only searching the first 10 pages
  const myRef = useRef(null);
  const searchPageNbr = (nom) => {
    console.log("nom6:" + nom);
    nom === ""
      ? alert("film's name can't be empty")
      : fetch(`${API_URL}&s=${nom}&page=1`)
        .then((response1) => response1.json())
        .then((data1) => data1.totalResults) /* totalresult nombres de films trouves*/
        .then((j) => setSearchnbr(j)) /*setSearchnbr = nombre de film trouve quand on fait une recherche par nom (usetate)*/
        .catch((erreur) => console.log(erreur));
  };

  useEffect(() => {
    console.log("searchnbr: " + searchnbr);
    myRef.current = searchnbr;
    console.log("myRef2:" + myRef.current);


    if (Math.ceil(searchnbr / 10) > 10) { /*nombre de page =10. 10 films par page*/
      setMovies([]);
      setType("");
      for (let i = 1; i < 10; i++) { /*nombre de page =10*/
        console.log("nom2:" + nom);
        fetch(`${API_URL}&s=${nom}&page=${i}`)
          .then((response) => response.json())
          .then((data) =>
            setMovies((prevMovies) => [...prevMovies, ...data.Search])
          )
          .catch((erreur) => console.log(erreur));
      }
    } else {
      setMovies([]);
      setType("");
      for (let i = 1; i <= Math.ceil(searchnbr / 10); i++) {
        //console.log(mynomRef.current);
        fetch(`${API_URL}&s=${nom}&page=${i}`)
          .then((response) => response.json())
          .then((data) =>
            setMovies((prevMovies) => [...prevMovies, ...data.Search])
          )
          .catch((erreur) => console.log(erreur));
      }
    }
  }, [searchnbr]); /* il change, la boucle*/

  //connect to API, using the API search function with IMDB id, only searching the related film
  const searchMoviesid = (id) => {
    setMovies([]);
    fetch(`${API_URL}&i=${id}`)
      .then((response) => response.json())
      .then((data) => setMovies((prevMovies) => [...prevMovies, data]))
      .catch((erreur) => console.log(erreur));
  };

  //refresh the site ()
  useEffect(() => {
    setMovies([]);
    setType("");
    for (let i = 1; i < 10; i++) { /*nombre de page = 10*/
      fetch(`${API_URL}&s=${"live"}&page=${i}`) /* live est le mot de recherche par default*/
        .then((response) => response.json())
        .then((data) =>
          setMovies((prevMovies) => [...prevMovies, ...data.Search])
        )
        .catch((erreur) => console.log(erreur));
    }
  }, []); /* la liste vide parce que on a pas besoin du nombre de film *une seule fois au debut et quand on fait f5 */

  //show movie list in console
  console.log(movies);

  //setting year selection
  const yearOptions = [
    { key: "1900", value: "1900", text: "1900" },
    { key: "2020", value: "2020", text: "2020" },
    { key: "2021", value: "2021", text: "2021" },
    { key: "2022", value: "2022", text: "2022" },
  ];

  //layout
  return (
    <div className="App">
      <div className="title">
        <h1 className="titletxt">Movie World</h1>
      </div>
      <div className="search">
        <input
          className="searchtext"
          placeholder="Search for movies"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        ></input>
        <img
          className="searchicon"
          src={SearchIcon}
          alt="search"
          onClick={() => {
            id === "" ? searchPageNbr(nom) : searchMoviesid(id);
          }}
        ></img>
      </div>
      {/*show the searched movies cards, you can choose the type: movie,series,espisode */}
      {movies.length > 0 ? (
        <div className="moviesdisplay">
          {movies.map((movie) => {
            console.log("cccc" + type);
            return type === "" ? (
              <MovieCards movie={movie}></MovieCards>
            ) : movie.Type === type ? (
              <MovieCards movie={movie}></MovieCards>
            ) : undefined;
          })}
        </div>
      ) : undefined}

      <div className="type">
        <p className="typetitle"> Type </p>

        <div className="typechoice">
          <Button.Group vertical color="blue" className="choicebutton">
            <Button
              onClick={(e) => {
                setType("movie");
              }}
            >
              Movie
            </Button>
            <Button
              onClick={(e) => {
                setType("series");
              }}
            >
              Series
            </Button>
            <Button
              onClick={(e) => {
                setType("episode");
              }}
            >
              Episode
            </Button>
            <Button
              onClick={(e) => {
                setType("");
              }}
            >
              All
            </Button>
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
            options={yearOptions}
            onChange={(e) => setCountry(e.target.value)}//**ajout ici */
          />
        </div>
        <div className="imdbidchoice">
          <p className="imdbidtitle">
            IMDB id <br />
          </p>
          <input
            className="imdbidtext"
            placeholder="Search: tt0000111"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default MoviesSearch;
