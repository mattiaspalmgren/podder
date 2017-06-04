import React, { Component } from 'react';
import classNames from 'classnames';

class Podcast extends Component {
  constructor (props) {
    super(props);
    this.toggleHoverState = this.toggleHoverState.bind(this);
    this.state = {
      hover: false
    }
  }

  toggleHoverState(e) {
    const type = e.type;
    const hover = type === 'mouseenter' ? true : false 
    this.setState({hover: hover })
  }

  render () {
    const { podcast } = this.props;
    
    const hoverClasses = classNames(
      'podcast__overlay', {
      'podcast__overlay--show': this.state.hover 
    });

    return (
      <div 
        className="col col-3" key={podcast._id}>
        <div 
          className='podcast grid grid-center grid-middle'
          onMouseEnter={this.toggleHoverState}
          onMouseLeave={this.toggleHoverState}>
          <img src={podcast.artworkUrl} />
          <div className={hoverClasses}>
          </div>
        </div>
        <h4>{podcast.artistName}</h4>
      </div>
    )
  };
};

export default Podcast;