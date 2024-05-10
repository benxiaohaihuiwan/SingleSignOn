import express from "express";
import session from "express-session";
import fs from "node:fs";
import cors from "cors";
import jwt from "jsonwebtoken";

const appToMapUrl = {
  // A 项目的 appId
  as6s2ipA: {
    url: "http://localhost:5188",
    name: "vue",
    secretKey: "%Y&*VGHJKLsjkas",
    token: "",
  },
  // B 项目的 appId
  bs789ipB: {
    url: "http://localhost:5189",
    secretKey: "%Y&*FRTYGUHJIOKL",
    name: "react",
    token: "",
  },
};

// 搭建服务
const app = express();

app.use(express.json());

// 解决跨域
app.use(cors());

// 生成一个 cookie
app.use(
  session({
    secret: "$%^&*()_+DFGHJKL",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //过期时间
    },
  })
);

// 生成token
const getToken = (appId) => {
  /**
   * 1 第一个参数就是荷载，存我们的信息
   * 2 第二个参数是一个密钥，记录在服务器中，在验证时需要用到此参数
   * 3 第三个参数通常是从redis取，设置过期时间，在这里先不设置
   */
  return jwt.sign({ appId }, appToMapUrl[appId].secretKey);
};
/**
 * 一进到页面，就调用登录接口
 * 1 登录过，就返回一个token
 * 2 没登录过，则跳转到登录页面
 */
app.get("/login", (req, res) => {
  const appId = req.query.appId;
  if (req.session.username) {
    // 若是有值，证明登录过
    let token;
    if (appToMapUrl[appId].token) {
      // 第一个项目访问
      token = appToMapUrl[appId].token;
    } else {
      // 后面项目访问
      token = getToken(appId);

      appToMapUrl[appId].token = token;
    }
    res.redirect(`${appToMapUrl[appId].url}?token=${token}`);
    return;
  }
  const html = fs.readFileSync("../sso.html", "utf-8");

  res.send(html);
});

// 登录成功接口
app.get("/loginSuccess", (req, res) => {
  const { username, password, appId } = req.query;
  // 实际情况下，需要在判断下账号密码是否对应。

  // 生成响应的token
  const token = getToken(appId);
  appToMapUrl[appId].token = token; // 存一份token值
  req.session.username = username; // 存一个标识证明登录过
  const url = appToMapUrl[appId].url; // 获取 url
  // 登录后，重定向页面
  res.redirect(`${url}?token=${token}`);
  //   console.log(username, password, appId);

  res.send("ok");
});

// 服务
app.listen(3000, () => {
  console.log("启动一个3000的服务");
});
