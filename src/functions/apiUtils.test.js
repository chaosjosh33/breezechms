import { bulkAddOrUpdate } from './apiUtils'

let data

describe('BulkAddOrUpdate', () => {

	test('Update People Unit Test', async (done) => {
		data = [{
			data: {
				email_address: "alex@breezechms.com",
				first_name: "Alex",
				group_name: "Staff",
				id: "1",
				last_name: "Ortiz-Rosado",
				status: "active",
			}
		}]
		const mockSuccessResponse = { "data": { "id": 1, "first_name": "Alex", "last_name": "Ortiz-Rosado", "email_address": "alex@breezechms.com", "status": "active", "created_at": "2020-07-29T10:27:22.000000Z", "updated_at": "2020-07-29T10:27:22.000000Z", "group_id": 2 } };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual([mockSuccessResponse]);
		done();
	});
	
	test('Update Group Unit Test', async (done) => {
		data = [{
			data: {
				group_name: "Volunteers",
				id: '2'
			}
		}]
		const mockSuccessResponse = { "data": [{ "id": 2, "group_name": "Volunteers", "created_at": "2020-07-29T10:26:47.000000Z", "updated_at": "2020-07-29T10:26:47.000000Z" }] };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual([mockSuccessResponse]);
		done();
	});

	test('Group Missing Headers Unit Test', async (done) => {
		data = [{
			data: {
				group_name: "Volunteers",
			}
		}]
		const mockSuccessResponse = { "data": [{ "id": 2, "group_name": "Volunteers", "created_at": "2020-07-29T10:26:47.000000Z", "updated_at": "2020-07-29T10:26:47.000000Z" }] };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual(new Error(('Incorrect Headers! Check file. \n People CSV: id, first_name, last_name, email_address, status, group_name \n Group CSV: id, group_name')));
		done();
	});

	test('People Missing Headers Unit Test', async (done) => {
		data = [{
			data: {
				email_address: "alex@breezechms.com",
				first_name: "Alex",
				id: "1",
				last_name: "Ortiz-Rosado",
				status: "active",
			}
		}]
		const mockSuccessResponse = { "data": [{ "id": 2, "group_name": "Volunteers", "created_at": "2020-07-29T10:26:47.000000Z", "updated_at": "2020-07-29T10:26:47.000000Z" }] };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual(new Error(('Incorrect Headers! Check file. \n People CSV: id, first_name, last_name, email_address, status, group_name \n Group CSV: id, group_name')));
		done();
	});

	test('People Missing Headers Unit Test', async (done) => {
		data = [{
			data: {
				email_address: "alex@breezechms.com",
				first_name: "Alex",
				id: "1",
				last_name: "Ortiz-Rosado",
				status: "active",
			}
		}]
		const mockSuccessResponse = { "data": [{ "id": 2, "group_name": "Volunteers", "created_at": "2020-07-29T10:26:47.000000Z", "updated_at": "2020-07-29T10:26:47.000000Z" }] };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual(new Error(('Incorrect Headers! Check file. \n People CSV: id, first_name, last_name, email_address, status, group_name \n Group CSV: id, group_name')));
		done();
	});


	test('People blank group name unit test', async (done) => {
		data = [{
			data: {
				email_address: "alex@breezechms.com",
				first_name: "Alex",
				id: "1",
				group_name: "",
				last_name: "Ortiz-Rosado",
				status: "active",
			}
		}]
		const mockSuccessResponse = { "data": { "id": 1, "first_name": "Alex", "last_name": "Ortiz-Rosado", "email_address": "alex@breezechms.com", "status": "active", "created_at": "2020-07-29T10:27:22.000000Z", "updated_at": "2020-07-29T10:27:22.000000Z", "group_id": 1 } };
		const mockJsonPromise = Promise.resolve(mockSuccessResponse);
		const mockFetchPromise = Promise.resolve({
			json: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		expect(await bulkAddOrUpdate(data)).toEqual([mockSuccessResponse]);
		done();
	});
})
