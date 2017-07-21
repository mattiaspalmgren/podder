import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import Svg from './Svg';

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false 
    }
  }
  render() {
    const { podcast, saved, onClick } = this.props;

    const spinnerClasses = classNames(
      'spinner', {
      'spinner--loaded': this.state.loaded 
    });

    const podcastClasses = classNames(
      'podcast grid grid-center grid-middle', {
      'podcast--saved': saved
    })
    
    const podcastImageClasses = classNames(
      'podcast__image', {
      'podcast__image--loaded': this.state.loaded
    });
    
    return (
    <div className="col col-3" key={podcast.collectionId} onClick={onClick}>
      <div className={podcastClasses}>
        <i className={spinnerClasses}></i>
        <img className={podcastImageClasses} src={podcast.artworkUrl600} onLoad={() => this.setState({loaded:true})}/>
      </div>
      <h4>{podcast.artistName}</h4>
    </div>)
  }
}

Podcast.propTypes = {
  onClick: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired
}

export default Podcast;
