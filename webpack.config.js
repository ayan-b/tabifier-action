module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
    },
    node: {
        fs: 'empty'
    },
    target: 'node'
};
