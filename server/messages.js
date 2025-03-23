const express = require('express');
const Message = require('./Message');
const router = express.Router();

// 获取所有留言
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 提交留言
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message({ message: req.body.message });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;