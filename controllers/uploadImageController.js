const path = require('path');

module.exports = (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}./client/public/images/${file.name}`, error => {
        if(error) {
            console.error(error);
            return res.status(500).send(error);
        }

        res.json({fileName: file.name, filePath: '/images/${file.name}'});
    });
}