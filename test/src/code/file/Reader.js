const expect = require('chai').expect;
const FileReader = require('src/code/file/Reader');

describe('src/code/file/Reader', () => {
	it('getLines() should return the array of lines', async () => {
		const fileReader = new FileReader();
		const lines = await fileReader.getLines(
			'test/fixtures/CodeFile.sample'
		);
		expect(lines).to.be.an('array');
	});

	it('getLines() should return 27 number of lines', async () => {
		const fileReader = new FileReader();
		const lines = await fileReader.getLines(
			'test/fixtures/CodeFile.sample'
		);
		expect(lines.length).to.be.equal(27);
	});

	it('getFileContents() should return content', async () => {
		const fileReader = new FileReader();
		const fileContent = await fileReader.getFileContents(
			'test/fixtures/TextFile.sample'
		);
		expect(fileContent).to.be.equal('this is text file sample\n');
	});
});
