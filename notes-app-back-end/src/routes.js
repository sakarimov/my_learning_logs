const { addNotehandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNotebyIdHandler } = require("./handler");
const routes = [
	{
		method: 'POST',
		path: '/notes',
		handler: addNotehandler,
	},
	{
		method: 'GET',
		path: '/notes',
		handler: getAllNotesHandler,
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: getNoteByIdHandler,
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: editNoteByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deleteNotebyIdHandler,
	},
];

module.exports = routes;
