User = require('../model/userModel');

/**
 * @api {get} /user Request all users information
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {array} data Collection of users
 *
 * @apiSuccessExample Success-Response:
 * "status": "200",
 * "data": [
 * {
 *      "_id": "5fc67059f617932098dfd57b",
 *      "created_at": "2020-12-01T16:33:29.823Z",
 *      "name": "Name",
 *      "email": "email@email.com",
 *      "description": "Description",
 *      "__v": 0
 * }
 * ]
 */
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            status: "200",
            data: user
        });
    });
};


/**
 * @api {post} /user Request all users information
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {array} data Collection of users
 *
 * @apiSuccessExample Success-Response:
 * "status": "200",
 * "data": [
 * {
 *      "_id": "5fc67059f617932098dfd57b",
 *      "created_at": "2020-12-01T16:33:29.823Z",
 *      "name": "Name",
 *      "email": "email@email.com",
 *      "description": "Description",
 *      "__v": 0
 * }
 * ]
 */
//For creating new user
exports.add = function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = req.body.password; //todo ENCRYPT
    user.birthday = req.body.birthday;
    user.email = req.body.email;
    user.sexual_orientation = req.body.sexual_orientation;
    user.gender = req.body.gender;
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
    const entries = Object.keys(req.body);
    const updates = {};

    for (let i = 0; i< entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
    }

    User.findByIdAndUpdate(req.params.user_id, updates, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
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