if (Meteor.isClient) {
  Template.post_live.events = {
        'click .post-live': function() {
          Session.set("roomname", this.title);
          var anyChat = (chatRooms.find({roomname: this.title}).count() > 0)
          if (Meteor.userId() === this.userId && !anyChat) {
           Meteor.call("newChatRoom", {roomname: this.title, owner: Meteor.user().profile.name});
         }
    }
  }
  Template.post_live.helpers({
      post_live_set: function() {
        var anyChat = (chatRooms.find({roomname: this.title}).count() > 0)
        if (Meteor.userId() === this.userId) {
          if (!anyChat) {
            return "Start LiveChat";
          }
          else return "Your LiveChat";
        }
        else if (anyChat) return "LiveChat";
        else return "";
      }
  });
}
