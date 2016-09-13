describe('queryDisplay', function() {
  var injector;
  var element;
  var scope;

  beforeEach(function() {
    injector = angular.injector(['mindMap']);
    injector.invoke(function($rootScope, $compile) {
      scope = $rootScope.$new();
      element = $compile('  <query-display></query-display>')(scope);
      scope.$apply();
    });
  });
  it('Initial display', function(done) {
    scope.$on('queryDisplayCtrl', function() {
      expect($scope.display).to.equal("Welcome. Your Query will be generated here.")
      done();
    });
  });
});
