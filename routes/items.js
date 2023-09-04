const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/", (req, res) => {
    res.redirect("/api-docs"); // Redirect to the Swagger documentation
});

// GET all items
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Fetch all items
 *     description: Retrieve a list of all items.
 *     responses:
 *       200:
 *         description: Successful response with a list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: No items found. Error message in the response body.
 *       500:
 *         description: Internal server error. An error occurred. Error message in the response body.
 */

router.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        if (!items) return res.status(404).json({ error: "Item not found." });

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new item
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item.
 *     description: Create a new item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *               description:
 *                 type: string
 *                 description: The description of the item (optional).
 *               price:
 *                 type: number
 *                 description: The price of the item.
 *     responses:
 *       201:
 *         description: Successful response with the newly created item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request. Invalid input data.
 */
router.post("/items", async (req, res) => {
    const item = new Item(req.body);

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT/update an item by ID
/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     description: Update an existing item by ID with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the item to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated successfully.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */

router.put("/items/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the item exists in the database
        const existingItem = await Item.findById(id);

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the item if it exists
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
});

// DELETE an item by ID
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     description: Delete an item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the item to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Item deleted successfully.
 *       404:
 *         description: Item not found. Error message in the response body.
 *       400:
 *         description: Bad request. An error occurred. Error message in the response body.
 */
router.delete("/items/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        const item = await Item.findByIdAndRemove(Id);

        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.json({ message: "Item deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: "An error occurred." });
    }
});

module.exports = router;
