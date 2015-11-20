Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },

  totalDonation: function() {
    var collection = 0;
    var posts = Posts.find().fetch();
    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].upvotes;
    };
    return collection;
  }
});

Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
});

