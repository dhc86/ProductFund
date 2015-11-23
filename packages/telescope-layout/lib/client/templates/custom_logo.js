Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
<<<<<<< HEAD
  },
  
  // Add total counter
  totalDonation: function() {
    var collection = 0;
    var posts = Posts.find().fetch();
    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].upvotes;
    };
    return collection;

  }
  // counter: function() {

    // debugger;
    // $('.count')
});




=======
  }
  
  // Add total counter
  // totalDonation: function() {
  //   var collection = 0;
  //   var posts = Posts.find().fetch();
  //   for (i = 0; i < posts.length; i++) { 
  //     collection += posts[i].upvotes;
  //   };
  //   return collection;
  // }
});

>>>>>>> 765084266b60d34d21fa57112b09e4af54a795b5
Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
<<<<<<< HEAD
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
=======
>>>>>>> 765084266b60d34d21fa57112b09e4af54a795b5
});

