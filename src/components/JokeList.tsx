import React from 'react';
import './JokeList.css';
import Joke from './Joke';

import { IJoke } from '../interfaces';

// Defines the shape of the props the JokeList expects
interface JokeListProps {
  jokes: IJoke[];
  handleVote: (id: string, delta: number) => void;
}

const JokeList: React.FC<JokeListProps> = ({ jokes, handleVote }) => {
  const renderedJokes = jokes.map((joke) => {
    return (
      <Joke
        key={joke.id}
        id={joke.id}
        text={joke.text}
        votes={joke.votes}
        upvote={() => handleVote(joke.id, 1)}
        downvote={() => handleVote(joke.id, -1)}
      />
    );
  });

  return (
    // <div className='JokeList'>
    //   <FetchPanel onFetch={handleClick} />
    //   <div className='JokeList__jokes'>{jokes && renderedJokes}</div>
    // </div>
    // <div className='JokeList'>
    <div className='JokeList'>{jokes && renderedJokes}</div>
    // </div>
  );
};

export default React.memo(JokeList);
