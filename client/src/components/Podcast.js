import React, { Component } from 'react';
import classNames from 'classnames';
import Svg from './Svg';

class Podcast extends Component {
  constructor (props) {
    super(props);
    this.toggleHoverState = this.toggleHoverState.bind(this);
    this.toggleSavedState = this.toggleSavedState.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.state = {
      hover: false,
      saved: false,
      loaded: false
    }
  }

  toggleHoverState(e) {
    const type = e.type;
    const hover = type === 'mouseenter' ? true : false 
    this.setState({hover: hover })
  }

  toggleSavedState() {
    this.setState({saved: !this.state.saved })
  }

  renderIcon() {
    if (this.state.saved) {
      return <Svg color={'red'} type={'cross'}/>
    } else {
      return <Svg color={'green'} type={'checkmark'}/>
    }
  }

  render () {
    const { podcast } = this.props;
    
    const hoverClasses = classNames(
      'podcast__overlay', {
      'podcast__overlay--show': this.state.hover 
    });

    const spinnerClasses = classNames(
      'spinner', {
      'spinner--loaded': this.state.loaded 
    });

    const podcastImageClasses = classNames(
      'podcast__image', {
      'podcast__image--loaded': this.state.loaded 
    });
    
    return (
      <div 
        className="col col-3" key={podcast.collectionId}>
        <div 
          className='podcast grid grid-center grid-middle'
          onMouseEnter={this.toggleHoverState}
          onMouseLeave={this.toggleHoverState}>
          <i className={spinnerClasses}></i>
          <img className={podcastImageClasses} src={podcast.artworkUrl600} onLoad={() => this.setState({loaded:true})}/>
          <div className={hoverClasses} onClick={this.toggleSavedState}>
            { 
              this.renderIcon() 
            }
          </div>
        </div>
        <h4>{podcast.artistName}</h4>
      </div>
    )
  };
};

export default Podcast;