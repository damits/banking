var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Account = require('../models/Account');
var Transation = require('../models/Transation');
var auth = require('../middlewares/auth');

var findAccountByIban = function(req, res, next) {
  Account.findOne({iban: req.body.iban}, function(err, account){
    if (err) return res.status(500).json({message: err});
    req.account2 = account;
    next();
  })
}

router.put('/send', auth.verify, findAccountByIban, function(req, res) {
  var transation = new Transation();
  transation.account1 = req.account.iban;
  transation.account2 = req.body.iban;
  transation.amount = req.body.amount;
  transation.save(function(err, transationSaved) {
    if (err) return res.status(500).json({
      message: err
    })
    if (req.account.balance >= req.body.amount) {
      req.account.transations.push(transationSaved);
      req.account2.transations.push(transationSaved);
      req.account2.balance += req.body.amount;
      req.account.balance -= req.body.amount;
    } else {
      return res.status(409).json({
        message: "Not Enough Money"
      })
    }
    req.account.save(function(err, accountSaved) {
      req.account2.save(function(err, accountSaved) {
        if (err) return res.status(500).json({
          message: err
        })
        res.status(201).json(transationSaved);
      })
    })
  })
});

/*router.get('/', auth.verify, function(req, res) {
  User.findById(req.user._id).populate({
    path: 'accounts',
    populate: {
      path: 'admin',
      model: 'User',
      select: 'name surname'
    }
  }).exec(function(err, user) {
    if (err) return res.status(500).json({
      message: err
    })
    res.json(user.accounts);
  })
})*/

module.exports = router;
