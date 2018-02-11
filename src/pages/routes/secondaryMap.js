import _ from 'lodash'
import { Card, Switch } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import qr from 'qrcode'
import React, { Component } from 'react'

import connect from '../../store/action'
import PlotTreeDialog from '../../components/plotTreeDialog'
import TreeModel from '../../components/treeModel'

class SecondaryMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trees: [],
      url: '',
      qrcode: ''
    }
    this.plotting = this.plotting.bind(this)
  }

  componentWillMount () {
    const { primary, secondary } = this.props.match.params
    this.props.loadMap()
    this.props.loadTree()
    this.props.setCurrentRoute({
      primary,
      secondary
    })
    qr.toDataURL(`https://theforestroom.xyz${this.props.match.url}`).then((url) => {
      this.setState({qrcode: url})
    })
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.store.maps.loading === false && nextProps.store.tree.loading === false) {
      const { primary, secondary } = nextProps.match.params
      const _allTree = Object.keys(nextProps.store.tree.location).map((key) => ({ ...nextProps.store.tree.location[key], id: key }))
      const allTree = _.filter(_allTree, { primary, secondary })
      const url = await firebase.storage().ref(nextProps.store.maps.data[nextProps.match.params.primary][nextProps.match.params.secondary][nextProps.store.maps.mock ? 'imgPathMock' : 'imgPath']).getDownloadURL()
      this.setState({url, trees: allTree})
    }
  }

  plotting (e) {
    if (this.props.store.user.data.isAdmin) {
      this.props.openPlotDialog({
        x: e.pageX - e.currentTarget.x,
        y: e.pageY - e.currentTarget.y
      })
    }
  }

  render () {
    const { store } = this.props
    const { url, trees } = this.state
    if (store.maps.loading || store.tree.loading) {
      return <Card style={{margin: 10}} title='กำลังโหลด...' loading>...</Card>
    }
    return (
      <div >
        <div style={{display: 'flex', flexDirection: 'row'}} >
          <div>
            <img
              src={url}
              alt={url}
              width={700}
              onClick={this.plotting}
            />
          </div>
          <div style={{flex: 'auto'}} />
          <Card title='รายละเอียด' style={{width: '30%', margin: '10px 3% 0 0'}} >
            <p>แผนที่ระดับกลางที่ : {store.maps.current.primary}</p>
            <p>แผนที่เล็กที่ : {store.maps.current.secondary}</p>
            <p>Mock&nbsp;
              <Switch defaultChecked={store.maps.mock} onChange={this.props.setMock} />
            </p>
            <p><b>QRCODE</b>(เพื่อเข้าสู่หน้านี้)</p>
            <p><img src={this.state.qrcode} alt='' /></p>
          </Card>
        </div>
        {
          trees.map((data) => <TreeModel push={this.props.history.push} tree={data.tree} id={data.id} key={data.id} />)
        }
        <PlotTreeDialog />
      </div>
    )
  }
}

SecondaryMap.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object,
  store: PropTypes.object.isRequired,
  loadTree: PropTypes.func.isRequired,
  loadMap: PropTypes.func.isRequired,
  openPlotDialog: PropTypes.func.isRequired,
  setCurrentRoute: PropTypes.func.isRequired,
  setMock: PropTypes.func.isRequired
}

export default connect(SecondaryMap)
