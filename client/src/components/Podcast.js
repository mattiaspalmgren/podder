import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Svg from '../components/Svg';

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      hover: false,
    };
    this.renderIcon = this.renderIcon.bind(this);
    this.toggleHoverState = this.toggleHoverState.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isNotLoaded = !this.state.loaded && nextState.loaded;
    const savedToggled = this.props.saved !== nextProps.saved;
    const hoverChanged = this.state.hover !== nextState.hover;
    if (isNotLoaded || savedToggled || hoverChanged) { return true; }
    return false;
  }

  toggleHoverState(e) {
    const type = e.type;
    const isHovering = type === 'mouseenter';
    this.setState({ hover: isHovering });
  }

  renderIcon() {
    let icon;
    const { saved } = this.props;
    if (saved) {
      icon = <Svg color={'orange'} type={'cross'} size={'large'} />;
    } else {
      icon = <Svg color={'orange'} type={'checkmark'} size={'large'} />;
    }
    return icon;
  }

  render() {
    const { podcast, onClick, saved, location } = this.props;

    const spinnerClasses = classNames(
      'spinner', {
        'spinner--loaded': this.state.loaded,
      });

    const podcastClasses = classNames(
      'podcast grid grid-center grid-middle', {
        'podcast--saved': saved && location !== '/mine',
      });

    const podcastImageClasses = classNames(
      'podcast__image', {
        'podcast__image--loaded': this.state.loaded,
      });

    const hoverClasses = classNames(
      'podcast__overlay', {
        'podcast__overlay--show': this.state.hover,
      });

    return (
      <div className="col col-3" key={podcast.collectionId} onClick={onClick}>
        <div
          className={podcastClasses}
          onMouseEnter={this.toggleHoverState}
          onMouseLeave={this.toggleHoverState}
        >
          <i className={spinnerClasses} />
          <img
            className={podcastImageClasses}
            alt={podcast.artistName}
            src={podcast.artworkUrl600}
            onLoad={() => this.setState({ loaded: true })}
          />
          <div className={hoverClasses}>
            {
              this.renderIcon()
            }
          </div>
        </div>
        <h4>{podcast.artistName}</h4>
      </div>);
  }
}

Podcast.propTypes = {
  podcast: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};


export default Podcast;
