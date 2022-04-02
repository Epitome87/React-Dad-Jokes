import React, { useEffect, useState } from 'react';
import FetchPanel from './FetchPanel';
import JokeList from './JokeList';
import axios from 'axios';
import { IJoke } from '../interfaces';
import './JokePage.css';

const JOKE_API_URL = 'https://icanhazdadjoke.com/';

const numJokesToFetch = 10;

function JokePage() {
  // Set jokes to those in our local storage. OR if none exist, parsing "[]" means empty array
  const parsedJokes = JSON.parse(window.localStorage.getItem('jokes') || '[]');
  const [jokes, setJokes] = useState<IJoke[] | []>(parsedJokes);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set to help us keep track of which jokes are unique
  const seenJokes = new Set(jokes.map((j) => j.text));

  useEffect(() => {
    if (jokes.length === 0) getJokes();
    // We have jokes, but they may not be sorted yet
    else setJokes(sortJokes(jokes));
    console.log('how often am I called?');
  }, []);

  const getJokes = async () => {
    const fetchedJokes = [];

    // Fetch unique jokes until we have the amount desired
    while (fetchedJokes.length < numJokesToFetch) {
      // Have to set a config object with the appropriate headers, as the joke API returns HTML!
      const joke = await axios.get(JOKE_API_URL, {
        headers: { Accept: 'application/json' },
      });

      if (!seenJokes.has(joke.data.joke)) {
        // Todo: Prevent duplicate jokes (based on their ID)
        const newJoke: IJoke = {
          text: joke.data.joke,
          id: joke.data.id,
          votes: 0,
          // upvote: () => handleVote(joke.data.id, 1),
          // downvote: () => handleVote(joke.data.id, -1),
        };

        fetchedJokes.push(newJoke);
      }
    }

    // Set state with fetched jokes
    setJokes([...sortJokes(jokes), ...fetchedJokes]);
    setIsLoading(false);

    // Local Storage only stores strings -- so convert jokes object to string
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  const handleVote = (id: string, delta: number) => {
    setJokes((prevJokes) => {
      return prevJokes.map((joke) => {
        return id === joke.id ? { ...joke, votes: joke.votes + delta } : joke;
      });
    });
    window.localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  const handleClick = () => {
    setIsLoading(true);
    getJokes();
  };

  const sortJokes = (jokes: IJoke[]) => {
    return jokes.sort((a, b) => b.votes - a.votes);
  };

  if (isLoading) {
    return (
      <div className='JokePage'>
        <div className='JokeList__spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='FetchPanel__title'>Loading</h1>
        </div>
      </div>
    );
  }

  return (
    <main className='JokePage'>
      <FetchPanel onFetch={handleClick} />
      <JokeList jokes={jokes} handleVote={handleVote} />
    </main>
  );
}

export default JokePage;
