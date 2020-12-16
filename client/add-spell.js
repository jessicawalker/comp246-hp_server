var app = angular.module("addSpellsApp", []);

app.controller("addSpellsController", function($scope, $http) {
    $scope.submitSpell = function() {
        $http({
            method: "POST",
            //url: "https://comp246harrypotter.herokuapp.com/add-spell",
            url: "http://localhost:3000/add-spell",
            data: {
                "name": $scope.name,
                "type": $scope.type.toLowerCase(),
                "effect": $scope.effect,
                "counter": $scope.counter
            }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.addResults = "Spell is Added";
                $scope.name = "";
                $scope.type = "";
                $scope.effect = "";
                $scope.counter = "";
            } else {
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            console.log(response);
        });
    };
});