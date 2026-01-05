const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const mongoose = require("mongoose");

exports.createOrGetConversation = async (req, res) => {
  try {
    const { participant1, participant2 } = req.body;

    if (
      !participant1 ||
      !participant2 ||
      !mongoose.Types.ObjectId.isValid(participant1) ||
      !mongoose.Types.ObjectId.isValid(participant2)
    ) {
      return res.status(400).json({ success: false, message: "Invalid participant IDs" });
    }
    if (participant1 === participant2) {
      return res.status(400).json({ success: false, message: "Participants must be different" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [participant1, participant2] },
    }).populate("participants", "firstName lastName email");

    if (!conversation) {
      conversation = new Conversation({ participants: [participant1, participant2] });
      await conversation.save();
      conversation = await Conversation.findById(conversation._id)
        .populate("participants", "firstName lastName email");
    }

    return res.json({ success: true, conversation });
  } catch (error) {
    console.error("Create Conversation Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getConversationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }
    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "firstName lastName email")
      .sort({ lastMessageTime: -1 })
      .lean();

    // Enrich with last message preview if missing
    const convIds = conversations.map((c) => c._id);
    const lastMsgs = await Message.aggregate([
      { $match: { conversationId: { $in: convIds } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$conversationId", text: { $first: "$text" }, createdAt: { $first: "$createdAt" } } },
    ]);
    const lastMap = new Map(lastMsgs.map((m) => [String(m._id), m]));
    const enriched = conversations.map((c) => {
      const lm = lastMap.get(String(c._id));
      return lm ? { ...c, lastMessage: lm.text, lastMessageTime: lm.createdAt } : c;
    });

    return res.json({ success: true, conversations: enriched });
  } catch (error) {
    console.error("Get Conversations Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid conversation id" });
    }

    const conv = await Conversation.findById(id);
    if (!conv) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    await Message.deleteMany({ conversationId: id });
    await Conversation.findByIdAndDelete(id);

    return res.json({ success: true });
  } catch (error) {
    console.error("Delete Conversation Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
