//Import User Model
User = require('../model/userModel');
//For index
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            status: "success",
            message: "Got User Successfully!",
            data: user
        });
    });
};
//For creating new user
exports.add = function (req, res) {
    var user = new User();
    user.name = req.body.name? req.body.name: user.name;
    user.email = req.body.email;
    user.description = req.body.description;
//Save and check error
    user.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            message: "New User Added!",
            data: user
        });
    });
};
// View User
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            message: 'User Details',
            data: user
        });
    });
};
// Update User
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
//save and check errors
        user.save(function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json({
                message: "User Updated Successfully",
                data: user
            });
        });
    });
};
// Delete User
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            status: "success",
            message: 'User Deleted'
        })
    })
}