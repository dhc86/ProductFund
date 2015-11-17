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

                    // autoscroll
                    var height = 0;
                    $('.chat-room').children().each(function(i, value){
                        height += parseInt($(this).height());
                    });
                    height += '';
                    $('div.chat-room').animate({scrollTop: height});

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

        Meteor.settings.public.extraEmoticons = [
            {
                "image": "http://donburks.com/public/images/don.png",
                "replacements": [":don"]
            },
            {
                "image": "/path/to/something.png",
                "replacements": [":somethingcool:"]
            },
            {
                "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png",
                "replacements": [":kappa"]
            }

        ]

    });

    console.log('server up');
    Meteor.publish('chat_messages', function() {
        return chatMessages.find({}, {sort: {ts: -1}});
    });
}

Meteor.methods({
    newChatMessage: function (chat_message_data) {
        chatMessages.insert(chat_message_data);
    }
});
