const router = require('express').Router();

const {
    getallthoughts,
    getthoughtById,
    createthoughts,
    updatethoughts,
    deletethoughts,
    addreaction,
    removereaction
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getallthoughts)
    .post(createthoughts)

router
    .route('/:id')
    .get(getthoughtById)
    .put(updatethoughts)
    .delete(deletethoughts)

router
    .route('/:thoughtId/reactions')
    .post(addreaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removereaction)

module.exports = router;