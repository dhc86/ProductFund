if(Meteor.isServer){
    Meteor.methods({
        fetchFromService: function(userName) {
            var url = "https://connect.stripe.com/oauth/tokenclient_secret=sk_test_G77gaaVCcCaEFTccvZx04IFCcode=authetication_keygrant_type=ac_7O6J6GkkqeHrxCfmFqdoOkLGixnZa4CU";
            //synchronous GET
            var result = Meteor.http.get(url, {timeout:30000});
            if(result.statusCode==200) {
                var respJson = JSON.parse(result.content);
                console.log("response received.");
                return respJson;
            } else {
                console.log("Response issue: ", result.statusCode);
                var errorJson = JSON.parse(result.content);
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }
        }
    });
}

    




   //  https://connect.stripe.com/oauth/token \
   // -d client_secret=sk_test_G77gaaVCcCaEFTccvZx04IFC \
   // -d code=authetication_key \
   // -d grant_type=authorization_code
