
// secret key:    sk_test_G77gaaVCcCaEFTccvZx04IFC  --> keep in server side
// publishable key:   pk_test_GpmbjLyT5iOAfAPK7zT7DkF1  --> keep in client side


  
// href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_7NQ3TnZveKPdFms4tlzUx5wswjPDubGN&scope=read_write

if(Meteor.isServer){
    Meteor.methods({
        fetchFromService: function(authentication_key) {
            console.log("===========================================");
            console.log("authentication_key : ", authentication_key);

            var url = "https://connect.stripe.com/oauth/token";

            Meteor.http.post(url, {content:  
                "client_secret=sk_test_G77gaaVCcCaEFTccvZx04IFC&"+
                "code="+authentication_key+"&"+
                "grant_type=authorization_code" }, 

              function(error, result) {
                var access_token = result.data.access_token;
                var stripe_publishable_key = result.data.stripe_publishable_key;
                var stripe_user_id = result.data.stripe_user_id;
                console.log("access_token :",access_token);
                console.log("stripe_publishable_key :",stripe_publishable_key);
                console.log("stripe_user_id :",stripe_user_id);


                var current_user = Meteor.user();
                // current_user.req.params.Access_token = "diego herrera";
                // console.log("current_user ------>", current_user);
                // current_user.access_token = access_token;
                // var currentuserID= current_user._id
                // PlayersList.insert({name: "David",score: 0});
                // console.log('users', Users)
                // Users.insert(currentuserID, {$set: {Access_token: access_token} });



                console.log("users ID ------------>: ", current_user._id);
                console.log("users public key ------------>: ", current_user.Public_key);
                console.log("users access_token ------------>: ", current_user.Access_token);

                if(result.statusCode==200) {
                    console.log("response received.");
                }else if(result.statusCode===null){
                  console.log("There response is null")
                } 
                else {
                    console.log("Response issue: ", result.statusCode);
                    // var errorJson = JSON.parse(result.content);
                    // throw new Meteor.Error(result.statusCode, errorJson.error);
                }
            });
        }
    });
}






if (Meteor.isClient) {
  Template.post_submit.events({
    'click #special-stripe-button': function(e) {
      e.preventDefault();

      StripeCheckout.open({
        key: 'pk_test_GpmbjLyT5iOAfAPK7zT7DkF1',
        amount: 1000, // this is equivalent to $10
        name: 'Project Name',
        description: 'On how to use Stripe ($10.00)',
        panelLabel: 'Pay Now',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken);
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'chargeCard': function(stripeToken) {
      check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_G77gaaVCcCaEFTccvZx04IFC');

      Stripe.charges.create({
        source: stripeToken,
        amount: 1000, // this is equivalent to $10
        currency: 'usd'
      }, function(err, charge) {
        console.log(charge);
        if (charge.status === "succeeded"){
        console.log("Sucessssssss");
          // here I need to show my button of post my product
        }
        else {
          console.log("not accepatble payment");
        }
      });
    }
  });
}