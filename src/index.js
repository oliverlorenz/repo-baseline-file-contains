const Promise = require('bluebird');
const fs = require('fs');
const path = require('path')
const packageJson = require('../package.json')

module.exports = function(pluginManager, repoPath, config) {
    function run(callback, level, options) {
        if (!options) {
            return Promise.reject(new Error('options have to be defined!'));
        }
        let isCheckFullyValid = true;
        options.files.forEach(fileToCheck => {
            const fullFilePath = path.join(
                repoPath,
                fileToCheck.path
            );

            const fileContent = fs.readFileSync(fullFilePath).toString();

            if (fileToCheck.pattern) {
                const regex = new RegExp(fileToCheck.pattern, 'gm');
                callback(`"${fileToCheck.path}" includes "${fileToCheck.pattern}"`, regex.test(fileContent))
            } else if (fileToCheck.string) {
                callback(`"${fileToCheck.path}" includes "${fileToCheck.string}"`, fileContent.indexOf(fileToCheck.string) !== -1)
            }
        });
        return Promise.resolve();
    }

    return { run }
}