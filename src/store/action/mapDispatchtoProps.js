import firebase from 'firebase'

export default (dispatch) => {
  return {
    triggerAuth: (user) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref(`/users/${user.uid}`).on('value', (snap) => {
            if (snap.val()) {
              dispatch({
                type: '@@LOGIN',
                user: {...user.toJSON(), ...snap.val()}
              })
            }
          })
        } else {
          dispatch({
            type: '@@LOGOUT'
          })
        }
      })
    },
    logout: () => {
      firebase.auth().signOut().then(() => {
        dispatch({
          type: '@@LOGOUT'
        })
      })
    },
    loadTree: () => {
      firebase.database().ref('/tree').on('value', (snap) => {
        if (snap.val()) {
          // console.log(Object.keys(snap.val()).map((key) => ({...snap.val()[key], key})))
          dispatch({
            type: '@@LOAD_TREE',
            tree: snap.val().data,
            location: snap.val().location
          })
        }
      })
    },
    loadMap: () => {
      firebase.database().ref('/map').on('value', (snap) => {
        if (snap.val()) {
          dispatch({
            type: '@@LOAD_MAP',
            payload: snap.val()
          })
        }
      })
    },
    openPlotDialog: ({x, y}) => {
      dispatch({
        type: '@@OPEN_PLOT_TREE',
        x,
        y
      })
    },
    closePlotDialog: () => {
      dispatch({
        type: '@@CLOSE_PLOT_TREE'
      })
    },
    setCurrentRoute: ({primary, secondary} = {primary: '', secondary: ''}) => {
      dispatch({
        type: '@@SET_CURRENT_ROUTE',
        primary,
        secondary
      })
    },
    setMock: (status) => {
      dispatch({
        type: '@@SET_MOCK',
        payload: status
      })
    }
  }
}
