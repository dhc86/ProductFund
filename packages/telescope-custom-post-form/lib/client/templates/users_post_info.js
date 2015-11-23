if (Meteor.isClient) {
  Template.post_submit.events({
    'submit form': function(e) {
      e.preventDefault();
      
      console.log('e', e, 't', t);

      // Users.update(current_user._id,{$set: {Post_name: stripe_user_id }});

 
    }
  })
  // ;
  // Meteor.methods({
    



  // });
}