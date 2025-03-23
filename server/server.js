require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Message = require('./Message');

const app = express();
const PORT = process.env.PORT || 3000;

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 路由
app.use('/api/messages', require('./messages'));

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});