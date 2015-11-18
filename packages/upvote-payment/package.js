Package.describe({
  name: 'upvote-payment',
  version: '0.1.2',
  summary: 'Once user upvotes for a product or an idea,user supports with monetary contribution by Stripe'  
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use([ 
    'telescope:lib@0.25.5'
    ]);

  api.addFiles(['lib/client/templates/custom_post_vote.html',
                'lib/client/templates/custom_post_vote.js',
                'lib/client/custom_template.js',
                'lib/client/templates/donation_modal.html',
                'lib/client/templates/donation_modal.js' 
               ], 'client');

  api.addFiles([
    'lib/custom_module.js',
    
     ],['client', 'server']);
   
  api.addFiles(['lib/server/stripe_server.js'], 'server');
});