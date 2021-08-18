const { Users } = require('../models');

const Userscontroller = {

    getallusers(req, res) {
        Users.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbusersData => res.json(dbusersData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    getusersbyid(req, res) {
        Users.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbusersData => res.json(dbusersData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    createUser({ body }, res) {
        Users.create(body)
            .then(dbusersData => res.json(dbusersData))
            .catch(err => res.json(err));
    },


    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbusersData => {
                if (!dbusersData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbusersData);
            })
            .catch(err => res.json(err));
    },


    deleteUser({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
            .then(dbusersData => res.json(dbusersData))
            .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbusersData => {
            if (!dbusersData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbusersData);
        })
        .catch(err => res.json(err));
    },

    removeFriend( { params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbusersData => res.json(dbusersData))
        .catch(err => res.json(err));
    }

}

module.exports = Userscontroller;