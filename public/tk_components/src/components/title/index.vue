<style lang="less">
.tk-title{
    margin-bottom:14px;
    margin-top:19px;
    margin-left:13px;
    display: flex;
    line-height:14px;
    position: relative;
    .icon{
        width:3px;
        height:13px;
        background:#0084ff;
        border-radius:1.5px;
        box-sizing:border-box;
        vertical-align: middle;
    }
    .left{
        color:#999;
        margin-left:10px;
        font-family: sans-serif;
        font-size:14px;
        vertical-align: middle;
    }
    .right{
        flex:1;
        display: inline-block;
        text-align: right;
        padding-right:13px;
        font-size:13px;
        color:#999;
    }
}
</style>
<template>
	<div class="tk-title">
		<div class="icon"></div>
		<div class="left">
			<slot></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

