//pour exporter notre module dans la base de donnée 

module.exports = {
    stripTags: function(input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    }
}