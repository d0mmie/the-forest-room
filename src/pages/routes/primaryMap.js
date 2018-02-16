import { Icon, Card } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'

import connect from '../../store/action'
import ImageMapper from 'react-image-mapper'

class PrimaryMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mapUrl: ''
    }
    this.MapNivigate = this.MapNivigate.bind(this)
  }

  componentWillMount () {
    this.props.loadMap() // โหลดข้อมูลแผนที่
    this.props.setCurrentRoute({primary: this.props.match.params.mapId}) // เซ็ทค่า พารามิเตอร์ ของ primary
  }

  async componentWillReceiveProps (nextProps) { // รับค่า รูปของแผนที่
    if (nextProps.store.maps.loading === false) { // ถ้าแมพโหลดเสร็จแล้ว
      const url = await firebase.storage().ref(nextProps.store.maps.data[nextProps.match.params.mapId].imgPath).getDownloadURL() // รับ url ของแมพจาก path
      this.setState({ // นำ url ที่ได้เก็บไว้เรียกใช้
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
    this.props.history.push(this.props.store.maps.data[this.props.match.params.mapId].link[index].path) // เปลี่ยนหน้า
  }

  render () {
    const { store, match } = this.props
    if (store.maps.loading) { // ถ้าหน้ากำลังโหลด ให้ใช้ component loading
      return <div><Icon type='loading' /> กำลังโหลด...</div>
    }
    return (
      <Card title={`แผนที่บริเวณที่ ${store.maps.current.primary}`} style={{margin: 10}} bodyStyle={{display: 'flex', justifyContent: 'center'}} >
        <ImageMapper
          fillColor='rgba(68, 245, 188, 0.3)'
          onImageClick={this.getPosition}
          onClick={this.MapNivigate}
          src={this.state.mapUrl}
          map={store.maps.data[match.params.mapId]['map']}
          width={704}
        />
      </Card>
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
