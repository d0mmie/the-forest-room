const initialState = {
  data: {},
  loading: true,
  location: {},
  dialog: {
    create: false,
    delete: false,
    edit: false,
    selected: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case '@@LOAD_TREE': {
      return {...state, data: action.tree, location: action.location, loading: false}
    }
    case '@@OPEN_TREE_DIALOG_CREATE': {
      return {...state, dialog: { create: true, delete: false, edit: false, selected: '' }}
    }
    case '@@OPEN_TREE_DIALOG_EDIT': {
      return {...state, dialog: { create: false, delete: false, edit: true, selected: action.payload }}
    }
    case '@@OPEN_TREE_DIALOG_DELETE': {
      return {...state, dialog: { create: false, delete: true, edit: false, selected: action.payload }}
    }
    case '@@CLOSE_TREE_DIALOG': {
      return {...state, dialog: { create: false, delete: false, edit: false, selected: '' }}
    }
    default: {
      return state
    }
  }
}
