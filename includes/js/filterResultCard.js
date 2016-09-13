// ---------------- ^^^ Filter Card Ctrl ^^^ --------------------------
mindMap.controller("filterResultCard",function($scope,$rootScope,$mdToast,$http,$compile,GetCriteria){
  $rootScope.filterArray = [];
  $scope.increment = 0;

  // ---------------- ^^^ Expand Box Function ^^^ --------------------------
  $scope.expand = false;
  $scope.expandBox = function (x){
    $scope.expand = !$scope.expand;
    var elementId = '#expandBox' + x;
    var expEl = angular.element( document.querySelector(elementId) );
    var btnId = '#expandBtn' + x;
    var expBtnEl = angular.element( document.querySelector(btnId) );
    if($scope.expand == true){
      expBtnEl.html('&#x25B2;');
      expEl.removeClass("ng-hide");
    } else {
      expBtnEl.html('&#x25BC;');
      expEl.addClass("ng-hide");
    }
  }

  // ---------------- ^^^ Add Filter Function ^^^ --------------------------
  $scope.addFilter = function(x){
      var elementId = '#addBtn' + x;
      var expEl = angular.element( document.querySelector(elementId) );
      expEl.addClass('ng-hide');
      $rootScope.filterArray.push({
                                'criteriaVal' : null,
                                'relationVal' : null,
                                'valueVal' : null,
                                'index' : $scope.increment,
                                'andOrVal' : null,
                                'query': null
                              });
      $scope.increment++;
  }

  // ---------------- ^^^ Remove Filter Function ^^^ --------------------------
  $scope.removeFilter = function (x){
    var elementId = '#filterBox' + x;
    var delEl = angular.element( document.querySelector(elementId) );
    delEl.remove();
    var idInd = $scope.filterArray.length;
    if (idInd == 1){
      var addBtn = angular.element( document.querySelector('#addBtn99999') );
      addBtn.removeClass("ng-hide");
    } else if((x+1) == idInd) {
      var temp = (x-1);
      var btnId = '#addBtn' + temp;
      var addBtn = angular.element( document.querySelector(btnId) );
      addBtn.removeClass("ng-hide");
    }
    $rootScope.filterArray.splice(x,1);
    $rootScope.queryDisplay();
    $scope.increment--;
  }

});
