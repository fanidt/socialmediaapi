const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');




const UsersSchema = new Schema (

    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
          },
          thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
          ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
        },
        { 
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
)

UsersSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const Users = model('Users', UsersSchema);

module.exports = Users;