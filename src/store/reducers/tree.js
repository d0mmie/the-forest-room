const initialState = {
  data: {},
  loading: true,
  location: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOAD_TREE': {
      return {...state, data: action.tree, location: action.location, loading: false}
    }
    default: {
      return state
    }
  }
}
