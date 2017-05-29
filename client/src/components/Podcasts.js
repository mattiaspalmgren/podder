import React from 'react';

const Podcasts = (props) => {
  const { podcasts } = props;

  return (
    <div className="grid gallery">
      {
        podcasts.map((podcast) => {
          return (
            <div className="col col-3" key={podcast._id}>
              <div className="podcast__wrapper grid grid-center grid-middle">
                <img src={podcast.artworkUrl} />
              </div>
              <h4>{podcast.artistName}</h4>
            </div>
          )
        })
      }
    </div>
  );
};

export default Podcasts;