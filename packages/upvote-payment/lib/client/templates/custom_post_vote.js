if (Meteor.isClient){
  Template.post_vote.events({
    "click .donation-link": function(e, t){
      var $donationModal = t.$('[data-modal=donationModal]');
      $donationModal.modal("show");
      e.preventDefault();
    }
  });
  Template.post_vote.rendered = function(){
    var post = this.data;
    var user = Meteor.user();
    var $donationModal = this.$('[data-modal=donationModal]');  
  }
}

  
// $donationModal.on('donation:success', function success(e, payload)
    // { 

    //   console.log('Donated Successfully', e, payload);
    //   //payload is an object storing whatever information stored in { amount: input_donation, stripe_transcation_id: "" }
    // });









