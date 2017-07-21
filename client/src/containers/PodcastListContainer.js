import { connect } from 'react-redux'
import { togglePod } from '../actions'
import PodcastList from '../components/PodcastList'

const getVisiblePodcasts = (podcasts, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return podcasts
    case 'SHOW_SAVED':
      return podcasts.filter(p => p.saved)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    podcasts: getVisiblePodcasts(state.podcasts, ownProps.filter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPodcastClick: id => {
      dispatch(togglePod(id))
    }
  }
}

const VisiblePodcastList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastList)

export default VisiblePodcastList