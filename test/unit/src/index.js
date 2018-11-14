
const plugin = require('../../../src/index.js');
const { expect } = require('chai');

describe(__filename, () => {
    const pluginManager = {};
    const repoPath = 'test/assets/repo';
    
    it('should find a pattern in a file', (done) => {
        const options = { 
            files: [
                {
                    path: 'file.txt',
                    pattern: "check\ me!"
                }
            ]
        };

        plugin(pluginManager, repoPath).run((message, isValid, level) => {
            if (isValid) {
                done()
            } else {
                done(`${options.files[0].pattern} not found!`);
            }
        }, 0, options)
    })  

    it('should find a string in a file', (done) => {
        const options = { 
            files: [
                {
                    path: 'file.txt',
                    string: "check me!"
                }
            ]
        };

        plugin(pluginManager, repoPath).run((message, isValid) => {
            if (isValid) {
                done()
            } else {
                done(`${options.files[0].string} not found!`);
            }
        }, 0, options)
    
    })
    
    it('callback function should contain a level', (done) => {
        const options = { 
            files: [
                {
                    path: 'file.txt',
                    pattern: "check\ me!"
                }
            ]
        };

        const expectedLevelinMessage = 55

        plugin(pluginManager, repoPath).run((message, isValid, level) => {
            expect(level).equals(expectedLevelinMessage)
            done()
        }, expectedLevelinMessage, options)
    })
})