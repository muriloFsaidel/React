module.exports = function parseStringsAsArray(arrayAsString) {
    // separa as posições por ',' e mapeia cada elemento para eliminar o espaço antes e depois(trim)
    return arrayAsString.split(',').map(tech => tech.trim());
}