
//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on post insert
 */
Posts.before.insert(function (userId, doc) {
  if(!!doc.body)
    doc.htmlBody = Telescope.utils.sanitize(marked(doc.body));
});

/**
 * Generate HTML body from Markdown when post body is updated
 */
Posts.before.update(function (userId, doc, fieldNames, modifier) {
  // if body is being modified or $unset, update htmlBody too
  if (Meteor.isServer && modifier.$set && modifier.$set.body) {
    modifier.$set.htmlBody = Telescope.utils.sanitize(marked(modifier.$set.body));
  }
  if (Meteor.isServer && modifier.$unset && (typeof modifier.$unset.body !== "undefined")) {
    modifier.$unset.htmlBody = "";
  }
});

/**
 * Generate slug when post title is updated
 */
Posts.before.update(function (userId, doc, fieldNames, modifier) {
  // if title is being modified, update slug too
  if (Meteor.isServer && modifier.$set && modifier.$set.title) {
    modifier.$set.slug = Telescope.utils.slugify(modifier.$set.title);
  }
});

/**
 * Disallow $rename
 */
Posts.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

/**
 * Increment the user's post count and upvote the post
 */
function afterPostSubmitOperations (post) {
  var userId = post.userId;
  Meteor.users.update({_id: userId}, {$inc: {"telescope.postCount": 1}});

  // change the Post_entry_fee to not paid for next time to pay
  Meteor.users.update({_id: userId}, {$set: {Post_entry_fee: "Not paid" }});
  return post;
}
Telescope.callbacks.add("postSubmitAsync", afterPostSubmitOperations);

function upvoteOwnPost (post) {
  var postAuthor = Meteor.users.findOne(post.userId);
  Telescope.upvoteItem(Posts, post._id, postAuthor);
  return post;
}
Telescope.callbacks.add("postSubmitAsync", upvoteOwnPost);

function setPostedAt (post) {
  if (post.isApproved() && !post.postedAt) {
    Posts.update(post._id, {$set: {postedAt: new Date()}});
  }
}
Telescope.callbacks.add("postEditAsync", setPostedAt);