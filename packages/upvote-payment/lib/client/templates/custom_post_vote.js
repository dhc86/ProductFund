if (Meteor.isClient)
{
  // Template.post_vote.helpers({
  //   enableDownvotes: function () {
  //     return Settings.get("enableDownvotes", false);
  //   },
  //   actionsClass: function () {
  //     var user = Meteor.user();
  //     var actionsClass = "";
  //     if(!user) return false;
  //     if (user.hasUpvoted(this)) {
  //       actionsClass += " voted upvoted";
  //     }
  //     if (user.hasDownvoted(this)) {
  //       actionsClass += " voted downvoted";
  //     }
  //     if (Settings.get("enableDownvotes", false)) {
  //       actionsClass += " downvotes-enabled";
  //     }
  //     return actionsClass;
  //   }
  // });
  Template.post_vote.events(
  {
    "click .upvote-link": function(e, t)
    {
      var $donationModal = t.$('[data-modal=donationModal]');
      $donationModal.modal("show");
      e.preventDefault();
    }
  });

  Template.post_vote.rendered = function()
  {
    var post = this.data;
    // var user = Meteor.user();
    var $donationModal = this.$('[data-modal=donationModal]');
    $donationModal.on('donation:success', function success(e, payload)
    { 

      console.log('Donated Successfully', e, payload);
      //payload is an object storing whatever information stored in { amount: input_donation, stripe_transcation_id: "" }
      // Meteor.call('upvotePost', post._id, function(){
      //   Events.track("post upvoted", {'_id': post._id});
      // })
    });
  }
}

  
    // if(!user){
    //   FlowRouter.go('signIn');
    //   Messages.flash(i18n.t("please_log_in_first"), "info");
    // } else if (user.hasUpvoted(post)) {
    //   Meteor.call('cancelUpvotePost', post._id, function(){
    //     Events.track("post upvote cancelled", {'_id': post._id});
    //   });        
    // } else {
    //   Meteor.call('upvotePost', post._id, function(){
    //     Events.track("post upvoted", {'_id': post._id});
    //   });  
    // }
  // },
  // 'click .downvote-link': function(e){
  //   var post = this;
  //   var user = Meteor.user();
  //   e.preventDefault();
  //   if(!user){
  //     FlowRouter.go('atSignIn');
  //     Messages.flash(i18n.t("please_log_in_first"), "info");
  //   }
  //   if (user.hasDownvoted(post)) {
  //     Meteor.call('cancelDownvotePost', post._id, function(){
  //       Events.track("post downvote cancelled", {'_id': post._id});
  //     });        
  //   } else {
  //     Meteor.call('downvotePost', post._id, function(){
  //       Events.track("post downvoted", {'_id': post._id});
  //     });  
  //   }
  // }  
// });









