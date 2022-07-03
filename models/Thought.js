const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

ReactionSchema = new Schema({
  reationId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reationBody: {
    type: String,
    required: true,
    //280 character max
  },
  username: {
    type: String,
      required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
},
{
    toJSON: {
        getters: true
      },
      id: false
}
);


const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    //Must be between 1 and 280 characters
  },
  createdAt: {
    type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reaction: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
}
);



//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });
  


const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);


module.exports = { Thought, Reaction };