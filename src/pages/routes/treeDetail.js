import _ from 'lodash'
import { Card, List } from 'antd'
import PropTypes from 'prop-types'
import qr from 'qrcode'
import React from 'react'
import styles from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '../../store/action'

const TreeImg = styles.img`
  height: 400px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

class TreeDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      qrcode: '',
      appendIn: []
    }
  }
  componentWillMount () {
    this.props.loadTree()
    qr.toDataURL(`https://theforestroom.xyz${this.props.match.url}`).then((url) => {
      this.setState({qrcode: url})
    })
  }

  componentWillReceiveProps (nextProps) {
    const groupedTree = _.filter(nextProps.store.tree.location, (o) => o.tree === nextProps.match.params.treeId)
    const groupedAppend = groupedTree.map((val) => ({primary: val.primary, secondary: val.secondary}))
    const uniqueAppend = _.uniqBy(groupedAppend, JSON.stringify)
    this.setState({appendIn: uniqueAppend})
  }

  render () {
    const { store, match } = this.props
    if (this.props.store.tree.loading) {
      return <Card title='กำลังโหลด...' style={{margin: 10}} loading>...</Card>
    }
    return (
      <Card style={{margin: 10}} title={store.tree.data[match.params.treeId].name} >
        <div style={{display: 'flex', justifyContent: 'center'}} ><TreeImg src={store.tree.data[match.params.treeId].image} alt={store.tree.data[match.params.treeId].name} /></div>
        <p>&nbsp;</p>
        <p><b>{'ชื่อวิทยาศาสตร์:'}</b> <i>{store.tree.data[match.params.treeId].scienceName}</i></p>
        <p><b>{'ลักษณะ:'}</b> {store.tree.data[match.params.treeId].detail}</p>
        <p><b>{'ประวัติ:'}</b> {store.tree.data[match.params.treeId].history}</p>
        <p><b>{'สรรพคุณ:'}</b> {store.tree.data[match.params.treeId].property}</p>
        <p><b>{'QRCODE'}</b> {'(เพื่อเข้าสู่หน้านี้)'}</p>
        <div>
          <img src={this.state.qrcode} alt='QRCODE' />
        </div>
        <p>&nbsp;</p>
        <p><b>พื้นที่ที่มีต้นไม้นี้</b></p>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={this.state.appendIn}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/map/${item.primary}/${item.secondary}`}>{`แผนที่ขนาดกลางที่ ${item.primary}`}</Link>}
                description={`แผนที่ขนาดเล็กที่ ${item.secondary}`}
              />
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

TreeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  loadTree: PropTypes.func.isRequired
}

export default connect(TreeDetail)
