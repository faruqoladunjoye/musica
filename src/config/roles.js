const allRoles = {
  listener: ['__listener__'],
  artist: ['__artist__'],
  admin: ['__admin__'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
