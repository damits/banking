var Account = require('../models/Account');
var jwt = require('jwt-simple');
var secret = 'xxx';


var verify = function(req, res, next) {
    if (req.query.token === undefined) return res.status(401).json({message:'Unauthorized'})
    var id = jwt.decode(req.query.token, secret);
    Account.findById(id, function(err, account) {
        if (err) return res.status(500).json({message: err});
        req.account = account;
        next();
    })
}
module.exports.verify = verify;
module.exports.secret = secret;
