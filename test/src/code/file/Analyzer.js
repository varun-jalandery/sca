const expect = require('chai').expect;
const FileAnalyzer = require('src/code/file/Analyzer');
const FileReader = require('src/code/file/Reader');

let fileAnalyzer = null;

describe('src/code/file/Analyzer', () => {
    before(async () => {
        const fileReader = new FileReader();
        const lines = await fileReader.getLines(
            'test/fixtures/CodeFile.sample'
        );
        fileAnalyzer = new FileAnalyzer(lines);
    });

    it('isModuleImportedInFile() should return true if module is imported', () => {
        expect(
            fileAnalyzer.isModuleImportedInFile('promotionManager')
        ).to.equal(true, 'promotionManager is imported, should return true');

        expect(fileAnalyzer.isModuleImportedInFile('bobManager')).to.equal(
            true,
            'bobManager is imported, should return true'
        );

        expect(fileAnalyzer.isModuleImportedInFile('aliceManager')).to.equal(
            true,
            'aliceManager is imported, should return true'
        );

        expect(
            fileAnalyzer.isModuleImportedInFile('promotionManager')
        ).to.equal(true, 'promotionManager is imported, should return true');

        expect(
            fileAnalyzer.isModuleImportedInFile('doesnNotExistManager')
        ).to.equal(
            false,
            'doesnNotExistManager is not imported, should return false'
        );
    });

    it('getModuleUsages() should return array of module usages', () => {
        expect(fileAnalyzer.getModuleUsages('barManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['barManager.getBarMethod', 'barManager.getSomeOtherBarMethod'],
                'barManager is calling methods getBarMethod(), getSomeOtherBarMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('fooManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['fooManager.getFooMethod', 'fooManager.getSomeOtherFooMethod'],
                'fooManager is calling methods getFooMethod(), getSomeOtherFooMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('fooBazManager')).to.be.an('array');


        expect(fileAnalyzer.getModuleUsages('AliceManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['AliceManager.getAliceMethod', 'AliceManager.getSomeOtherAliceMethod'],
                'AliceManager is calling methods getAliceMethod(), getSomeOtherAliceMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('bobManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['bobManager.getBobMethod', 'bobManager.getSomeOtherBobMethod'],
                'bobManager is calling methods getBobMethod(), getSomeOtherBobMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('promotionManger'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['promotionManger.getPromotions', 'promotionManger.addPromotions'],
                'promotionManager is calling methods getPromotions(), addPromotions()'
            );
    });
});
