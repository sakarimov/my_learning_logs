class AlbumsHandler {
	constructor(service, validator, songService) {
		this._service = service;
		this._validator = validator;
		this._songService = songService;
	}

	async postAlbumHandler(request, h) {
		this._validator.validateAlbumPayload(request.payload);
		const albumId = await this._service.addAlbum(request.payload);
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil ditambahkan',
			data: {
				albumId,
			},
		});
		response.code(201);
		return response;
	}

	async getAlbumByIdHandler(request) {
		const { id } = request.params;
		const album = await this._service.getAlbumById(id);
		album.songs = await this._songService.getSongsByAlbumId(id);
		return {
			status: 'success',
			data: {
				album,
			},
		};
	}

	async putAlbumByIdHandler(request) {
		this._validator.validateAlbumPayload(request.payload);
		const { id } = request.params;
		await this._service.editAlbumById(id, request.payload);
		return {
			status: 'success',
			message: 'Catatan berhasil diperbarui',
		};
	}

	async deleteAlbumByIdHandler(request) {
		const { id } = request.params;
		await this._service.deleteAlbumById(id);
		return {
			status: 'success',
			message: 'Catatan berhasil dihapus',
		};
	}
}

module.exports = AlbumsHandler;
