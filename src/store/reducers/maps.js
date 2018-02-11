const initialState = {
  data: {},
  loading: true,
  dialog: {
    plot: false,
    posX: 0,
    posY: 0
  },
  current: {
    primary: '',
    secondary: ''
  },
  mock: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOAD_MAP': {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }
    case '@@OPEN_PLOT_TREE': {
      return {
        ...state,
        dialog: {
          plot: true,
          posX: action.x,
          posY: action.y
        }
      }
    }
    case '@@CLOSE_PLOT_TREE': {
      return {
        ...state,
        dialog: {
          plot: false,
          posX: 0,
          posY: 0
        }
      }
    }
    case '@@SET_CURRENT_ROUTE': {
      return {
        ...state,
        current: {
          primary: action.primary,
          secondary: action.secondary
        }}
    }
    case '@@SET_MOCK': {
      return {
        ...state,
        mock: action.payload
      }
    }
    default: {
      return state
    }
  }
}
