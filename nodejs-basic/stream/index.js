const fs = require('fs');

const readable = fs.createReadStream('input.txt', {highWaterMark: 15});

const writeable = fs.createWriteStream('output.txt');

readable.on('readable', () => {
	try {
		writeable.write(`[${readable.read()}]`);
	} catch(error) {
		console.log('cannot be read');
		console.log(error.message);
	}
});

readable.on('end', () => {
	console.log('Done');
});
