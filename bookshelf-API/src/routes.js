const {
	addBookhandler,
	getAllbooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookbyIdHandler,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBookhandler,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllbooksHandler,
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: getBookByIdHandler,
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: editBookByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: deleteBookbyIdHandler,
	},
];

module.exports = routes;
