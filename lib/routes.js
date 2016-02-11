// FlowRouter.route('/', {
//     name: 'index',
//     action: function() {
//         BlazeLayout.render('frontendLayout', {content: 'themeThumbnails'});
//     }
// });

/**
 * Add your routes here
 */

RouterLayer.route('/', {
	name: 'home',
	template: 'home',
	layout: 'layoutHomepage'
});

/*RouterLayer.route('/404', {
	name: '404',
	template: '404',
	layout: 'layoutGlobal'
});
*/
FlowRouter.notFound = {
    action: function()
    {
    	BlazeLayout.render('layoutGlobal', { content: '404'});
    }
};

RouterLayer.route('/p/:name', {
	name: 'video',
	template: 'video',
	layout: 'layoutGlobal'
});

RouterLayer.route('/:category/:title', {
	name: 'plug',
	template: 'plug',
	layout: 'layoutGlobal'
});

RouterLayer.route('/:category',
{
	name: 'category',
	template: 'category',
	layout: 'layoutGlobal'
});
