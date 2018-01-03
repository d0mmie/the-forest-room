import React from 'react'
import ImageMapper from '../../libs/ImageMapper'
import firebase from 'firebase'

const MapInfo = [
    {
        path:'/map/4/11'
    }
]

export default class BigMap extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            mapUrl: '',
            map: {},
            loading: true
        }
        this.MapNivigate = this.MapNivigate.bind(this)
    }
    componentWillMount () {
        firebase.database().ref('/map/4').on('value', async (snap) => {
            if(snap.val()){
                console.log(snap.val())
                const url = await firebase.storage().ref(snap.val().imgPath).getDownloadURL()
                this.setState({
                    mapUrl: url,
                    map: snap.val().map,
                    loading: false
                })
            }
        })
    }

    MapNivigate(e,a) {
        // console.log(this.props)
        this.props.history.push(MapInfo[a].path)
        console.log(MapInfo[a])
        console.log(a)
    }

    render () {
        return (
            <div style={{display:'flex', justifyContent:'center'}} >
                {this.state.loading ? null : <ImageMapper onImageClick={(e) => console.log(e.pageX - e.currentTarget.x, e.pageY - e.currentTarget.y)} onClick={this.MapNivigate} src={this.state.mapUrl} map={this.state.map} width={704}  />}
            </div>
        )
    }
}