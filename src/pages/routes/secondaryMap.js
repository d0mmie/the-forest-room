import _ from 'lodash'
import { Card, Switch, List } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import qr from 'qrcode'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import connect from '../../store/action'
import PlotTreeDialog from '../../components/plotTreeDialog'
import TreeModel from '../../components/treeModel'

class SecondaryMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trees: [],
      url: '',
      qrcode: '',
      treeGroupDataSource: {}
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
    if (nextProps.store.maps.loading === false && nextProps.store.tree.loading === false) { // เช็คว่าโหลดเสร็จหรือยัง
      const { primary, secondary } = nextProps.match.params // รับ parameter จาก url 2 ค่าคือ primary และ secondary ประมาณนี้ /map/4/11 คือ primary = 4 และ secondary = 11
      const _allTree = Object.keys(nextProps.store.tree.location).map((key) => ({ ...nextProps.store.tree.location[key], id: key })) // นำจุดที่พลอทต้นไม้ทั้งหมดใส่ id ลงไปใน object เช่น {tree:"-L1rHwzEgOZ-ggf_Mxf7"} เป็น {id:"-L5OQtQRriZXwBLHlrRu", tree="-L1rHwzEgOZ-ggf_Mxf7"}
      const allTree = _.filter(_allTree, { primary, secondary }) // กรองข้อมูลจุด เอาเฉพาะที่อยู่หน้านี้เท้านั้น
      const treeGroup = _.groupBy(allTree, 'tree') // จัดกลุ่มโดยชนิดของต้นไม้
      const treeGroupDataSource = Object.keys(treeGroup).map((key) => { return { ...nextProps.store.tree.data[key], amount: treeGroup[key].length, id: key } }) // นำกลุ่มต้นไม้ที่จัดมาใส่ค่า จำนวน และ id
      const url = await firebase.storage().ref(nextProps.store.maps.data[nextProps.match.params.primary][nextProps.match.params.secondary][nextProps.store.maps.mock ? 'imgPathMock' : 'imgPath']).getDownloadURL() // นำ url มาโดยใช้ path อ้างอิง
      this.setState({url, trees: allTree, treeGroupDataSource}) // เซ็ทค่า url ของแมพ, ต้นไม่ที่กรองมาแล้วทั้งหมด, ต้นไม่ที่จัดกลุ่มและนับจำนวนแล้ว ไว้เรียกใช้
    }
  }

  plotting (e) { // พลอทจุด
    if (this.props.store.user.data.isAdmin) { // เช็คว่าเป็น admin หรือเปล่า
      this.props.openPlotDialog({
        x: e.pageX - e.currentTarget.x,
        y: e.pageY - e.currentTarget.y
      })
    }
  }

  render () {
    const { store } = this.props
    const { url, trees } = this.state
    if (store.maps.loading || store.tree.loading) { // เช็คว่า loading หรือเปล่า
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
            {
              store.user.data.isAdmin && // เช็คว่าเป็น admin หรือเปล่า
              <p>Mock&nbsp;
                <Switch defaultChecked={store.maps.mock} onChange={this.props.setMock} />
              </p>
            }      
            <p><b>QRCODE</b>(เพื่อเข้าสู่หน้านี้)</p>
            <p><img src={this.state.qrcode} alt='' /></p>
            <p>ชนิดของต้นไม้ในพิ้นที่</p>
            <List
              itemLayout='horizontal'
              dataSource={this.state.treeGroupDataSource}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={`/tree/${item.id}`} >{item.name}</Link>}
                    description={`จำนวน ${item.amount} ต้น`}
                  />
                </List.Item>
              )}
            />
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
