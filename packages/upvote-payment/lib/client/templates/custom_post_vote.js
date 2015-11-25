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
    var $donationModal = this.$('[data-modal=donationModal]')
  }
}
