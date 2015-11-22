
// secret key:    sk_test_G77gaaVCcCaEFTccvZx04IFC  --> keep in server side
// publishable key:   pk_test_GpmbjLyT5iOAfAPK7zT7DkF1  --> keep in client side


  
// href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_7NQ3TnZveKPdFms4tlzUx5wswjPDubGN&scope=read_write

if(Meteor.isServer){

    Meteor.methods({
        fetchFromService: function(authentication_key) {
            console.log("===========================================");
            // console.log("authentication_key : ", authentication_key);

            var url = "https://connect.stripe.com/oauth/token";

            Meteor.http.post(url, {content:  
                "client_secret=sk_test_G77gaaVCcCaEFTccvZx04IFC&"+
                "code="+authentication_key+"&"+
                "grant_type=authorization_code" }, 

              function(error, result) {
                console.log(result)
                var access_token = result.data.access_token;
                var stripe_publishable_key = result.data.stripe_publishable_key;
                var stripe_user_id = result.data.stripe_user_id;
                // console.log("access_token :",access_token);
                //console.log("stripe_publishable_key :",stripe_publishable_key);
                 // console.log("stripe_user_id :",stripe_user_id);


                var current_user = Meteor.user();
                var currentuserID= current_user._id
               // console.log("currentuserID", currentuserID);

                // current_user.req.params.Access_token = "diego herrera";
               
                // current_user.access_token = access_token;
                
                // PlayersList.insert({name: "David",score: 0});
                // console.log('users', Users)
                Users.update(currentuserID, {$set: {Stripe_user_id: stripe_user_id } });
                // Users.update



                // console.log("users ID ------------>: ", current_user._id);
                // console.log("users public key ------------>: ", current_user.Public_key);
                // console.log("users access_token ------------>: ", current_user.Access_token);

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
   
          Users.update(current_user._id,{$set: {Access_token: access_token}});
          Users.update(current_user._id,{$set: {Public_key: stripe_publishable_key}});
          Users.update(current_user._id,{$set: {Stripe_user_id: stripe_user_id }});

          if(result.statusCode==200) {
              console.log("response received.");
          }else if(result.statusCode===null){
            console.log("There response is null")
          } 
          else {
              console.log("Response issue: ", result.statusCode);
          }
      });
    }
  });
>>>>>>> 3103c86d00bf0255f7a0d6915a7cf2a316c7d0f3
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