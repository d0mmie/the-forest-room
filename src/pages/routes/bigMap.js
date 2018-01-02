import React from 'react'
import ImageMapper from '../../libs/ImageMapper'
import firebase from 'firebase'

const MapInfo = [
    {
        path:'/map/4'
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
        firebase.database().ref('/map/mainMap').on('value', async (snap) => {
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
    }

    render () {
        return (
            <div>
                {this.state.loading ? null : <ImageMapper onClick={this.MapNivigate} src={this.state.mapUrl} map={this.state.map} width={704}  />}
            </div>
        )
    }
}