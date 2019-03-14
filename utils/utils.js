const reverse = function (chunk) {
    return chunk.toString().split("").reverse().join("");
};

const toUpperCase = function (chunk) {
    return chunk.toString().toUpperCase();
};

const replace = function (chunk, pattern, text) {
    return chunk.toString().replace(pattern, text);
};

module.exports = {
    reverse: reverse,
    toUpperCase: toUpperCase,
    replace: replace
};