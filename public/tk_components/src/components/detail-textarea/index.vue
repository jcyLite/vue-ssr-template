<style lang="less">
	.tk-detail-textarea{
	    width:100%;
	    margin-bottom:10px;
	    background:#fff;
	    height:180px;
	    line-height:22px;
	    font-size:15px;
	    color:#999;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    .box{
	    	margin:13px;
	    	overflow: hidden;
	    }
	    &.active{
	    	height:auto;
	    }
	}
</style>
<template>
	<div @click="$emit('click')" :class="{active}" class="tk-detail-textarea">
		<div class="box">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				active:false
			}
		}
	}
</script>
