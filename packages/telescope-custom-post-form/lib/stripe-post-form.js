
// secret key:    sk_test_G77gaaVCcCaEFTccvZx04IFC  --> keep in server side
// publishable key:   pk_test_GpmbjLyT5iOAfAPK7zT7DkF1  --> keep in client side

// if (Meteor.isClient){
//   // this code runs on the client
// }

// if (Meteor.isServer){
//   // this code runs on the server
// }

// var myParam = location.search.split('code=')[1]
// myParam


// if (Meteor.isClient) {
//   Template.post_submit.events({
//     'click #special-stripe-button': function(e) {
//       e.preventDefault();
//     }
//   });
// }
  
    

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
                console.log("raw response :", result.data);
                console.log("raw response error :", error);

                if(result.statusCode==200) {
                    console.log("response received.");
                }else if(result.statusCode===null){
                  console.log("There response is null")
                } 
                else {
                    console.log("Response issue: ", result.statusCode);
                    // var errorJson = JSON.parse(result.content);
                    throw new Meteor.Error(result.statusCode, errorJson.error);
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