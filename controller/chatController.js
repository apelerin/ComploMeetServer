Conversation = require('../model/conversationModel');
ChatMessage = require('../model/chatMessageModel');
var userController = require('../controller/userController');

/**
 * @api {post} /user/conversations Get
 * @apiName GetConversation
 * @apiGroup Conversation
 *
 * @apiParam {String} _id  Id of the requested conversation
 *
 * @apiSuccess {object} object conversation
 *
 * @apiSuccessExample Success-Response:
 * "status": "200",
 * "data":
 * {
 *      "_id": "5fc67059f617932098dfd57b",
 *      "participants": ["5fc67059f617932098dfd57b", "5fc67059f617932098dfd57b"],
 * }
 */
exports.conversationsOfUser = async function (req, res) {
    const idConversations = await userController.getUserConversationsId(req.body._id);
    let conversations = await Conversation.find({_id: {$in: idConversations}}).exec()
    let conversationObjectArray = []
    var i = 0;
    for (const convers of conversations) {
        let oppositeId = getOppositeId(convers.participants, req.body._id);
        let oppositeUser = await userController.getUserNameById(oppositeId)
        conversationObjectArray.push({
            '_id': convers._id,
            'participants': convers.participants,
            'oppositeUser': oppositeUser
        })
        i++;
    }
    res.status(200).send({listConversation: conversationObjectArray})
};

function getOppositeId(participants, baseId) {
    if (participants[0] === baseId) {
        return participants[1]
    }
    return participants[0]
}

/**
 * @api {post} /conversation Create a conversation
 * @apiName PostConversation
 * @apiGroup Conversation
 *
 * @apiParam {Array} participants Array inside which the id of the two participants is
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 */
exports.addConversation = function (req, res) {
    var conversation = new Conversation();
    conversation.participants = [req.body.user1, req.body.user2];
    conversation.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        userController.addUsersConversation([req.body.user1, req.body.user2], conversation._id)
        res.json({
            message: "New conversation Added!",
            data: conversation
        });
    });
};



// Messages

/**
 * @api {get} /conversation/:conversation_id/messages Request all messages from one conversation
 * @apiName GetMessage
 * @apiGroup Message
 *
 * @apiParam {String} _id Id of the conversation
 *
 * @apiSuccess {array} data Collection of messages
 *
 * @apiSuccessExample Success-Response:
 * "status": "200",
 * "data": [
 * {
 *      "_id": "5fc67059f617932098dfd57b",
 *      "created_at": "2020-12-01T16:33:29.823Z",
 *      "userFromId": "Name",
 *      "content": "Hi! My name is Johny",
 * }
 * ]
 */
exports.getMessagesOfConversation = function (req, res) {
    const queryParam = {"conversationId": req.params.conversation_id}
    ChatMessage.find(queryParam, function (err, messages) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json({
                message: 'Messages corresponding to conversation',
                messages: messages
            });
        }
    );
}

/**
 * @api {post} /conversation Create a message
 * @apiName PostConversation
 * @apiGroup Conversation
 *
 * @apiParam {String} userIdFrom Id of the user from which is coming the message
 * @apiParam {String} conversationId Id of conversation in which the message is sent
 * @apiParam {String} content Text content of the message
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *
 */
exports.addMessage = async function (req, res) {
    var message = new ChatMessage();
    message.conversationId = req.params.conversation_id;
    message.userFromId = req.body.userFromId;
    message.content = req.body.content;
    message.userFromUsername = await userController.getUserNameById(message.userFromId)
    message.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({
            message: "New message Added!",
            data: message
        });
    });
};
