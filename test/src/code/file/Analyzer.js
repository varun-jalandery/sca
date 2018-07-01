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

    it('getImportedName() should return correct module names', () => {
        expect(fileAnalyzer.getImportedName('promotionsManager')).to.be.an(
            'promotionsManger',
            'promotionsManager is imported as promotionManger'
        );

        expect(fileAnalyzer.getImportedName('barManager')).to.be.an(
            'barManager',
            'barManager is imported as barManager'
        );

        expect(fileAnalyzer.getImportedName('aliceManager')).to.be.an(
            'AliceManager',
            'aliceManager is imported as AliceManager'
        );

        expect(fileAnalyzer.getImportedName('fooBazManager')).to.be.an(
            'fooBazManager',
            'fooBazManager is imported as fooBazManager'
        );
    });

    it('isModuleImportedInFile() should return true if module is imported', () => {
        expect(
            fileAnalyzer.isModuleImportedInFile('promotionsManager')
        ).to.equal(true, 'promotionsManager is imported, should return true');

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
            true,
            'doesnNotExistManager is not imported, should return false'
        );
    });

    it('getModuleUsages() should return array of module usages', () => {
        expect(fileAnalyzer.getModuleUsages('barManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['getBarMethod', 'getSomeOtherBarMethod'],
                'barManager is calling methods getBarMethod(), getSomeOtherBarMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('fooManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['getFooMethod', 'getSomeOtherFooMethod'],
                'fooManager is calling methods getFooMethod(), getSomeOtherFooMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('fooBazManager')).to.be.empty(
            'fooBazManager is not being used'
        );

        expect(fileAnalyzer.getModuleUsages('aliceManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['getAliceMethod', 'getSomeOtherAliceMethod'],
                'aliceManager is calling methods getAliceMethod(), getSomeOtherAliceMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('bobManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['getBobMethod', 'getSomeOtherBobMethod'],
                'bobManager is calling methods getBobMethod(), getSomeOtherBobMethod()'
            );

        expect(fileAnalyzer.getModuleUsages('promotionManager'))
            .to.be.an('array', 'should be array of usages')
            .to.include.members(
                ['getPromotions', 'addPromotions'],
                'promotionManager is calling methods getPromotions(), addPromotions()'
            );
    });
});
