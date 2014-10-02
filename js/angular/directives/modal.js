angular.module('foundation.modal', [])
  .directive('modal', function() {
  return {
    restrict: 'A',
    templateUrl: '/partials/modal.html',
    scope: {
      title: '=',
      args: '=',
      show: '='
    },
    replace: true,
    link: function(scope, element, attrs, ctrl, transcludeFn) {
      var dialog = angular.element(element.children()[0]);

      scope.$watch(scope.show, function(newValue, oldValue) {
        console.log('happened?');
        if(newValue) {
          dialog.addClass('is-active');
          element.addClass('is-active');
        }
      });

      angular.forEach(scope.args, function(value, key) {
        scope[key] = value;
      });

      scope.dismiss = function() {
        dialog.removeClass('is-active');
        element.removeClass('is-active');
        scope.show = false;
      }

      scope.ok = function() {
        dialog.removeClass('is-active');
        element.removeClass('is-active');
        scope.show = false;
      }

      transcludeFn(scope, function (clone) {
        dialog.append(clone);
      });
    }
  }
});

angular.module('foundation.modal')
  .factory('modal.api', function() {
    return {
      status: null,
      message: null,
      showModal: function(data, templateUrl) {
        this.data = data;
        this.templateUrl = templateUrl;
      }
    }
  });