import React, { Component } from 'react'
import { Icon } from 'antd'
import TreeModel from '../../components/treeModel'
// import ModalPlotting from './ModalPlotting'
import firebase from 'firebase'
import PlotTreeDialog from '../../components/plotTreeDialog'
import _ from 'lodash'


export default class secondaryMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trees:[],
      loading: true,
      map: {},
      url: '',
      posX: '',
      posY: '',
      DialogOpen: false,
      imgX:0,
      imgY:0
    }
    this.plotting = this.plotting.bind(this)
  }

  componentWillMount () {
    const { primary, secondary } = this.props.match.params
    firebase.database().ref(`/map/${primary}/${secondary}`)
      .on('value', async (snap) => {
          if (snap.val()) {
              const url = await firebase.storage().ref(snap.val().imgPath).getDownloadURL()
              this.setState({url, loading: false})
          }
      })
      firebase.database().ref('/tree/location').on('value', (snap) => {
          const _allTree = _.filter(snap.val(),{ primary, secondary })
          const allTree = Object.keys(_allTree).map((key)=> ({ ..._allTree[key], id: key }))
          this.setState({trees: allTree})
      })
  }

  plotting (e) {
      this.setState({posX:e.pageX - e.currentTarget.x, posY: e.pageY - e.currentTarget.y, DialogOpen: true})
  }

  render () {
      const { loading, url, DialogOpen, posX, posY, trees, imgX, imgY } = this.state
      const { primary, secondary } = this.props.match.params
      if (loading) {
        return(<div><Icon type='loading' /> กำลังโหลด...</div>)
      }
    return (
      <div>
          <img ref='imgX' src={url} alt="" width={700} onClick={this.plotting} />
          {trees.map((data) => <TreeModel x={imgX} y= {imgY} {...data} key={data.id} />)}
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
