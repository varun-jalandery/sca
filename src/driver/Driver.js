const fs = require('fs');
const Scan = require('src/code/directory/Scan');
const FileReader = require('src/code/file/Reader');
const FileAnalyzer = require('src/code/file/Analyzer');
const LineAnalyzer = require('src/code/line/Analyzer');

class Driver {
	async drive(modules = [], scanDir = null) {
		if (!modules.length) {
			modules = this.getModulesToCheck();
		}

		if (!scanDir) {
			scanDir = this.getScanDir();
		}
		const codeScanner = new Scan(scanDir);
		await codeScanner.scan();
		const files = codeScanner.getFiles();
		const fileReader = new FileReader();
		let fileAnalyzer = new FileAnalyzer();

		for (let i = 0; i < files.length; i++) {
			const lines = await fileReader.getLines(files[i]);
			fileAnalyzer = new FileAnalyzer(lines);
			modules.forEach(el => {
				const uses = fileAnalyzer.getModuleUsages(el);
				if (uses.length) {
					console.log('\n', files[i]);
					console.log('\t' + uses.join('\n\t'));
				}
			});
		}
	}

	getModulesToCheck() {
		if (!process.env.MODULES) {
			throw new Error('please define MODULES in .env');
		}
		const modules = process.env.MODULES;
		return modules.split(',');
	}

	getScanDir() {
		if (!process.env.SCAN_DIR) {
			throw new Error('please define SCAN_DIR in .env');
		}
		if (!fs.existsSync(process.env.SCAN_DIR)) {
			throw new Error(`${process.env.SCAN_DIR} is not accessible`);
		}
		return process.env.SCAN_DIR;
	}
}

module.exports = Driver;
