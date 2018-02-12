import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'
import { Card } from 'antd'

import connect from '../../store/action'
import ImageMapper from 'react-image-mapper'

class BigMap extends React.Component {
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
    this.props.loadMap()
  }

  async componentWillReceiveProps (nextProps) { // รับค่า url ของรูป
    if (nextProps.store.maps.loading === false) {
      const url = await firebase.storage().ref(nextProps.store.maps.data.mainMap.imgPath).getDownloadURL()
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

  MapNivigate (event, index) { // เปลี่ยนหน้า
    this.props.history.push(this.props.store.maps.data.mainMap.link[index].path)
  }

  render () {
    const { store } = this.props
    return (
      <Card style={{margin: 10}} title='แผนผังบริเวณโรงเรียนกำแพงเพชรพิทยาคม' bodyStyle={{display: 'flex', justifyContent: 'center'}} >
        {
          store.maps.loading === false &&
          <ImageMapper
            fillColor='rgba(68, 245, 188, 0.3)'
            onImageClick={this.getPosition}
            onClick={this.MapNivigate}
            src={this.state.mapUrl}
            map={store.maps.data.mainMap['map']}
            width={704}
          />
        }
      </Card>
    )
  }
}

export default connect(BigMap)

BigMap.propTypes = {
  history: PropTypes.object.isRequired,
  loadMap: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}
