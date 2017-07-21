import { connect } from 'react-redux';
import { togglePod } from '../actions';
import PodcastList from '../components/PodcastList';

const getVisiblePodcasts = (podcasts, filter) => {
  switch (filter) {
    case 'SHOW_SAVED':
      return podcasts.filter(p => p.saved);
    default:
    case 'SHOW_ALL':
      return podcasts;
  }
};

const mapStateToProps = (state, ownProps) => (
  {
    podcasts: getVisiblePodcasts(state.podcasts, ownProps.filter),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onPodcastClick: id => dispatch(togglePod(id)),
  }
);

const VisiblePodcastList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PodcastList);

export default VisiblePodcastList;
