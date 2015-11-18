Package.describe({
	summary: "Simple usage of bootstrap 3 modals.",
	version: "1.0.3",
	name: "peppelg:bootstrap-3-modal",
	git: "https://github.com/PeppeL-G/bootstrap-3-modal.git"
})

Package.onUse(function(api){
	
	api.versionsFrom('METEOR@1.0.3')
	
	api.use([
		'telescope:lib@0.25.5',
		'templating',
		'jquery'
	], 'client')
	
	api.addFiles([
		'main.js',
		'lib/client/templates/donation_modal.html',
		'lib/client/templates/donation_modal.js'	
	  ],'client')

	api.addFiles(['lib/custom_module.js'

		],['client', 'server'])
	
	api.export('Modal', 'client')
	
})