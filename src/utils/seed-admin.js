const userService = require('./../services/user.service');

module.exports.seedAdmin = async () => {
  const adminPayload = {
    fullName: 'Faruq Bolaji',
    username: 'admin',
    email: 'admin@musica.io',
    phoneNumber: '+2348085897793',
    password: 'Available@123??',
    role: 'admin',
    isEmailVerified: true,
  };

  try {
    let admin = await userService.getUserByEmail(adminPayload.email);
    if (!admin) {
      console.log('Seeding admin user...');
      await userService.createUser(adminPayload);
      console.log('Admin user seeded successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      console.error(
        `Error: A user with username "${adminPayload.username}" already exists.`
      );
    } else {
      console.error('An error occurred while seeding the admin user:', error);
    }
  }
};
