if (Meteor.isClient) {
    console.log('hi');
    Meteor.subscribe("chat_messages");
    Template.chat_messages.helpers({
        chat_messages: function() {
            return chatMessages.find();
        }
    });

    Template.chat_input.events = {
        'keydown input#chat_message' : function (event) {
            if (event.which == 13) { // 13 is the enter key
                if (Meteor.user())
                    var name = Meteor.user().profile.name;
                else
                    var name = 'Anonymous';
                var chat_message = document.getElementById('chat_message')
                if (chat_message.value != '') {
                    var chat_message_data = {
                        name: name,
                        chat_message: chat_message.value,
                        time: Date.now(),
                    }
                    Meteor.call("newChatMessage", chat_message_data);
                    document.getElementById('chat_message').value = '';
                    // chat_message.value = '';
                }
            }
        }
    }
}

if (Meteor.isServer) {

    Meteor.startup(function () {
       chatMessages.remove({});
    });

    console.log('server up');
    Meteor.publish('chat_messages', function() {
        return chatMessages.find();
    });
}

Meteor.methods({
    newChatMessage: function (chat_message_data) {
        chatMessages.insert(chat_message_data);
    }
});
