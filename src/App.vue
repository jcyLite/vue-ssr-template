<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
	export default {
		
	}
</script>
<style lang="less">
	body{
		margin:0;
	}
</style>
