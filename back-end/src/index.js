import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 7000;  

app.use(cors({
  origin: 'https://howffypcibjc.sealoshzh.site',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


app.post("/api/register", async (req, res) => {
  try {
    const {username, password, email} = req.body;

    // 判断数据是否为空
    if (!username || !password || !email) {
      return res.status(400).json({
        code: 400,
        message: "数据不能为空"
      });
    }

    // 判断邮箱格式是否正确
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        code: 400,
        message: "邮箱格式不正确"
      });
    }

    // 使用单个查询检查用户名和邮箱
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({
          code: 400,
          message: "用户名已存在"
        });
      } else {
        return res.status(400).json({
          code: 400,
          message: "邮箱已存在"
        });
      }
    }

    // 创建用户
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email
      }
    });

    // 注册成功
    return res.status(201).json({
      code: 201,
      message: "注册成功",
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      }
    });

  } catch (error) {
    console.error("注册错误:", error);
    return res.status(500).json({
      code: 500,
      message: "服务器内部错误"
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    // 判断用户名和密码是否为空
    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: "用户名和密码不能为空"
      });
    }

    // 查询用户
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    // 判断用户是否存在
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "用户名不存在"
      });
    }

    // 判断密码是否正确
    if (user.password !== password) {
      return res.status(401).json({
        code: 401,
        message: "密码错误"
      });
    }

    // 登录成功
    return res.status(200).json({
      code: 200,
      message: "登录成功",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('登录错误:', error);
    return res.status(500).json({
      code: 500,
      message: "服务器内部错误"
    });
  }
});


app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
