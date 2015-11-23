Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },
  
  // Add total counter
  totalDonation: function() {
    var collection = 0;
    var posts = Posts.find().fetch();
    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].Donations;
    };
    return collection;

  }
  // counter: function() {

    // debugger;
    // $('.count')
});




Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
  $('.total-counter').each(function () {
      $(this).prop('Counter',0).animate({
          // debugger
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

