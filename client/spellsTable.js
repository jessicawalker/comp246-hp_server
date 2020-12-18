//const { response } = require("express");

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
            params: { spellID: spellID }
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

    $scope.editSpell = function(spellNumber) {
        $scope.name = $scope.spells[spellNumber].name;
        $scope.type = $scope.spells[spellNumber].type;
        $scope.effect = $scope.spells[spellNumber].effect;
        $scope.counter = $scope.spells[spellNumber]['counter-spell'];
        $scope.spellID = $scope.spells[spellNumber]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.updateSpell = function(spellNumber) {
        $http({
            method: "DELETE",
            url: "http://localhost:3000/update-spell",
            data: {
                spellID: $scope.spellID,
                name: $scope.name,
                type: $scope.type,
                effect: $scope.effect,
                counterSpell: $scope.counter,
            }
        }).then(function(response) {
            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
                $scope.closeForm();
            } else {
                console.log(response.data.msg);
            }

        }, function(response) {
            console.log(response);
        })
    }

    $scope.closeForm = function(spellNumber) {
        $scope.hideForm = true;
        $scope.hideTable = false;

        $scope.name = "";
        $scope.type = "";
        $scope.effect = "";
        $scope.counter = "";

    }
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