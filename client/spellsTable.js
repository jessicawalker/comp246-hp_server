var app = angular.module("spellsTableApp", []);

app.controller("spellsTableController", function($scope, $http) {
    $scope.spells = [];

    $scope.get_spells = function() {
        $http({
            method : "GET",
            url : "https://comp246harrypotter.herokuapp.com/get-spells"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.spells = response.data.spells;
            }
            else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.get_spells();
});