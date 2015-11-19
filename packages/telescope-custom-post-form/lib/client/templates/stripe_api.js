

// need to get the PUBLISHABLE_KEY by sending a request with the 
// AUTHORIZATION_CODE


HTTP.post("https://accounts.spotify.com/api/token", {
      data: {
        grant_type : "authorization_code",
        code : authCode,
        redirect_uri : Router.routes['redirect_spotify'].url()
      },
      headers: {
        'Authorization' : "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("xxxx:yyyyy")),
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }, function(error, result) {
      console.log("POST made with data : %j", result);
      if (error){
        Registrations.remove({userId : this.userId });
        return;
      }
      Registrations.update({
        userId : this.userId },
      {$set : {
        state: "Done",
        accessToken: result.access_token,
        //TODO expires
        refreshToken: result.refresh_token
        }},
      { upsert : true}
    );
    });