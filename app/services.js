const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";

var services = function(app) {
    app.post("/add-spell", function(req, res) {
        var name = req.body.name;
        var type = req.body.type;
        var effect = req.body.effect;
        var counter = req.body.counter;

        var newSpell = {
            name: name,
            type: type,
            effect: effect,
            "counter-spell": counter
        };


        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("harrypotter");

                dbo.collection("spells").insertOne(newSpell, function(err, res) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
                    }
                });
            }
        });
    });

    app.get("/get-spells", function(req, res) {
        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("harrypotter");

                dbo.collection("spells").find().toArray(function(err, data) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS", spells: data }));
                    }
                });
            }
        });
    });

    app.get("/get-spellsByType", function(req, res) {
        var type = req.query.type;
        var search = (type === "") ? {} : { type: type };
        var sortBy = { name: 1 };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("harrypotter");

                dbo.collection("spells").find(search).sort(sortBy).toArray(function(err, data) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS", spells: data }));
                    }
                });
            }
        });
    });

    app.delete("/delete-spell", function(req, res) {
        var spellID = req.query.spellID;

        var s_id = new ObjectId(spellID);
        var search = { _id: s_id };

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("harrypotter");

                dbo.collection("spells"), deleteOne(search, function(err, res) {
                    if (err) {
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
                    }
                });
            }
        });
    });

    app.put("/update-spell", function(req, res) {
        var spellID = req.body.spellID;
        var name = req.body.name;
        var type = req.body.type;
        var effect = req.body.effect;
        var counter = req.body.counterSpell;

        var s_id = new Object(spellID);

        var search = {_id: s_id}

        var updateData = {
            $set: {
                name: name,
                type: type,
                effect: effect,
                "counter-spell": counter
            }
        };

        
        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                var dbo = client.db("harrypotter");

                dbo.collection("spells"), updateOne(search, updateData, function(err) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Error: " + err }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
                    }
                });
            }
        });
    });
};

module.exports = services;