const router = require('express').Router();

const {
    getallusers,
    getusersbyid,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/Users-controller');


// /api/users
router
    .route('/')
    .get(getallusers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getusersbyid)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;