<<<<<<< HEAD
// Template.total_donation.helpers({
//   totalDonation: function() {
//     var collection = 0;
//     var posts = Posts.find().fetch();
//     for (i = 0; i < posts.length; i++) { 
//       collection += posts[i].upvotes;
//     };
//     return collection;
//   }
// });
=======
Template.total_donation.helpers({
  totalDonation: function() {
    var collection = 0;
    var posts = Posts.find().fetch();
    for (i = 0; i < posts.length; i++) { 
      collection += posts[i].upvotes;
    };
    return collection;
  }
});
>>>>>>> 765084266b60d34d21fa57112b09e4af54a795b5
