const arraysEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length)
		return false;
	for (var i = arr1.length; i--;) {
		if (arr2.indexOf(arr1[i]) === -1)
			return false;
	}

	return true;
}

const bulkAddOrUpdate = async (data) => {
	let endpoint = false
	let headerKeys = Object.keys(data[0].data)
	let groupCheck = ['id', 'group_name']
	let peopleCheck = ['id', 'first_name', 'group_name', 'last_name', 'email_address', 'status']

	if (arraysEqual(groupCheck,headerKeys)) endpoint = 'groups'
	if (arraysEqual(peopleCheck, headerKeys)) endpoint = 'people'

	if (!endpoint){
		return new Error('Incorrect Headers! Check file. \n People CSV: id, first_name, last_name, email_address, status, group_name \n Group CSV: id, group_name')
	}

	let response = []

	for await (let row of data) {
		let data = Object.fromEntries(headerKeys.map(key => [key,row.data[key]]))

		let idLookup = await fetch(`http://localhost:8000/api/${endpoint}/${row.data['id']}`)

		if (idLookup.ok) {
			let updateCall = await fetch(`http://localhost:8000/api/${endpoint}/${row.data['id']}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(res => res.json()).catch(err => false)

			if(updateCall) response.push(updateCall)
		} else {
			let postCall = await fetch(`http://localhost:8000/api/${endpoint}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(res => res.json()).catch(err => false)

			if(postCall) response.push(postCall)
		}
	}

	return response
}

module.exports = { bulkAddOrUpdate }