// Telescope.modules.removeAll("postComponents");

// Telescope.modules.add("postComponents", [
//   {
//     template: 'post_rank',
//     order: 1
//   },
//   {
//     template: 'post_vote',
//     order: 10
//   },
//   {
//     template: 'post_content',
//     order: 20
//   },
//   {
//     template: 'post_live',
//     order: 30
//   },
//   {
//     template: 'post_discuss',
//     order: 40
//   },
//   {
//     template: 'post_actions',
//     order: 50
//   }
// ]);
Telescope.modules.add("postComponents", {
  template: "post_live",
  order: 30
});

Telescope.modules.remove("postComponents", "post_avatars");
Telescope.modules.remove("postComponents", "post_discuss");