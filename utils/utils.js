const reverse = function (chunk) {
    return chunk.toString().split("").reverse().join("");
};

const toUpperCase = function (chunk) {
    return chunk.toString().toUpperCase();
};

const replace = function (chunk, pattern, text) {
    return chunk.toString().replace(pattern, text);
};

const updateDate = function (next, entity) {
    entity.lastModifiedDate = new Date();
    next();
};

module.exports = {
    reverse: reverse,
    toUpperCase: toUpperCase,
    replace: replace,
    updateDate: updateDate
};