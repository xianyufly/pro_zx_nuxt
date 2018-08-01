<style>
	.container_404{
		padding: 50px 0px;
		text-align: center;
		background-color: #ffffff;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
<template>
  <div class="container_404">
  	<img src="~/assets/images/404.png" />
    <h4 class="title" v-if="error.statusCode === 404">您要找的页面不存在,或已被删除！</h4>
    <h4 v-else>应用发生错误异常</h4>
    <a class="btn btn-default" href="/">返回首页</a>
  </div>
</template>
<script>
export default {
  props: ['error']
}
</script>
