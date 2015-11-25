Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },
  
  // Add total counter
  totalDonation: function() {
    $('span.total-counter').text('');
    var collection = 0;
    var posts = Posts.find().fetch();

    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].Donations; 
    };

    setTimeout(function() {

      $('.total-counter').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: collection
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now));
          }
      });

  });

    }, 1);

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


