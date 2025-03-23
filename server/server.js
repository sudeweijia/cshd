// 引入必要的模块
require('dotenv').config(); // 加载环境变量
const express = require('express'); // Express 框架
const mongoose = require('mongoose'); // MongoDB 驱动
const cors = require('cors'); // 跨域支持
const path = require('path'); // 路径处理
const Message = require('./Message'); // 引入 Message 模型

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 3000; // 设置端口

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // 连接成功
.catch(err => console.log(err)); // 连接失败

// 中间件
app.use(cors()); // 启用跨域支持
app.use(express.json()); // 解析 JSON 请求体
app.use(express.static(path.join(__dirname, '../public'))); // 静态文件服务

// 路由
const messagesRouter = require('./messages'); // 引入 messages 路由
app.use('/api/messages', messagesRouter); // 使用 /api/messages 路由

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
