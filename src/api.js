import axios from 'axios';

export default {
	clearMessages : (data) => { return post('/srv/clearMessages', data)},
	getMessages   : (data) => { return post('/srv/getMessages', data)},
	postMessage   : (data) => { return post('/srv/postMessage', data)},
}

const post = (url, data) => {
	return axios({
	        method: "POST",
	        url: url,
	        data: data
	}).then(
		result => {
			if (result && result.data && result.data.resultCode == 0) {
				return result;
			} else {
				if (result && result.data && result.data.resultCode == 30) {  //session expired
					store.dispatch({
						type :"LOGOUT",
						error:result.data,
					});
				}
				return new Promise((resolve, reject) => reject(result.data));
			}
		}
	)
}
