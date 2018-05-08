const authGoogle = require('./authGoogle');
const authGoogleCallback = require('./authGoogleCallback');
const currentUser = require('./currentUser');
const currentUserGroups = require('./currentUserGroups');
const events = require('./events');
const eventsGames = require('./eventsGames');
const eventsMembers = require('./eventsMembers');
const groups = require('./groups');
const groupsEvents = require('./groupsEvents');
const groupsMembers = require('./groupsMembers');
const groupsStats = require('./groupsStats');
const users = require('./users');

module.exports = {
  authGoogle,
  authGoogleCallback,
  currentUser,
  currentUserGroups,
  events,
  eventsGames,
  eventsMembers,
  groups,
  groupsEvents,
  groupsMembers,
  groupsStats,
  users
};
