Template.donationModal.events({
  'click #confirm': function(e){
    e.preventDefault();
    var donationAmount ={
      donationAmount: $('#donationAmount').val()
    }
    Modal.hide('donationModal');
  }
});