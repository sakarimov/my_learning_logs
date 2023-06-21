const mapDBToModel = ({
	id,
	name,
	title,
	year,
	genre,
	performer,
	duration,
	albumid,
}) => ({
	id,
	name,
	title,
	year,
	genre,
	performer,
	duration,
	albumid,
});

const mapSongToAlbum = ({
	id,
	name,
	year,
}, song) => ({
	id,
	name,
	year,
	songs: song,
});

module.exports = {mapDBToModel, mapSongToAlbum};
