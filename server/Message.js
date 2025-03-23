const mongoose = require('mongoose');

// 定义留言模型
const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true, // 留言内容必填
    },
    createdAt: {
        type: Date,
        default: Date.now, // 默认值为当前时间
    },
});

// 导出模型
module.exports = mongoose.model('Message', MessageSchema);
