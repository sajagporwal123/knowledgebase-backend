const EMAIL = "EMAIL";
const SOCIAL_MEDIA = "SOCIAL_MEDIA";

const accountConstant = {
  signTypeName: {
    EMAIL,
    SOCIAL_MEDIA,
  },
  signUpType: [EMAIL, SOCIAL_MEDIA],
  defaultSignUpType: EMAIL,
};

const categoryConstant = {
  statusConstant: ["ACTIVE", "INACTIVE"],
  defaultStatus: "ACTIVE",
};

module.exports = {
  accountConstant,
  categoryConstant,
};
