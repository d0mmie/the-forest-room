const initialState = {
  data: {},
  isLogin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOGIN': {
      return {...state, data: action.user, isLogin: true}
    }
    case '@@LOGOUT': {
      return {...state, data: {}, isLogin: false}
    }
    default: {
      return state
    }
  }
}
