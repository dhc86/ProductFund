if (Meteor.isClient) {
Meteor.subscribe("Posts")
Template.submitProductForm.events({ 'submit #submitPostForm': function(e) {
  //question about why it does not run...
// Template.submitForm.events({ 'submit form': function(e) {
    e.preventDefault();

var post = {
donations: 0,
title: $(e.target).find('[name=title]').val(),
url: $(e.target).find('[name=url]').val(), 
body: $(e.target).find('[name=body]').val(),
stripe_id: $(e.target).find('[name=stripe_id]').val()
};
Meteor.call("postSubmit", post);
//post._id = Posts.insert(post);
    //Router.go('/', post);
  }
});

if (Meteor.isServer) {
Meteor.publish("Posts");
}

}

Meteor.methods({
   postSubmit: function(post){
    debugger;
    Posts.insert(post);
   }
 });