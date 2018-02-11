import { Icon } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'

import connect from '../../store/action'
import ImageMapper from '../../libs/ImageMapper'

class PrimaryMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mapUrl: ''
    }
    this.MapNivigate = this.MapNivigate.bind(this)
  }

  componentWillMount () {
    this.props.loadMap()
    this.props.setCurrentRoute({primary: this.props.match.params.mapId})
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.store.maps.loading === false) {
      const url = await firebase.storage().ref(nextProps.store.maps.data[nextProps.match.params.mapId].imgPath).getDownloadURL()
      this.setState({
        mapUrl: url
      })
    }
  }

  getPosition (event) {
    console.log(
      event.pageX - event.currentTarget.x,
      event.pageY - event.currentTarget.y
    )
  }

  MapNivigate (event, index) {
    this.props.history.push(this.props.store.maps.data[this.props.match.params.mapId].link[index].path)
  }

  render () {
    const { store, match } = this.props
    if (store.maps.loading) {
      return <div><Icon type='loading' /> กำลังโหลด...</div>
    }
    return (
      <div style={{display: 'flex', justifyContent: 'center'}} >
        <ImageMapper
          fillColor='rgba(68, 245, 188, 0.3)'
          onImageClick={this.getPosition}
          onClick={this.MapNivigate}
          src={this.state.mapUrl}
          map={store.maps.data[match.params.mapId]['map']}
          width={704}
        />
      </div>
    )
  }
}

PrimaryMap.propTypes = {
  history: PropTypes.object.isRequired,
  loadMap: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setCurrentRoute: PropTypes.func.isRequired
}

export default connect(PrimaryMap)
