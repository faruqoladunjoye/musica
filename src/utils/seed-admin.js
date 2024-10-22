const { db } = require('../models');
const { userService } = require('../services');

module.exports.seedAdmin = async () => {
  const adminPayload = {
    fullName: 'TM30 Global',
    email: 'info@tm30.net',
    username: 'admin',
    address: '29A Berkeley Street, Lagos Island, Lagos State',
    password: 'Available@123??',
    accountStatus: 'active',
    isEmailVerified: true,
    role: 'admin',
    phoneNumber: '+2347033809318',
  };
  let admin = await userService.getUserByEmail(adminPayload.email);
  console.log(admin);
  if (!admin) {
    console.log(
      'i got here-----------------------------------------------------------------------------------------------------------------------'
    );
    await userService.createUser(adminPayload);
  }
};
