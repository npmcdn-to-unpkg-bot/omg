// ---------------- ^^^ Query Display Ctrl ^^^ --------------------------
mindMap.controller("queryDisplayCtrl",function($scope,$rootScope){
  $scope.default = "Welcome. Your Query will be generated here.";
  $scope.starting = "I'm looking for people whose ";
  $scope.space = " ";
  $scope.display = $scope.default;

  // ---------------- ^^^ Search Query Function ^^^ --------------------------
  $scope.search = function (){
    $rootScope.profiles = $scope.shuffle($rootScope.profiles);
  };
  $scope.shuffle =   function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // ---------------- ^^^ Tree Structure ^^^ --------------------------




  // ---------------- ^^^ Query Display Function ^^^ --------------------------
  $rootScope.queryDisplay = function (){
    if ($rootScope.filterArray.length == 0){
      $scope.display = $scope.default;
    } else {
      $scope.display = $scope.starting;
      for(var i=0; i<$rootScope.filterArray.length; i++){
        if ($rootScope.filterArray[i].query != null){
        $scope.display = $scope.display + $rootScope.filterArray[i].query;
        }
      }
    }
  }

  // ---------------- ^^^ Query Display Function Calling ^^^ --------------------------
  $scope.insertValues = function(index,key,val){
    for(var i=0; i<$rootScope.filterArray.length; i++){
      if (i==0){
        if ($rootScope.filterArray[i].index == index){
          $rootScope.filterArray[i][key] = val;
            if ($rootScope.filterArray[i].relationVal != null) {
              if ($rootScope.filterArray[i].valueVal != null) {
                $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].criteriaVal + $scope.space + $rootScope.filterArray[i].relationVal + $scope.space + $rootScope.filterArray[i].valueVal;
              } else {
                $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].criteriaVal + $scope.space + $rootScope.filterArray[i].relationVal;
              }
            } else {
              $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].criteriaVal;
            }
        }
      } else {
        if ($rootScope.filterArray[i].index == index){
            $rootScope.filterArray[i][key] = val;
          if ($rootScope.filterArray[i].andOrVal != null){
              $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].andOrVal;
                if ($rootScope.filterArray[i].relationVal != null) {
                  if ($rootScope.filterArray[i].valueVal != null) {
                    $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].andOrVal + $scope.space + $rootScope.filterArray[i].criteriaVal + $scope.space + $rootScope.filterArray[i].relationVal + $scope.space + $rootScope.filterArray[i].valueVal;
                  } else {
                    $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].andOrVal + $scope.space + $rootScope.filterArray[i].criteriaVal + $scope.space + $rootScope.filterArray[i].relationVal;
                  }
                } else if($rootScope.filterArray[i].criteriaVal != null){
                  $rootScope.filterArray[i].query = $scope.space + $rootScope.filterArray[i].andOrVal + $scope.space + $rootScope.filterArray[i].criteriaVal;
                }
          } else break;
        }
      }
    }
    $scope.queryDisplay();
  }

  $scope.$on("passingCriteria",function(evt,args){
    $scope.insertValues(args.index,"criteriaVal",args.value.criteria);
  });

  $scope.$on("passingRelation",function(evt,args){
    $scope.insertValues(args.index,"relationVal",args.value.relation);
  });

  $scope.$on("passingValue",function(evt,args){
    $scope.insertValues(args.index,"valueVal",args.value);
  });

  $scope.$on("passingAndOrValue",function(evt,args){
    $scope.insertValues(args.index,"andOrVal",args.value);
  });
});
