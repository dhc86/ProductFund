if (Meteor.isClient) {
  Template.post_content.helpers({
    counter_thingy: function() {
      var post = this;
      return post.upvotes;
    }
  });
}