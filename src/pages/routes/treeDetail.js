import PropTypes from 'prop-types'
import qr from 'qrcode'
import React from 'react'
import styles from 'styled-components'
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
      qrcode: ''
    }
  }
  componentWillMount () {
    this.props.loadTree()
    qr.toDataURL(`https://theforestroom.xyz${this.props.match.url}`).then((url) => {
      this.setState({qrcode: url})
    })
  }

  render () {
    const { store, match } = this.props
    if (this.props.store.tree.loading) {
      return <div>Loading...</div>
    }
    return (
      <div style={{margin: 20}} >
        <h1>{store.tree.data[match.params.treeId].name}</h1>
        <p>&nbsp;</p>
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
      </div>
    )
  }
}

TreeDetail.propTypes = {
  match: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  loadTree: PropTypes.func.isRequired
}

export default connect(TreeDetail)
