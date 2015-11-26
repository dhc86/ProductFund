// Write your package code here!
// You don't say!!!
if (Meteor.isServer) {

    Meteor.startup(function() {
        Posts.remove({});



        var toTitleCase = function (str) {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };

        var createPost = function (slug, postedAt, username, thumbnail, short_description, donations, source) {
            var post = {
                postedAt: postedAt,
                body: Assets.getText("content/" + slug + ".md"),
                title: toTitleCase(slug.replace(/_/g, ' ')),
                dummySlug: slug,
                isDummy: true,
                userId: Meteor.users.findOne({username: username})._id,
                short_description: short_description,
                Donations: donations,
                url: source
            };

            if (typeof thumbnail !== "undefined")
                post.thumbnailUrl = "/packages/telescope-custom-seed/content/images/" + thumbnail;

            Posts.submit(post);
        };

        createPost("save_toby", moment().toDate(), "willeson", "toby1.jpg", "This bunny is in desperate need of YOUR help! Find out how your donations can save his life!", 45939, "http://www.savetoby.com");
        createPost("product_fund", moment().toDate(), "yoohenry", "product_fund.png", "Product Fund is a site that revolves around instant gratification, bridging potential benefactors and causes with a single button", 5);
        createPost("zano_drone", moment().toDate(), "yoohenry", "ZANO-Nano-Drone.jpg", "Autonomous, Intelligent, Developable. Meet ZANO the world's most sophisticated nano drone - aerial photo and HD video capture platform.", 967, "https://www.kickstarter.com/projects/torquing/zano-autonomous-intelligent-swarming-nano-drone");
        createPost("oculus_rift", moment().toDate(), "yoohenry", "oculus_rift.jpg", "Oculus wants to make it possible to experience anything, anywhere, through the power of virtual reality. This is a gadget that will completely immerse you inside virtual worlds", 1579, "http://www.oculus.com");
        createPost("build_the_enterprise", moment().toDate(), "yoohenry", "enterprise.jpg", "Build the Enterprise is a project to create a real-life version of the Starship Enterprise, the spaceship featured in the science fiction television show Star Trek. The ship would be able to carry the personnel, supplies and equipment needed for a long journey or colonization of another planet.", 9231, "http://www.buildtheenterprise.org");
        createPost("help_walter_white", moment().toDate(), "yoohenry", "walt.png", "Father, Husband, Teacher, & Drug Lord. Befallen with lung cancer, he could use your support!", 12236, "http://www.savewalterwhite.com");
        createPost("ring_by_logbar", moment().toDate(), "yoohenry", "ring.jpg", "Wearable Input Device that lets you control anything. Gesture control, text transmission, payment, and more!", 4312, "http://www.logbar.jp");

        chat_room_data = {roomname: "Product Fund", owner: "yoohenry"}
        Meteor.call("newChatRoom", chat_room_data);
        chat_room_data = {roomname: "Save Toby", owner: "yoohenry"}

        Meteor.call("newChatRoom", chat_room_data);
    });
}
