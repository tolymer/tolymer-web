const users = require("./users");
const userToken = require("./userToken");
const currentUser = require("./currentUser");
const currentUserGroups = require("./currentUserGroups");
const groups = require("./groups");
const groupsMembers = require("./groupsMembers");
const groupsEvents = require("./groupsEvents");
const groupsStats = require("./groupsStats");
const events = require("./events");
const eventsMembers = require("./eventsMembers");
const eventsGames = require("./eventsGames");

module.exports = {
  users,
  userToken,
  currentUser,
  currentUserGroups,
  groups,
  groupsMembers,
  groupsEvents,
  groupsStats,
  events,
  eventsMembers,
  eventsGames
};
