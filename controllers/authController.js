module.exports = (req, res) => {
    if(req.session.userId) {
        res.json({loggedIn: true});
    }
    else {
        res.json({loggedIn: false});
    }
}