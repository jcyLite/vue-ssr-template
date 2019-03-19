<template>
	<div class="page-add">
		<div class="header">
			add
		</div>
		<tk-upload-photo v-model="a"></tk-upload-photo>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				a:[]
			}
		}
	}
</script>

<style>
</style>