Template.logo.helpers({
  logoUrl: function(){
    return Settings.get("logoUrl");
  },
  
  // Add total counter
  totalDonation: function() {
    var initial = $('span.total-counter').text();
    if (!initial) initial = 0;
    console.log(initial);
    //$('span.total-counter').text('');
    var collection = 0;
    var posts = Posts.find().fetch();

    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].Donations; 
    }

    // Animate the counter incrementaly
    setTimeout(function() {
      $('.total-counter').each(function () {
        $(this).prop('Counter',initial).animate({
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
    setTimeout(function() {
       return collection;
    }, 1);
  }
});

Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
}); 