const reverse = function (chunk) {
    return chunk.toString().split("").reverse().join("");
};

const toUpperCase = function (chunk) {
    return chunk.toString().toUpperCase();
};

module.exports = {
    reverse: reverse,
    toUpperCase: toUpperCase
};