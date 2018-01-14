import _ from 'lodash'
import { Icon } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import qr from 'qrcode'
import React, { Component } from 'react'

import PlotTreeDialog from '../../components/plotTreeDialog'
import TreeModel from '../../components/treeModel'

export default class secondaryMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trees: [],
      loading: true,
      map: {},
      url: '',
      posX: '',
      posY: '',
      DialogOpen: false,
      imgX: 0,
      imgY: 0,
      qrcode: '',
      isAdmin: false
    }
    this.plotting = this.plotting.bind(this)
  }

  componentWillMount () {
    console.log(this.props)
    const { primary, secondary } = this.props.match.params
    firebase.database().ref(`/map/${primary}/${secondary}`).on('value', async (snap) => {
      if (snap.val()) {
        const url = await firebase.storage().ref(snap.val().imgPath).getDownloadURL()
        this.setState({url, loading: false})
      }
    })
    firebase.database().ref('/tree/location').on('value', (snap) => {
      const _allTree = Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], id: key }))
      const allTree = _.filter(_allTree, { primary, secondary })
      this.setState({trees: allTree})
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`/users/${user.uid}`).on('value', (snap) => {
          if (snap.val()) {
            this.setState({isAdmin: snap.val().isAdmin})
          }
        })
      } else {
        this.setState({isAdmin: false})
      }
    })
    qr.toDataURL(`https://theforestroom.xyz${this.props.match.url}`).then((url) => {
      this.setState({qrcode: url})
    })
  }

  plotting (e) {
    if (this.state.isAdmin) {
      this.setState({posX: e.pageX - e.currentTarget.x, posY: e.pageY - e.currentTarget.y, DialogOpen: true})
    }
  }

  render () {
    const { loading, url, DialogOpen, posX, posY, trees, imgX, imgY } = this.state
    const { primary, secondary } = this.props.match.params
    if (loading) {
      return <div><Icon type='loading' /> กำลังโหลด...</div>
    }
    return (
      <div >
        <div style={{display: 'flex', flexDirection: 'row'}} >
          <div>
            <img src={url} alt='' width={700} onClick={this.plotting} />
          </div>
          <div style={{ paddingLeft: 10, paddingRight: 10 }} >
            <p>แผนที่ระดับกลางที่ : {primary}</p>
            <p>แผนที่เล็กที่ : {secondary}</p>
            <p><img src={this.state.qrcode} alt='' /></p>
          </div>
        </div>
        {
          trees.map((data) => <TreeModel history={this.props.history} x={imgX} y={imgY} {...data} key={data.id} />)
        }
        <PlotTreeDialog
          primary={primary}
          posX={posX} posY={posY}
          secondary={secondary}
          visible={DialogOpen}
          closeDialog={() => this.setState({ DialogOpen: false })}
        />
      </div>
    )
  }
}

secondaryMap.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}
