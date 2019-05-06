<template>
	<div v-if="poper" class="poper">
		<div @click="poper=false" class="shade"></div>
		<div class="box">
			<div style="overflow: hidden;" class="scroller">
				<div class="row">
					<div class="col">图层名称：</div>
					<input v-model="poperData.tname" class="col" type="text" />
				</div>
				<div class="row">
					<div class="col">部件大类：</div>
					<select placeholder="请选择" class="col" name="" id="">
						<option  value="请选择"></option>
						<option value="a">a</option>
						<option value="b">b</option>
					</select>
				</div>
				<div class="row">
					<div class="col">部件小类：</div>
					<select placeholder="请选择" class="col" name="" id="">
						<option  value="请选择"></option>
						<option value="a">a</option>
						<option value="b">b</option>
					</select>
				</div>
				<div class="row">
					<div class="col">图层类型：</div>
					<select v-model="poperData.tleixing" placeholder="请选择" class="col" name="" id="">
						<option value="dian">点</option>
						<option value="xian">线</option>
						<option value="mian">面</option>
					</select>
				</div>
				<div class="row">
					<div v-model="poperData.jcsjlx" class="col">基础数据类型：</div>
					<input class="col" type="text" />
				</div>
				<div class="row">
					<div class="col">所属网格类型：</div>
					<select v-model="poperData.sswglx" placeholder="请选择" class="col" name="" id="">
						<option value="请选择">行政区划网格</option>
						<option value="请选择">考评工作网格</option>
					</select>
				</div>
				<div class="row">
					<div class="col">描述：</div>
					<input v-model="poperData.miaoshu" class="col" type="text" />
				</div>
			</div>
			<div class="buttons">
				<div @click="poper=false" click="btna" class="button-1">取消</div>
				<div @click="addbtuceng" class="button-2">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				poper:false,
				poperData:{
					tname:'',
					tleixing:'',
					jcsjlx:'',
					sswglx:'',
					miaoshu:''
				}
			}
		},
		name:'add',
		methods:{
			show(){
				this.poper=true;
			},
			addbtuceng(){
				alert(3)
				this.$emit('addbtuceng',this.poperData)
			}
		}
	}
</script>

<style>
</style>