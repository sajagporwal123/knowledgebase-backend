const schemaContent = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: {
      description: "Content Name",
      type: ["string"],
    },
    categoryId: {
      description: "Category Id",
      type: ["number"],
    },
  },
  required: ["name"],
};

module.exports = {
  schemaContent,
};
