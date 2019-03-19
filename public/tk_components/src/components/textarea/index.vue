<style lang="less">
	.tk-textarea {
		position: relative;
		min-height:200px;
		textarea {
			min-height:200px;
			font-family: "agency fb";
			box-sizing: border-box;
			border: none;
			width: 100%;
			height: 100%;
			background: #fff;
			padding: 13px;
			font-size: 15px;
			&::-webkit-input-placeholder {
				color: #999;
			}
		}
		.maxlength{
			height:50px;
			line-height:50px;
			background:#fff;
			border-top:1px solid #e9e9e9;
			text-align: right;
			padding-right:13px;
			color:#999;
			border-bottom:1px solid #e9e9e9;
		}
		/*textarea:focus{
			border:1px solid #fcbd3a;
		}*/
		.del {
			position: absolute;
			right: 10px;
			bottom: 60px;
			width: 20px;
			height: 20px;
			background-size: contain;
			background-repeat: no-repeat;
		}
	}
</style>
<template>
	<div class="tk-textarea">
		<textarea @blur="$emit('blur')" @focus="$emit('focus')" v-model="textAreaVal" :maxlength="maxlength" :minlength="minlength" :placeholder="placeholder" name="" rows="" cols="">
		</textarea>
		<div class="maxlength" v-if="!!maxlength">
			温馨提示：
			<span v-if="textAreaVal&&!regTest">还能再输入{{maxlength-textAreaVal.length}}字</span>
			<span v-if="!textAreaVal">尚未输入内容</span>
			<span style="color:red;" v-if="textAreaVal&&regTest">请不要输入全空字符</span>
		</div>
		<!--<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1542272305969" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" p-id="1225" width="200" height="200">
			<path d="M1000.851083 943.592916L571.613519 514.348127l429.230339-429.23034a43.335582 43.335582 0 0 0 0-61.30417 43.342807 43.342807 0 0 0-61.296945 0l-429.237564 429.23034-429.23034-429.237565a43.350032 43.350032 0 0 0-61.30417 61.30417l429.23034 429.237565L19.774839 943.585691a43.342807 43.342807 0 0 0 30.655698 73.998504 43.205532 43.205532 0 0 0 30.655697-12.701559l429.23034-429.230339 429.244789 429.237564c8.460481 8.467706 19.558089 12.701559 30.648473 12.701559s22.187991-4.233853 30.648472-12.701559a43.335582 43.335582 0 0 0-0.007225-61.296945z" fill="#231815" p-id="1226" />
		</svg>-->
		<div v-if="!!textAreaVal" @click="textAreaVal=''" class="del" :style="{'background-image':`url(${require('./close.svg')})`}">

		</div>
	</div>
</template>

<script>
	export default {
		name: 'tk-textarea',
		data() {
			return {
				textAreaVal: this.value
			}
		},
		computed:{
			regTest(){
				return /^[\s]*$/.test(this.textAreaVal)
			}
		},
		watch: {
			value(newVal) {
				this.textAreaVal = newVal
			},
			textAreaVal(newVal) {
				this.$emit('input', newVal)
			}
		},
		props: {
			maxlength:{
				type: String,
				default: ''
			},
			minlength:{
				type:String,
				default:''
			},
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请输入内容'
			},
			title: {
				type: String,
				default: '头部'
			},
			isMust:{
				type:Boolean,
				default:true
			},
			model: {
				type: String,
				default: 'assdfdf'
			}
		},
		methods: {
			handleInput(e) {
				if(this.textAreaVal.length=this.maxlength){
					this.$createDialog({
						type: 'alert',
						title:'错误提示',
						content:'输入内容不能超过'+this.maxlength+"字",
						icon: 'cubeic-alert'
					}).show()
				}
			}
		}
	}
</script>