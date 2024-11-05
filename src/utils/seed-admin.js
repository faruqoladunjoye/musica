const { userService } = require('../services');

module.exports.seedAdmin = async () => {
  const adminPayload = {
    fullName: 'Faruq Bolaji',
    username: 'admin',
    email: 'oladunjoyefaruq@yahoo.com',
    phoneNumber: '+2348085897793',
    password: 'Available@123??',
    role: 'admin',
    isEmailVerified: true,
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
