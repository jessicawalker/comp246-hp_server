var app = angular.module("spellsTableApp", []);

app.controller("spellsTableController", function($scope, $http) {
    $scope.spells = [];
    $scope.types = [];

    $scope.get_spells = function() {
        $http({
            method: "GET",
            //url : "https://comp246harrypotter.herokuapp.com/get-spells"
            url: "http://localhost:3000/get-spells"
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.spells = response.data.spells;
                $scope.types = getTypes(response.data.spells);
                $scope.selectedType = $scope.types[0];
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.get_spells();

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;

        $http({
            method: "GET",
            url: "http://localhost:3000/get-spellsByType",
            //url: "https://comp246harrypotter.herokuapp.com/get-spellsByType",
            params: { type: type }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.spells = response.data.spells;
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };

    $scope.deleteSpell = function(spellName) {
        $http({
            method: "DELETE",
            url: "http://localhost:3000/delete-spell",
            //url: "https://comp246harrypotter.herokuapp.com/delete-spell",
            params: { name: spellName }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        });
    };
});

function getTypes(spellDataArray) {
    var typeExists;

    var typesArray = [{ value: "", display: "ALL" }];
    for (var i = 0; i < spellDataArray.length; i++) {
        typeExists = typesArray.find(function(element) {
            return element.value === spellDataArray[i].type;
        });

        if (typeExists) {
            continue;
        } else {
            typesArray.push({ value: spellDataArray[i].type, display: spellDataArray[i].type.toUpperCase() });
        }
    }

    return typesArray;
}