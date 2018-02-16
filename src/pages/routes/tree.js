import { Link } from 'react-router-dom'
import { Card, Button, List, Icon } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

import connect from '../../store/action'
import CreateTreeDialog from '../../components/createTreeDialog'
import UpdateTreeDialog from '../../components/editTreeDialog'
import DeleteTreeDialog from '../../components/deleteTreeDialog'

const IconText = ({ type, text, action }) => ( // สร้าง component ชื่อ IconText
  <span onClick={action}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

IconText.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

class Tree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allTree: [],
      selectedRowKeys: [],
      createTreeDialog: false,
      editTreeDialog: false,
      selectedKey: ''
    }
  }

  componentWillMount () {
    this.props.loadTree() // โหลดต้นไม้
  }
  componentWillReceiveProps (nextProps) { // เซ็ทค่าต้นไม้
    const tree = Object.keys(nextProps.store.tree.data).map((key) => ({...nextProps.store.tree.data[key], key})) // ทำตัวแปรข้อมูลต้นไม้ให้เป็น array และใส่ id เข้าไปในข้อมูลเช่น {name: "มะม่วง"} เป็น {id:"-L1rHwzEgOZ-ggf_Mxf7", name:"มะม่วง"}
    this.setState({allTree: tree}) // เซ็ทค่าต้นไม้ไว้เรียกใช้
  }

  render () {
    return (
      <Card
        title={<h3 style={{marginBottom: 0}} >ต้นไม้</h3>}
        style={{margin: 10}}
        extra={this.props.store.user.data.isAdmin &&
          <span>
            <Button size='small' style={{margin: 3}} type='primary' onClick={this.props.openCreateTreeDialog} >สร้างต้นไม้</Button>
          </span>
        }
      >
        <div style={{display: 'flex', flexDirection: 'row', margin: 15}} >
          <span style={{flex: 'auto'}} />
        </div>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={this.state.allTree}
          renderItem={item => (
            <List.Item
              key={item.key}
              extra={<img src={item.image} alt={item.name} width={272} />}
              actions={this.props.store.user.data.isAdmin &&
                [
                  <IconText action={() => this.props.openEditTreeDialog(item.key)} type='edit' text='แก้ไข' />,
                  <IconText action={() => this.props.openDeleteTreeDialog(item.key)} type='delete' text='ลบ' />
                ]}
            >
              <List.Item.Meta
                title={<Link to={`/tree/${item.key}`}>{item.name}</Link>}
                description={<i>{item.scienceName}</i>}
              />
              {item.detail}
            </List.Item>
          )}
        />
        <CreateTreeDialog />
        <UpdateTreeDialog />
        <DeleteTreeDialog />
      </Card>
    )
  }
}

Tree.propTypes = {
  loadTree: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  openCreateTreeDialog: PropTypes.func.isRequired,
  openDeleteTreeDialog: PropTypes.func.isRequired,
  openEditTreeDialog: PropTypes.func.isRequired
}

export default connect(Tree)
