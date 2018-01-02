import React from 'react'
import { Input, Table } from 'antd'
import firebase from 'firebase'
import _ from 'lodash'

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
                dataIndex: 'tree',
                render: (text) => <img src={async() => { return await firebase.storage().ref(this.state.treeData[text].image).getDownloadURL() }} alt="" height={100} />
        
            },
            {
                title: 'ชื่อ',
                dataIndex: 'tree',
                render:(text) => <span>{this.state.treeData[text].name}</span>
        
            },
            {
                title: "แผนที่ระดับกลาง",
                dataIndex: 'primary',

            },
            {
                title: "แผนที่ระดับเล็ก",
                dataIndex: 'secondary'
            }
        ]
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}} >
                <Search
                    placeholder="ค้นหาต้นไม้"
                    onSearch={this.search}
                    style={{ width: 500 }}
                    />
            <Table columns={TableColumn} dataSource={this.state.searched} />
            </div>
        )
    }
}