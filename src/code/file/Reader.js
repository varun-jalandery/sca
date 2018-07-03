const fs = require('fs');
const util = require('util');

class Reader {
	async getFileContents(filePath) {
		return util.promisify(fs.readFile)(filePath, 'utf8');
	}

	async getLines(filePath) {
		const contents = await this.getFileContents(filePath);
		return contents.split('\n');
	}
}

module.exports = Reader;
