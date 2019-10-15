import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import label from './label'
import group from './group'
import user from './user'
import annoTask from './annoTask'
import mia from './mia'
import sia from './sia'
import worker from './worker'
import pipelineRunning from './pipelineRunning'
import pipelineStart from './pipelineStart'
import siareview from './siareview'

const appReducer = combineReducers({
    auth,
    label,
    group,
    user,
    annoTask,
    mia,
    sia,
    worker,
    form: formReducer,
    pipelineRunning,
    pipelineStart,
    siareview
})


const rootReducer = (state, action) => {
    if (action.type === 'logout') {
        state = undefined
    }

    return appReducer(state, action)
}

  export default rootReducer