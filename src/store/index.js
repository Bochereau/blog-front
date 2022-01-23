import { 
    createStore, 
    applyMiddleware, 
    compose 
} from 'redux';

import ajaxPost from '../middleware/ajaxPost';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(
        ajaxPost,
    )
);

const store = createStore(reducer, enhancers);

export default store;