const express = require('express');
const router = new express.Router();
const flatdb = require("./flatDb.js");
const filePath = "items.txt"
const flat = new flatdb.FlatFileDB(filePath);

/** GET /items - this should render a list of shopping items. */

router.get("/", function(req, res) {
    return res.json(flat.items);
});

/** GET /items/:name - this route should display a single item’s name and price. */

router.get("/:name", function(req, res) {
    return res.json(item = flat.items.find(index => index.name === req.params.name));
});

/** PATCH /items/:name, this route should modify a single item’s name and/or price. */

router.patch("/:name", function(req, res) {
    flat.patchItem(req.params.name, req.body);
    return res.json({updated: req.body});
});

/** POST /items - this route should accept JSON data and add it to the shopping list. */

router.post("/", function(req, res) {
    flat.addItem(req.body);
    return res.json({added: req.body});
});

/** DELETE /items/:name - this route should allow you to delete a specific item from the array. */
router.delete("/:name", function(req, res) {
    flat.deleteItem(req.params.name);
    return res.json({message: "Deleted"});
});


module.exports = router;