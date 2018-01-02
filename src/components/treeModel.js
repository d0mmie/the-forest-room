import React, { Component } from 'react'
import { Popover, Button, message, Icon } from 'antd'
import firebase from 'firebase'

export default class TreeModel extends Component {
    state = {
        open:false,
        treeData:{},
        loading: true
    }
    
    componentWillMount() {
        firebase.database().ref(`/tree/data/${this.props.tree}`)
        .on('value',(snap)=>{
            console.log(snap.val())
            this.setState({treeData: snap.val(), loading: false})
        })
    }

    // confirmDeletion = () => {
    //     firebase.database().ref(`/map/${this.props.primaryMap}/secondaryMap/${this.props.secondaryMap}/coord/${this.props.indentify}/searchKey`).once('value').then((snap)=>{
    //         firebase.database().ref(`/tree/${this.props.coord.type}/location/${snap.val()}`).remove()
    //     })
    //     .then(()=>{
    //         firebase.database().ref(`/map/${this.props.primaryMap}/secondaryMap/${this.props.secondaryMap}/coord/${this.props.indentify}`).remove()
    //     })
    //     .then(()=>message.success('ลบสำเร็จ'))
    //     .catch(()=>message.error('การลบผิดพลาด'))
    //     .then(()=>this.setState({open:false}))
    // }
    
    render() {
        const { loading, treeData } = this.state
        const { posX, posY, x, y } = this.props
        if ( loading ) {
            return <div><Icon type='loading' /> Loading...</div>
        }
        return (
            <Popover
                visible={this.state.open}
                title={treeData.name}
                onVisibleChange={(open)=>this.setState({open})}
                placement="right"
                content={
                    <div style={{width:300,maxHeight:500,overflow:'auto',padding:3,margin:0}} >
                        <p><img alt="" width="100%" src={treeData.image} /></p><br />
                        <p><b>ชื่อวิทยาศาสตร์</b> : <i>{treeData.scienceName}</i></p><br />
                        <p><b>ลักษณะ</b> : {treeData.detail}</p><br />
                        <p><b>ประวัติ</b> : {treeData.history}</p><br />
                        <p><b>สรรพคุณ</b> : {treeData.property}</p><br />
                        <p><Button type="danger" >ลบ</Button></p>
                    </div>
            }
            >
                <div style={{position: 'absolute', left: posX , top: posY, padding:4, backgroundColor: treeData.legendColor, cursor:'pointer'}}></div>
            </Popover>
        )
    }
}
