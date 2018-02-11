const initialState = {
  data: {},
  isLogin: false,
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOGIN': {
      return {
        ...state,
        data: action.user,
        isLogin: true,
        loading: false
      }
    }
    case '@@LOGOUT': {
      return {
        ...state,
        data: {},
        isLogin: false,
        loading: false
      }
    }
    default: {
      return state
    }
  }
}
