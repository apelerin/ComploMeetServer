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
 * @api {post} /user Create a user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiUse userCreateUpdateParams
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 */
exports.add = function (req, res) {
    var user = new User();
    // Mandatory
    // user.username = req.body.username;
    // user.firstname = req.body.firstname;
    // user.lastname = req.body.lastname;
    // user.password = req.body.password; //todo ENCRYPT

    // user.birthday = req.body.birthday; //todo check format

    // user.email = req.body.email;
    // user.sexual_orientation = req.body.sexual_orientation;
    // user.gender = req.body.gender;
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

/**
 * @api {get} /user/{id} Request user information by id
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiUse BodyGetUserBy
*/

/**
 * @api {get} /user/mail/{mail} Request user information by mail
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} mail User's unique mail.
 *
 * @apiUse BodyGetUserBy
 */
exports.view = function (req, res) {
    const queryParam = req.params.user_id ? {"_id": req.params.user_id} : {"email": req.params.user_email};
    User.find(queryParam, function (err, user) {
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