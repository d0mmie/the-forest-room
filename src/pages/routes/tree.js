import React from 'react'
import firebase from 'firebase'
import { Table, Button } from 'antd'
import CreateTreeDialog from '../../components/createTreeDialog'
import UpdateTreeDialog from '../../components/editTreeDialog'


export default class Tree extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            allTree: [],
            selectedRowKeys: [],
            createTreeDialog:false,
            editTreeDialog:false,
            selectedKey:''
        }
        this.deleteTree = this.deleteTree.bind(this)
        this.toggleDialog = this.toggleDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }

    componentWillMount () {
        firebase.database().ref('/tree/data').on('value', (snap) => {
            if (snap.val()) {
                const ArrOfData = Object.keys(snap.val()).map((key) => ({...snap.val()[key],key}))
                this.setState({ allTree: ArrOfData })
            }else {
                this.setState({ allTree: [] })
            }
        })
    }

    toggleDialog ({type, key}) {
        if (type === 'CREATE') {
            this.setState({createTreeDialog: !this.state.createTreeDialog})
        } else if (type === 'EDIT') {
            this.setState({editTreeDialog: !this.state.editTreeDialog, selectedKey:key})
        }
    }

    closeDialog () {
        this.setState({createTreeDialog: false, editTreeDialog: false})
    }

    deleteTree () {
        this.state.selectedRowKeys.map((val) => {
            return firebase.database().ref(`/tree/data/${val}`).remove()
        })
    }

    render () {
        const TableColumn = [
            {
                title: 'รูป',
                dataIndex: 'image',
                render: (text, record) => <img src={text} alt={record.name} height={100} />
        
            },
            {
                title: 'ชื่อ',
                dataIndex: 'name'
        
            },
            {
                title: 'ชื่อวิทยาศาสตร์',
                dataIndex: 'scienceName',
                render: (text) => <i>{text}</i>
        
            },
            {
                title:'ลักษณะ',
                dataIndex:'detail',
                render:(text)=>text.substr(0,30)+'..'
            },
            {
                title:'ประวัติ',
                dataIndex:'history',
                render:(text)=>text.substr(0,30)+'..'
            },
            {
                title:'สรรพคุณ',
                dataIndex:'property',
                render:(text)=>text.substr(0,30)+'..'
            },
            {
                title: 'รหัสสี',
                dataIndex: 'legendColor'
            },
            {
                title: 'แก้ไข',
                render: (text,record) => <Button onClick={() => this.toggleDialog({type:'EDIT', key:record.key})} >แก้ไข</Button>
            }
        ]

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRow) => {
                this.setState({ selectedRowKeys })
            }
        }
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}} >
                    <span style={{fontSize: '1.75em'}} >ต้นไม้</span>
                    <span style={{flex: 'auto'}} ></span>
                    <span>
                        <Button type='primary' onClick={() => this.toggleDialog({type: 'CREATE'})} >สร้างต้นไม้</Button>
                        <Button type='danger' onClick={this.deleteTree} >ลบ</Button>
                    </span>
                </div>
                <Table pagination={false} rowSelection={rowSelection} dataSource={this.state.allTree} columns={TableColumn} />
                <CreateTreeDialog visible={this.state.createTreeDialog} closeDialog={this.closeDialog} />
                <UpdateTreeDialog visible={this.state.editTreeDialog} id={this.state.selectedKey} closeDialog={this.closeDialog} />
            </div>
        )
    }
}