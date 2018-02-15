const initialState = {
  data: {},
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOAD_USERS': {
      return {...state, data: action.payload, loading: false}
    }
    case '@@REMOVE_USERS': {
      return {...state, data: {}}
    }
    default: {
      return state
    }
  }
}
