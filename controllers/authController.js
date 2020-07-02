module.exports = (req, res) => {
    if(req.session.userId) {
        console.log("authorized");
        res.json({loggedIn: true});
    }
    else {
        console.log("not authed");
        res.json({loggedIn: false});
    }
}