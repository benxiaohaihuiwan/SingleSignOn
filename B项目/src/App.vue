<script setup>
// 获取token值
const token = location.search.split("=")[1];

// 若是没有 token，则才调用登录接口
if (!token) {
  // 调用登录接口，跳转页面 传递appId 让用户知道是从那个项目上跳转的
  fetch("http://localhost:3000/login?appId=bs789ipB").then((res) => {
    location.href = res.url;
  });
}
// else {
//   // 存储下 token
//   localStorage.setItem("token", token);
// }
</script>

<template>
  <div>项目B页面</div>
</template>
