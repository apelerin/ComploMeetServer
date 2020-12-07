/**
 * @apiDefine BodyGetUserBy
 *
 * @apiSuccess {String} _id                 Id of the user
 * @apiSuccess {String} description         Bio in user profile
 * @apiSuccess {String} username            Username of the user
 * @apiSuccess {String} firstname           Firstname of the user
 * @apiSuccess {String} lastname            Lastname of the user
 * @apiSuccess {String} password            Password of the user
 * @apiSuccess {String} email               Email of the user
 * @apiSuccess {String} sexual_orientation  Sexual orientation of the user
 * @apiSuccess {String} gender              Gender of the user
 * @apiSuccess {Date} birthday              Birthday of the user
 * @apiSuccess {Date} created_at            Date at which the account has been created
 * @apiSuccess {Array} users_liked          Collection of users liked by the user
 * @apiSuccess {Array} profile_pictures     Collection of the pictures of the user
 * @apiSuccess {Boolean} isPremium          Boolean whereas the user is premium or not
 *
 * @apiSuccessExample Success-Response:
 *{
 *   "message": "User Details",
 *   "data": {
 *       "description": "Hey! I would love to hear about your BIG theory. ;-)",
 *       "users_liked": [],
 *       "isPremium": false,
 *       "profile_pictures": [],
 *       "_id": "5fc8af21a6661923b8340d9a",
 *       "created_at": "2020-12-03T09:25:53.439Z",
 *       "username": "CAKE",
 *       "firstname": "Anis",
 *       "lastname": "Miami",
 *       "password": "password",
 *       "email": "email@email.com",
 *       "sexual_orientation": "Bisexual",
 *       "gender": "Male",
 *       "__v": 0,
 *       "birthday": "2020-12-03T13:20:47.497Z"
 *    }
 *}
 */

/**
 * @apiDefine userCreateUpdateParams
 *
 * @apiParam {String} username  Username of the user
 * @apiParam {String} firstname Fistname of the user
 * @apiParam {String} lastname  Lastname of the user
 * @apiParam {String} password  Password of the user
 * @apiParam {String} email     Email address of the user
 * @apiParam {String} gender    gender of the user, one of ["Male", "Female", "Other"]
 * @apiParam {String} sexual_orientation    Sexual_orientation of the user, one of ["Straight", "Gay", "Bisexual", "Other"]
 * @apiParam {String} description           Bio of the user profile
 * @apiParam {Array} [users_liked]           List of users liked by the user, default: empty
 * @apiParem {Array} [profile_pictures]      List of pictures belonging to the user, default: empty
 * @apiParam {Boolean} [isPremium]           Whereas the user is premium or not, default: false
 *
 *
 */