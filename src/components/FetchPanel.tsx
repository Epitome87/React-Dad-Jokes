import React from 'react';
import './FetchPanel.css';

// Defines the shape of the props the JokeList expects
interface FetchPanelProps {
  onFetch: () => void;
}

const FetchPanel: React.FC<FetchPanelProps> = (props) => {
  return (
    <div className='FetchPanel'>
      <h1 className='FetchPanel__title'>
        <span>Dad</span> Jokes
      </h1>
      <img
        src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
        alt='Crying with laughter Emoji'
      />
      <button className='FetchPanel__btn-more' onClick={props.onFetch}>
        Fetch Jokes
      </button>
    </div>
  );
};

export default FetchPanel;
