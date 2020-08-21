const schemaCategory = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      description: "Category Name",
      type: ["string"],
    },
  },
  required: ["name"],
};

module.exports = {
  schemaCategory,
};
