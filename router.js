//initialize express router
let router = require('express').Router();
//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import User Controller
var userController = require('./controller/userController');
// user routes
router.route('/user', )
    .get(userController.index)
    .post(userController.add);
router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
router.route('/user/mail/:user_email')
    .get(userController.view);
router.route('/user/like')
    .post(userController.addLike)
    .delete(userController.removeLike);

module.exports = router;
