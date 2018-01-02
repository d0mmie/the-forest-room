import Tree from './routes/tree'
import BigMap from './routes/bigMap'

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
    }
]