require('dotenv').config();

const Driver = require('src/driver/Driver');

class Main {
	static async execute() {
		try {
			const driver = new Driver();
			driver.drive(Main.getModuleNames());
		} catch (ex) {
			process.stderr.write(ex);
		}
	}

	static getModuleNames() {
		let moduleNames = [];
		if (process.argv.length > 2) {
			moduleNames = [process.argv[2]];
		}
		return moduleNames;
	}
}

Main.execute();
