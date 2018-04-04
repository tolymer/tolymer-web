const users = require('./users')
const userToken = require('./userToken')
const currentUser = require('./currentUser')
const currentUserGroups = require('./currentUserGroups')
const groups = require('./groups')
const groupsMembers = require('./groupsMembers')
const groupsEvents = require('./groupsEvents')
const events = require('./events')

module.exports = {
  users,
  userToken,
  currentUser,
  currentUserGroups,
  groups,
  groupsMembers,
  groupsEvents,
  events
}
