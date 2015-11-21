// Posts.schema = new SimpleSchema({
Posts.addField([
 {
  fieldName: 'Donations',
  fieldSchema: {
    type: Number,
    defaultValue: 0,
    editableBy: ["member", "admin"]
  }
},
 {
  fieldName: 'TagLine',
  fieldSchema: {
    type: String,
    optional: true,
    editableBy: ["member", "admin"]
  }
}
]);

// Users.schema = new SimpleSchema --> note some params are added to the Users
// public_key, access_token,stripe_account and Posrt_info(as object).
