var spells = [];
var activeSpell = 0;

var app = angular.module("browseSpellsApp", []);

app.controller("browseSpellsController", function($scope, $http) {
    $scope.spells = [];

    $scope.get_spells = function() {
        $http({
            method: "GET",
            //url: "https://comp246harrypotter.herokuapp.com/get-spells"
            url: "http://localhost:3000/get-spells"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                spells = response.data.spells;
                $scope.obj = spells[activeSpell];
                $scope.showHide();
            } else {
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.get_spells();

    $scope.changeSpell = function(direction) {
        activeSpell += direction;
        $scope.obj = spells[activeSpell];
        $scope.showHide();
    };

    $scope.showHide = function() {
        $scope.hidePrev = (activeSpell === 0) ? true : false;
        $scope.hideNext = (activeSpell === spells.length - 1) ? true : false;
    };
});