const MongoClient = require("mongodb").MongoClient;
const harryPotterSpells = require("harry-potter-spells");

const dbURL = process.env.DB_URI || "mongodb://localhost";

var initializeDatabase = function() {
    MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            console.log("Error: " + err);
        } else {
            var dbo = client.db("harrypotter");

            dbo.collection("spells").find().toArray(function(err, data) {
                if (err) {
                    client.close();
                    console.log("Error: " + err);
                } else {
                    if (data.length === 0) {
                        var spells = harryPotterSpells.all;

                        dbo.collection("spells").insertMany(spells, function(err, data) {
                            if (err) {
                                console.log("Error: " + err);
                            } else {
                                console.log("Added seed records");
                                client.close();
                            }
                        });
                    } else {
                        client.close();
                        console.log("Seed records already exists");
                    }
                }
            });
        }
    });
};

exports.initializeDatabase = initializeDatabase;