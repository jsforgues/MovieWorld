import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";

// show the moviecards, at the bottom, there is a link to see the details about this film

const MovieCards = ({ movie }) => {
  // console.log("movie: " + movie.Title);
  let label;
  if (movie.Type === 'movie') {
    label = <a className="ui green tag label">Movie</a>;
  } else if (movie.Type === 'series') {
    label = <a className="ui blue tag label">Series</a>;
  } else if (movie.Type === 'episode') {
    label = <a className="ui purple tag label">Episode</a>;
  } else {
    label = <a className="ui pink tag label">Autre</a>;
  }
  return (
    <div className="moviecards">
      <Card color="grey">
        <Card.Content>
          <Image className="cardsimage" src={movie.Poster} />
          <Card.Header className="cardstitle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: 8 }}>
            <a className="ui black label">{movie.Title}</a>
          </Card.Header>
          <Card.Meta className="cardstype" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: 6 }}>{label}</Card.Meta>
          <Card.Description className="cardsyear">
          <a className="ui gray label" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '1.2rem', color: 'black' }}>{movie.Year}</a>
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{backgroundColor: '#383838', margin: 0, paddingTop: 0}}>
          <Link to={`/movie/${movie.Title}`}>
            <button className="ui inverted yellow button" style={{ width: '100%' }}>Details</button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default MovieCards;