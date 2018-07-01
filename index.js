require('dotenv').config();

const RecursiveScan = require('src/RecursiveScan');
const ClassAnalyzer = require('src/ClassAnaylzer');

class Main {
    static async execute() {
        try {
            const files = await new RecursiveScan(
                '/Users/varunjalandery/sites/mycode/liberty-cms/src/promotions/manager'
            ).getFilesList();
            console.log(files);
            const classAnalyzer = new ClassAnalyzer();
            files.forEach(file => {
                classAnalyzer
                    .getFileContents(file)
                    .then(data => console.log(data))
                    .catch(err => console.error(err));
            });
        } catch (ex) {
            console.error(ex);
        }
    }
}

Main.execute();
