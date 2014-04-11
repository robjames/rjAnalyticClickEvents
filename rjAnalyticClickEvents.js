/* global angular *//* https://github.com/robjames/rjAnalyticClickEvents */
	angular.module('rjAnalyticClickEvents', [])
	.directive('rjAnalyticClickEvents', [function() {
		return {
			restrict:'A',
			link: function(scope, element, attrs, controller){

				if (!controller.version()) return false;

				element.on('mousedown', 'a, button, input[type="submit"]', function(){
					var path = window.location.pathname;
					var category = 'UI Interactions ' + '('+path+')';

					var id = $(this).attr('id');
					var classes = $(this).attr('class');
					var bestAttr = (!!id)?id: (!!classes)?classes: '';
					var action = 'click: ' + bestAttr;

					var opt_label = $(this).text() || $(this).val() || '';
					var opt_value = 0;

					controller.track(category, action, opt_label, opt_value);
				});

			},
			controller: ['$scope', function($scope){
				var _this = this;
				this.version = function(){
					var v = (typeof ga === 'function') ? 'universal' : 'ga';
					if (v === 'ga' && typeof _gaq === 'undefined') return null; //no analytics installed
					return v;
				};

				this.track = function(category, action, opt_label, opt_value){
					//console.log(category, action, opt_label, opt_value)
					if (_this.version() === 'universal')
						ga('send', 'event', category, action, opt_label, opt_value);
					if (_this.version() === 'ga')
						_gaq.push(['_trackEvent', category, action, opt_label, opt_value]);
				};
			}]
		};
	}]);
