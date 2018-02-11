import mapStatetoProps from './mapStatetoProps'
import mapDispatchtoProps from './mapDispatchtoProps'
import { connect } from 'react-redux'

export default (component) => connect(mapStatetoProps, mapDispatchtoProps)(component)
