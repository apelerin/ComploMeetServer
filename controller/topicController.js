Topic = require('../model/topicModel');

/**
 * @api {get} /topic Request all topic information
 * @apiName GetTopic
 * @apiGroup Topic
 *
 * @apiSuccess {array} data Collection of users
 *
 * @apiSuccessExample Success-Response:
 * "status": "200",
 * "data": [
 * {
 *      "_id": "5fc67059f617932098dfd57b",
 *      "title": "topic",
 *      "description": "blablabla",
 *      "messages":"['hello','hello']"
 * }
 * ]
 */
exports.index = function (req, res) {
    Topic.find(function (err, topics) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            status: "200",
            data: topics
        });
    });
};


/**
 * @api {post} /topic Create a topic
 * @apiName PostTopic
 * @apiGroup Topic
 *
 * @apiUse topicCreate
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 */
exports.add = function (req, res) {
    var topic = new Topic();
    // Mandatory
    topic.title = req.body.title;
    topic.description = req.body.description;
    topic.messages = req.body.messages;
//Save and check error
    topic.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            message: "New Topic Added!",
            data: topic
        });
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
exports.view = function (req, res) {
    const queryParam =  {title:req.params.topic_name};
    Topic.find(queryParam, function (err, topic) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            message: 'User Details',
            data: topic
        });
    });
};

// Update User
// exports.update = function (req, res) {
//     const entries = Object.keys(req.body);
//     const updates = {};
//
//     for (let i = 0; i< entries.length; i++) {
//         updates[entries[i]] = Object.values(req.body)[i]
//     }
//
//     Topic.findByIdAndUpdate(req.params.user_id, updates, function (err, result) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// };

// Delete User
exports.delete = function (req, res) {
    Topic.deleteOne({
        _id: req.params.topic_id
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