const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
  } = require('../../controllers/user-controller');

router
    .route('/users')
    .get(getAllUser)
    .post(createUser);

    router
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    router
    .route('/users/:id/friends/:id')
    .post()
    .delete();


module.exports = router;