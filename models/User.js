const { Schema, model } = require("mongoose");

const UserSchema = newSchema(
  {
    username: {
      type: String,
      required: true, // adding validation/ will require data to exist for that field
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.replies.length + 1, 0); // Here we're using the .reduce() method to tally up the total of every comment with its replies. In its basic form
  });

const User = model("User", UserSchema);

module.exports = User;
