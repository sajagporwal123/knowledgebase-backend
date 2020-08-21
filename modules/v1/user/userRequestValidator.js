const createOrLoginUserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    password: {
      description: "Password",
      type: ["string"],
    },
    email: {
      description: "Email",
      type: ["string"],
      format: "email",
    },
  },
  required: ["password", "email"],
};

module.exports = {
  createOrLoginUserSchema,
};
