import { combineReducers } from 'redux'
import Common from '../redux/common/common'
import Customizer from './Customizer/reducer'
import Auth from './Auth/Reducer'

const reducers = combineReducers({
    Common,
    Customizer,
    Auth
});

export default reducers;