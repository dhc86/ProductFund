if (Meteor.isClient){

Template.post_vote.helpers({
  enableDownvotes: function () {
    return Settings.get("enableDownvotes", false);
  },
  actionsClass: function () {
    var user = Meteor.user();
    var actionsClass = "";
    if(!user) return false;
    if (user.hasUpvoted(this)) {
      actionsClass += " voted upvoted";
    }
    if (user.hasDownvoted(this)) {
      actionsClass += " voted downvoted";
    }
    if (Settings.get("enableDownvotes", false)) {
      actionsClass += " downvotes-enabled";
    }
    return actionsClass;
  }
});


Template.post_vote.events({
  "click .upvote-link": function(e){
    var post = this;
    var user = Meteor.user();
    e.preventDefault();
    $("#donationModal").modal("show");
  }
});

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







// Template.stripePayment.hooks({
//   rendered: function () {
//     $('#creditCardNumber').payment('formatCardNumber');
//     $('#creditCardCVV').payment('formatCardNumber');
//   }
// });

// Template.profileEdit.events({
//   'submit #stripePaymentForm': function(e) {
//     e.preventDefault();
//     var $form = $(e.target);
//     var $cc = $form.find("#creditCardNumber").val();
//     var $ccM = $form.find("#creditCardExpDateMonth").val();
//     var $ccY = $form.find("#creditCardExpDateYear").val();
//     var $cvc = $form.find("#creditCardCVC").val();

// var error = true;
//     if (!$.payment.validateCardNumber($cc)) {
//       error = "The credit card number is invalid";
//     }else
//     if (!$.payment.validateCardExpiry($ccM, $ccY)) {
//       error = "The expiry values have an error.";
//     }else
//     if (!$.payment.validateCardCVC($cvc)) {
//       error = "The CVC value has an error.";
//     }else{
//       error=false
//     }

// }
// });

