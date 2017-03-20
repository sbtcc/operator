const mock = {}

const messages = {}

mock.clearMessages = function(data) {
	for (var i in messages) delete messages[i];
	return {
		resultCode : 0
	}
}

mock.getMessages = function(data) {
	if (data.id && !messages[data.id]) {
//		messages[data.id] = [{author:"client", message:"Добрый день. Скажите, пожалуйста, в какое время проводятся платежные поручения?"}];
		messages[data.id] = []
	}
	return {
		resultCode : 0,
		messages   : data.id ? messages[data.id] : []
	}
}

mock.postMessage = function(data) {
	if (data.id) {
		if (!messages[data.id]) {
			messages[data.id] = [];
		}

		messages[data.id].push({author:data.author, message:data.message})

		return {
			resultCode : 0,
			messages   : messages[data.id]
		}
	}
	return {
		resultCode : -1,
		resultDescription : "No id at request",
	}
}

module.exports = mock;