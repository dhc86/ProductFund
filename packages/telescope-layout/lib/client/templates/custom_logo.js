Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },
  
  // Add total counter
  totalDonation: function() {
    var collection = 0;
    var posts = Posts.find().fetch();
    for (i = 0; i < posts.length; i++) { 
      // debugger;
      collection += posts[i].Donations; 
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

//Henry's version, and is moved as a callback function to the custom_post_vote.js.
//Once the a new donation goes through, the counter updates.

  $('.total-counter').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now));

          }
      });
  });
  
});

