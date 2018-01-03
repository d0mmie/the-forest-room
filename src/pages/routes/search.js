import React from 'react'
import { Input, Table } from 'antd'
import firebase from 'firebase'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const { Search } = Input

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTree:[],
            searched:[],
            treeData:{}
        }
        this.search =this.search.bind(this)
    }
    componentWillMount () {
        firebase.database().ref('/tree/location').on('value', (snap) => {
            if(snap.val()){
                const allTree = Object.keys(snap.val()).map((key)=> ({ ...snap.val()[key], id: key }))
                this.setState({allTree})
            }else {
                this.setState({allTree:[]})
            }
        })
        firebase.database().ref('/tree/data').on('value',(snap) => {
            if(snap.val()){
                this.setState({treeData: snap.val()})
            }else {
                this.setState({treeData: []})
            }
        })
    }

    search (keyword) {
        const searched = _.filter(this.state.allTree,(o) => {  return _.startsWith(this.state.treeData[o.tree].name,keyword) })
        this.setState({searched})
    }
    render () {
        const TableColumn = [
            {
                title: 'รูป',
                key:'img',
                // dataIndex: '',
                render: (text, record) => <img src={this.state.treeData[record.tree].image} alt="" height={100} />
        
            },
            {
                title: 'ชื่อ',
                key:'name',
                // dataIndex: 'tree',
                render:(text, record) => <span>{this.state.treeData[record.tree].name}</span>
        
            },
            {
                title: "แผนที่ระดับกลาง",
                key:'primary',
                dataIndex: 'primary',

            },
            {
                title: "แผนที่ระดับเล็ก",
                key: 'secondary',
                dataIndex: 'secondary'
            },
            {
                title: 'ไป',
                key:'go',
                // dataIndex: 'tree',
                render:(text,record) => <Link to={`/map/${record.primary}/${record.secondary}`} >ไป</Link>
            }
        ]
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}} >
            <div style={{display: 'flex', justifyContent: 'center'}} >
                <Search
                    placeholder="ค้นหาต้นไม้"
                    onSearch={this.search}
                    style={{ width: 500 }}
                />
            </div>
            <Table pagination={false} columns={TableColumn} dataSource={this.state.searched} />
            </div>
        )
    }
}