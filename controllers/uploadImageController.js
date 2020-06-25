const path = require('path');

module.exports = (req, res) => {
    if(req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;
    const directory = path.join(__dirname, '../client/public/images/', file.name);

    file.mv(directory, error => {
        if(error) {
            console.error(error);
            return res.status(500).send(error);
        }

        const filePath = path.join('../../public/images', file.name);
        console.log(filePath);
        res.json({fileName: file.name, filePath: filePath});
    });
}