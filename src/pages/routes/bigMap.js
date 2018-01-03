import _ from 'lodash'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'

import ImageMapper from '../../libs/ImageMapper'

export default class BigMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mapUrl: '',
      map: {},
      link: [],
      loading: true
    }
    this.MapNivigate = this.MapNivigate.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('/map/mainMap').on('value', async (snap) => {
      if (snap.val()) {
        const url = await firebase.storage().ref(snap.val().imgPath).getDownloadURL()
        this.setState({
          mapUrl: url,
          map: snap.val().map,
          link: _.values(snap.val().link),
          loading: false
        })
      }
    })
  }

  getPosition (event) {
    console.log(
      event.pageX - event.currentTarget.x,
      event.pageY - event.currentTarget.y
    )
  }

  MapNivigate (event, index) {
    this.props.history.push(this.state.link[index].path)
  }

  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}} >
        {this.state.loading ? null : <ImageMapper onImageClick={this.getPosition} onClick={this.MapNivigate} src={this.state.mapUrl} map={this.state.map} width={704} />}
      </div>
    )
  }
}

BigMap.propTypes = {
  history: PropTypes.object.isRequired
}
