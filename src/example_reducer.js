import _ from 'lodash';
import { 
	EXAMPLE_LOAD_SUCESS,
	EXAMPLE_LOAD_FAIL,
	EXAMPLE_POST_SUCESS,
	EXAMPLE_POST_FAIL,
	EXAMPLE_CLEAR_SUCESS,
	EXAMPLE_CLEAR_FAIL,
} from './example_actions';

export const DEFAULT_STATE = {
}

export default (state = DEFAULT_STATE, action) => {
	const new_state = Object.assign({}, state);
	
	switch (action.type) {
		case EXAMPLE_LOAD_SUCESS:
		case EXAMPLE_POST_SUCESS:
			new_state.data  = _.get(action, "data.messages");
			new_state.error = false;
			return new_state;

		case EXAMPLE_LOAD_FAIL:
			new_state.error = action.error;
			return state;
			
		case EXAMPLE_CLEAR_SUCESS:
			new_state.data  = [];
			new_state.error = false;
			
		default:
			return state;

	}
}