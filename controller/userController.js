const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
 * "users": [
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
    const params = { _id: { $ne: req.body._id } }
    User.find(params, function (err, users) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            status: "200",
            users: users
        });
    }).select("-password");
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
exports.register = function (req, res) {
    var user = new User();
    // Mandatory
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = bcrypt.hashSync(req.body.password, 8); //todo ENCRYPT

    // user.birthday = req.body.birthday; //todo check format

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
        let token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {expiresIn: 3600 // expires in 1 hours
        });
        res.status(200).send({ auth: true, token: token, user: user});
    });
};

/**
 * @api {get} /user/mail/{mail} Request user information by mail
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} mail User's unique mail.
 *
 * @apiUse BodyGetUserBy
 */
exports.login = async function (req, res) {
    const queryParam = {"email": req.body.email};
    const user = await User.findOne(queryParam).exec();
    if (!user) {
        res.status(404).send("Unknown user, mail or id does not match.");
        res.end();
        return;
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send("Incorrect password");
            res.end();
            return;
    }
    let token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {expiresIn: 3600 // expires in 1 hours
    });
    res.status(200).send({ auth: true, token: token, user: user});
};


// Update User
exports.update = function (req, res) {
    const entries = Object.keys(req.body);
    const updates = {};

    for (let i = 0; i< entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
    }

    updateUser(updates, req, res)
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

exports.addLike = function (req, res) {
    const likedUserData = {'user_id': req.body.liked_user_id}
    const update = {$push: {users_liked: likedUserData}}
    updateUser(update, req, res)
}

exports.removeLike = function (req, res) {
    const likedUserData = {'user_id': req.body.liked_user_id}
    const update = {$pull: {users_liked: likedUserData}}
    updateUser(update, req, res)
}

// Update a user given an update param
function updateUser(update, req, res) {
    User.findByIdAndUpdate(req.body.user_id, update, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
}

exports.addUsersConversation = async function (usersIds, conversationId) {
    await User.updateMany({_id : {$in : usersIds}}, {conversationInvolvedIn: {$push : conversationId}}).exec()
}

exports.getUserConversationsId = async function (userId) {
    return new Promise(((resolve, reject) => {
        User.findOne({_id: userId}).select('conversationInvolvedIn -_id').exec()
            .then((convoList) => {
                resolve(convoList.conversationInvolvedIn)
            })
    }))
}

exports.getUserNameById = async function (userId) {
    return new Promise(((resolve, reject) => {
        User.findOne({_id: userId}).select('username _id').exec()
            .then((user) => {
                resolve(user)
            })
    }))
}