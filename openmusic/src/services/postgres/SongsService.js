const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class SongsService {
	constructor() {
		this._pool = new Pool();
	}

	async addSong({
		title, year, performer, genre, duration, albumId,
	}) {
		const id = `song-${nanoid(16)}`;
		const createdAt = new Date().toISOString();
		const query = {
			text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id',
			values: [id, title, year, genre, performer, duration, albumId, createdAt],
		};
		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new InvariantError('Catatan gagal ditambahkan');
		}
		return result.rows[0].id;
	}

	async getSongs(title = '', performer = '') {
		const query = {
			text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
			values: [`%${title}%`, `%${performer}%`],
		};
		const { rows } = await this._pool.query(query);
		return rows;
	}

	async getSongById(id) {
		const query = {
			text: 'SELECT * FROM songs WHERE id = $1',
			values: [id],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new NotFoundError('Catatan tidak ditemukan');
		}
		return result.rows.map(mapDBToModel)[0];
	}

	async getSongsByAlbumId(albumId) {
		const query = {
			text: 'SELECT id, title, performer FROM songs WHERE albumid = $1',
			values: [albumId],
		};
		const result = await this._pool.query(query);
		return result.rows.map(mapDBToModel);
	}

	async editSongById(id, {
		title, year, performer, genre, duration, albumId,
	}) {
		const updatedAt = new Date().toISOString();
		const query = {
			text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, albumId = $6, updated_at = $7 WHERE id = $8 RETURNING id',
			values: [title, year, performer, genre, duration, albumId, updatedAt, id],
		};
		const { rowCount } = await this._pool.query(query);
		if (!rowCount) {
			throw new NotFoundError('Gagal memperbarui catatan, Id tidak ditemukan');
		}
	}

	async deleteSongById(id) {
		const query = {
			text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
			values: [id],
		};
		const result = await this._pool.query(query);
		if (!result.rows.length) {
			throw new NotFoundError('Gagal menghapus catatan, Id tidak ditemukan');
		}
	}
}
module.exports = SongsService;
