Posts.addField([
  {
    fieldName: 'stripe_key',
    fieldSchema: {
      type: String,
      optional: false,
      editableBy: ["member","admin"]
    }
  },
 {
  fieldName: 'Donations',
  fieldSchema: {
    type: Number,
    defaultValue: 0,
    editableBy: ["member", "admin"]
  }
}
//  {
//   fieldName: 'payment_charge_id',
//   fieldSchema: {
//     type: String,
//     optional: false
//   }
// }
]);