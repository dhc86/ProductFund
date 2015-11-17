Template.custom_post_submit.events({ 'submit form': function(e) {
    e.preventDefault();

var post = {
donations: 0,
url: $(e.target).find('[name=url]').val(), 
title: $(e.target).find('[name=title]').val(),
body: $(e.target).find('[name=body]').val(),

};

post._id = Posts.insert(post);
    Router.go('/', post);
  }
});