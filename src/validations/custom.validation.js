const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    )
  ) {
    return helpers.message(
      'Password must contain at least one letter, one number and a special character'
    );
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  if (!/^(\+\d{1,3})?\d{10}$/.test(value)) {
    return helpers.message('Invalid Phone Number Format');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  phoneNumber,
};
