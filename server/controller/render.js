
exports.get = (req, res) => {
    res.sendfile(__dirname+'/index.html');
}