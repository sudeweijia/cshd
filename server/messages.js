const express = require('express');
const Message = require('./Message');
const router = express.Router();

// 获取所有留言
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // 查询所有留言并按时间排序
        res.json(messages); // 返回留言列表
    } catch (err) {
        res.status(500).json({ error: err.message }); // 返回错误信息
    }
});

// 提交留言
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message({ message: req.body.message }); // 创建新的留言
        await newMessage.save(); // 保存留言到数据库
        res.json(newMessage); // 返回保存的留言
    } catch (err) {
        res.status(500).json({ error: err.message }); // 返回错误信息
    }
});

module.exports = router;

