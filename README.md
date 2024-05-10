### A 项目启动

```js
npm run dev
```

### B 项目启动

```js
npm run dev
```

### server 服务启动

```js
node index.js
```

1. 浏览器访问：http://localhost:5188

2. 会跳转到 sso.html 登录页面，输入账号，密码，点击登录

3. 浏览器会跳转到：http://localhost:5188 且后面会跟上 token

4. 浏览器访问：http://localhost:5189，则不会进入登录页面，直接进入系统，且后面会跟上 token

5. 在直接访问：http://localhost:5188，也不会进入登录页，且跟上 token

6. 端口 5188 访问的页面 token 是相同的，同理 5189 也是一致的
