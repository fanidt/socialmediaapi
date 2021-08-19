const { Users, Thoughts, } = require('../models');

const Thoughtscontroller = {

    getallthoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'Users',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    getthoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'Users',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    createthoughts({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'No user found with this username!' });
                    return;
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },


    updatethoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }
        )
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    return res.status(404).json({ message: 'There are no thoughts with this id' });
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },

    deletethoughts({ params, body }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    return res.status(404).json({ message: 'There are no thoughts with this id' })
                }
                res.json(dbthoughtData);
            })
            .catch(err => res.json(err));
    },



    addreaction({ params, body }, res) {

        console.log("addreaction")
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'There are no thoughts with this id' });
                    return;
                }
                res.json(dbthoughtData)
            })
            .catch(err => res.json(err));
    },

    //delete Reaction
    removereaction({ params }, res) {
        console.log(params.reactionId)
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbthoughtData => {
                if (!dbthoughtData) {
                    res.status(404).json({ message: 'There are no thoughts with this id' });
                    return;
                }

                res.json(dbthoughtData)

            })
            .catch(err => res.json(err));
    }

}

module.exports = Thoughtscontroller;