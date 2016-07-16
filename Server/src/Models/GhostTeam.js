import User from './User.js';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GhostTeamModel = new Schema({
  users: [{
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    role: String
  }],
  confirmed: Number,
  manager: [Schema.Types.Mixed],
  frontend: [Schema.Types.Mixed],
  backend: [Schema.Types.Mixed]
});

GhostTeamModel.virtual('members').get(function () {
  return this.manager.concat(this.frontend.concat(this.backend));
});

GhostTeamModel.virtual('score').get(function () {
  let score = [];
  this.members.forEach((user, index, array) => {
    score.push(user.skill_level);
  });
  return score;
});

GhostTeamModel.methods = {
  populateUsers(callback) {
    this.manager.forEach((user, index, array) => {
      this.users.push({id: user.userId, role: 'manager'});
    });
    this.frontend.forEach((user, index, array) => {
      this.users.push({id: user.userId, role: 'frontend'});
    });
    this.backend.forEach((user, index, array) => {
      this.users.push({id: user.userId, role: 'backend'});
    });
    callback();
  }
};

GhostTeamModel
  .pre('save', function (next) {
    this.populateUsers(() => {
      this.users.forEach((user, index, array) => {
        User.findByIdAndUpdate(user.id, {$push: {ghostTeams: this.id}}, (err, user) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!user) {
            return next(new Error('User not found!'));
          }
        });
      });
      next();
    });
  });

GhostTeamModel
  .pre('remove', function (next) {
    this.users.forEach((user, index, array) => {
      User.findByIdAndUpdate(user.id, {ghostTeams: [] }, (err, user) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!user) {
          return next(new Error('User not found!'));
        }
      });
    });
    next();
  });

export default mongoose.model('ghostTeam', GhostTeamModel, 'ghostTeams');
