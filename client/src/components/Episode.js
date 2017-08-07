import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  render() {
    const { episode } = this.props;

    const spinnerClasses = classNames(
      'spinner', {
        'spinner--loaded': this.state.loaded,
      });

    const episodeImageClasses = classNames(
        'episode__image', {
          'episode__image--loaded': this.state.loaded,
        });

    return (
      <div className="col col-6">
        <div className="episode__producer">
          {episode['itunes:author']}
        </div>
        <div className="episode ">
          <i className={spinnerClasses} />
          <img
            className={episodeImageClasses}
            alt={episode['itunes:author']}
            src={episode['itunes:image'][0].$.href}
            onLoad={() => this.setState({ loaded: true })}
          />
        </div>
        <div className="episode__description">
          {episode['itunes:summary']}
        </div>
      </div>);
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default Episode;
// grid grid-center grid-middle
