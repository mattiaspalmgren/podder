import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Svg from './Svg';

const MAX_LENGTH_DESCRIPTION = 150;

class Episode extends Component {
  constructor(props) {
    super(props);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.state = {
      loaded: false,
      expanded: false,
    };
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  renderDescription() {
    const { episode } = this.props;

    const orginalDescription = episode['itunes:summary'][0];
    const truncatedDescription = `${orginalDescription.slice(0, (MAX_LENGTH_DESCRIPTION - 3))}...`;
    const needsExpansion = orginalDescription.length > MAX_LENGTH_DESCRIPTION;
    const type = this.state.expanded ? 'less' : 'expand';
    return (
      <div>
        { (needsExpansion && !this.state.expanded) ?
          truncatedDescription :
          orginalDescription
        }
        { needsExpansion &&
          <span className="episode__description-icon" onClick={this.toggleExpand}>
            <Svg color={'grey'} type={type} />
          </span>
        }
      </div>
    );
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

    const imageUrl = episode['itunes:image'] ?
      episode['itunes:image'][0].$.href :
      'http://static.libsyn.com/p/assets/4/5/2/2/45229106b173434f/p3-man-up-hour.jpg';

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
            src={imageUrl}
            onLoad={() => this.setState({ loaded: true })}
          />
        </div>
        <div className="episode__description">
          { this.renderDescription() }
        </div>
      </div>);
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default Episode;
