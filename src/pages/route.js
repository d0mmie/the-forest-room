import Tree from './routes/tree'
import BigMap from './routes/bigMap'
import PrimaryMap from './routes/primaryMap'
import SecondaryMap from './routes/secondaryMap'
import Search from './routes/search'
import Login from './routes/login'

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