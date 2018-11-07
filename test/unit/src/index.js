
const plugin = require('../../../src/index.js');

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

        plugin(pluginManager, repoPath).run((message, isValid) => {
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
})