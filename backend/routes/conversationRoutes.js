const express = require("express");
const router = express.Router();
const { createOrGetConversation, getConversationsForUser, deleteConversation } = require("../controllers/conversationController");

router.post("/conversations", createOrGetConversation);
router.get("/conversations/:userId", getConversationsForUser);
router.delete("/conversations/:id", deleteConversation);

module.exports = router;