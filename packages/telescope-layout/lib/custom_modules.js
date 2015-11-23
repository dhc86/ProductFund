Telescope.modules.add("postComponents", {
  template: "post_live",
  order: 30
});

Telescope.modules.add("postHeading", {
  template: "post_description",
  order: 30
});

// Telescope.modules.add("totalDonation", {
//   template: "total_donation",
//   order: 10
// });

Telescope.modules.remove("postComponents", "post_avatars");
Telescope.modules.remove("postComponents", "post_discuss");