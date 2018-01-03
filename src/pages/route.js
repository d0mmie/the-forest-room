import BigMap from './routes/bigMap'
import Login from './routes/login'
import PrimaryMap from './routes/primaryMap'
import Search from './routes/search'
import SecondaryMap from './routes/secondaryMap'
import Tree from './routes/tree'

export const Routes = [
  {
    path: '/tree',
    component: Tree,
    exact: true
  },
  {
    path: '/',
    component: BigMap,
    exact: true
  },
  {
    path: '/map/:mapId',
    component: PrimaryMap,
    exact: true
  },
  {
    path: '/map/:primary/:secondary',
    component: SecondaryMap,
    exact: true
  },
  {
    path: '/search',
    component: Search,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  }
]
