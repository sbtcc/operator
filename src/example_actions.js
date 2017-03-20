import api             from './api';

export const EXAMPLE_LOAD_SUCESS   = "EXAMPLE_LOAD_SUCESS";
export const EXAMPLE_LOAD_FAIL     = "EXAMPLE_LOAD_FAIL";
export const EXAMPLE_POST_SUCESS   = "EXAMPLE_POST_SUCESS";
export const EXAMPLE_POST_FAIL     = "EXAMPLE_POST_FAIL";
export const EXAMPLE_CLEAR_SUCESS  = "EXAMPLE_CLEAR_SUCESS";
export const EXAMPLE_CLEAR_FAIL    = "EXAMPLE_CLEAR_FAIL";

export const polling = (id) => (dispatch, getState) => {
	dispatch( load(id));
	setTimeout(
		function(){dispatch(polling(id))}, 
		500
	);
}

export const load = (id) => (dispatch, getState) => {

	return api.getMessages({id})
	.then(
		data => {
			dispatch({
				type : EXAMPLE_LOAD_SUCESS,
				data : data.data
			})
		}
	).catch(
		error => {
			dispatch({
				type : EXAMPLE_LOAD_FAIL,
				error : error
			})
		}
	);
}


export const send = (data) => (dispatch, getState) => {

	return api.postMessage(data)
	.then(
		data => {
			dispatch({
				type : EXAMPLE_POST_SUCESS,
				data : data.data
			})
		}
	).catch(
		error => {
			dispatch({
				type : EXAMPLE_POST_FAIL,
				error : error
			})
		}
	);
}

export const clear = () => (dispatch, getState) => {

	return api.clearMessages()
	.then(
		data => {
			dispatch({
				type : EXAMPLE_CLEAR_SUCESS,
			})
		}
	).catch(
		error => {
			dispatch({
				type : EXAMPLE_CLEAR_FAIL,
			})
		}
	);
}