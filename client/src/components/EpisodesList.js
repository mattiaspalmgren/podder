import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Episode from './Episode';
import Svg from './Svg';

const EXPAND_MORE_AMOUNT = 5;

class EpisodesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: EXPAND_MORE_AMOUNT,
    };
    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    const { episodes } = this.props;

    let expandAmount = EXPAND_MORE_AMOUNT;
    if (this.state.amount + expandAmount > episodes.length) {
      expandAmount = episodes.length - this.state.amount;
    }

    this.setState({ amount: this.state.amount + expandAmount });
  }

  render() {
    const { episodes, metaPodcasts, isFetching } = this.props;
    const getKey = episode => (episode.link ? episode.link[0] : episode.description);
    const getAltImg = episode =>
      metaPodcasts.find(mp => mp.collectionId === episode.collectionId).artworkUrl600;
    const getAltAuthor = episode =>
      metaPodcasts.find(mp => mp.collectionId === episode.collectionId).collectionName;
    const currentEpisodes = episodes.slice(0, this.state.amount);

    return (
      <div className="grid episode-list">
        {
          currentEpisodes.map(episode => (
            <Episode
              key={getKey(episode)}
              episode={episode}
              altMeta={{
                artworkUrl600: getAltImg(episode),
                collectionName: getAltAuthor(episode),
              }}
            />
          ))
        }
        { !isFetching && !(episodes.length === this.state.amount) &&
          <div onClick={this.showMore}>
            <Svg color={'grey'} type={'expand'} size={'large'} />
          </div>
        }
      </div>
    );
  }
}

EpisodesList.propTypes = {
  episodes: PropTypes.array.isRequired,
  metaPodcasts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default EpisodesList;
