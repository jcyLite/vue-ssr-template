<style lang="less">
	.tk-form {
		margin-bottom: 10px;
		overflow: hidden;
		.list {
			background: #fff;
			border-bottom:1px solid #efefef;
			padding-left:13px;
			padding-right:13px;
			display: flex;
			height: 50px;
			line-height: 50px;
			position:relative;
			div {
				flex: 2;
				width: 100px;
				text-align:justify;
			}
			input {
				padding-right:5px;
				color:#999;
				margin-right:5px;
				text-align: right;
				flex: 3;
				width: 200px;
				background: transparent;
				text-overflow : ellipsis ;
				&::-webkit-input-placeholder{
					color:#999;
					font-size:14px;
				}
			}
			.number{
				color:#999;
				margin-right:15px;
				font-size:12px;
			}
			.del {
				position: absolute;
				right: 5px;
				top: 16px;
				width: 20px;
				height: 20px;
				background-size: contain;
				background-repeat: no-repeat;
			}
			span {
				flex: 0;
				line-height: 50px;
				width: 70px;
				text-align: center;
			}
			.tk-icon-alert{
				background:url('./alert.svg');
				background-size:18px;
				width:20px;
				height:20px;
				flex:inherit;
				margin-top:16px;
				background-repeat: no-repeat;
				transform:translateX(10px);
				&.active{
					transform:translateX(-10px);
				}
			}
		}
		.textarea{
			height:200px;
			background:transparent;
			.title{
				padding-left:17px;
			}
			.name{
				line-height: 50px;
				text-align:justify;
				padding-left:13px;
			}
			textarea{
				border:none;
				height:300px;
				width:100%;
				font-family:"agency fb";
			}
			textarea:focus{
				/*box-shadow:-3px -3px 4px #ddd inset;*/
			}
			
		}
	}
	
</style>
<template>
	<div class="tk-form">
		<template v-for="(item,index) of list">
			<div v-if="!item.istextarea" @click="touch(item,index)" class="list" >
				<div>{{item.name}}</div>
				<input :maxlength="item.maxlength" :disabled="item.select||item.selectTime||item.selects||item.click||item.selectDate" :placeholder="item.placeholder" type="text" v-model="item.model" />
				<!--<span v-if="item.select||item.selectTime||item.selects||item.click||item.selectDate" class="glyphicon glyphicon-menu-right"></span>-->
				<span class="number" v-if="!!item.model&&(!(item.select||item.selectTime||item.selects||item.click||item.selectDate))">
					{{item.model.length}}/{{item.maxlength}}
				</span>
				<div v-if="!!item.model&&(!(item.select||item.selectTime||item.selects||item.click||item.selectDate))" @click="item.model=''" class="del" :style="{'background-image':`url(${require('./close.svg')})`}">
					
				</div>
				<div @click="otip($event,item.model)" class="tk-icon-alert" v-if="!item.model">
					
				</div>
				<img v-if="item.select||item.selectTime||item.selects||item.click||item.selectDate" style="width:7px;height:13px;margin-top:18px;" :src="require('./right.png')" alt="" />
			</div>
			<div class="textarea content" v-if="item.istextarea">
				<div class="title">
					<div class="icon"></div>
					<span class="left">{{item.name}}</span>
				</div>
				<tkn-textarea maxlength="item.maxlength" :placeholder="item.placeholder" v-model="item.model"></tkn-textarea>
			</div>
		</template>
	</div>
</template>

<script>
	import form_test from './form_test.js';
	export default {
		name: 'tk-form',
		mixins:[form_test],
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			}
		},
		beforeDestroy(){
			this.picker=null;
			this.dateTimePicker=null;
		},
		mounted() {
		},
		methods: {
			valTest(val){
				return !val||/^[\s]*$/.test(val)
			},
			otip(e,val){
				if(!val){
					if(!this.Tip){
						this.Tip=this.$createPotTip({
							type:'text',
							content:!val?'你还没输入内容':'输入字符不能全部为空',
							direction:'top',
							offset:[e.clientX,e.clientY]
						})
					}
					this.Tip.show();
				}
			},
			test(val){
				var regular = /^[\s]*$/;
				return !val||regular.test(val)
			},
			touch(item,index) {
				item.select&&this.select(item,index);
				item.selectTime&&this.selectTime(item,index);
				item.selectDate&&this.selectTime(item,index,true)
				item.selects&&this.selects(item,index);
				if(item.click){
					item.click()
				}
			},
			selects(item,index){
				if(!this.selects_picker){
					this.selects_picker=[];
				}
				if(!this.selects_picker[index]){
					this.selects_picker[index]=this.$createPotDialog({
						title:item.name+'选择',
						selects:item.selects,
						hasSelect:item.hasSelect,
						type:'selects',
						onConfirm(e,is){
							item.model='已选择'+is.length+'项',
							item.hasSelect=is;
						}
					})
				}
				this.selects_picker[index].show()
			},
			select(item,index){
				if(!this.picker){
					this.picker=[];
				}
				if(!this.picker[index]){
					var column1=[];
					for(var i=0;i<item.select.length;i++){
						column1.push({
							text:item.select[i],
							value:i
						})
					}
					this.picker[index] = this.$createPotPicker({
						title: item.name+'选择',
						data: [column1],
						onSelect(i) {
							item.model=item.select[i]
						}
					})
				}
				this.picker[index].show()
			},
			getFormatTime(time,onlyDate){
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				if(onlyDate) return a;
				return a+' '+b
			},
			selectTime(item,index,onlyDate){
				var year=new Date().getFullYear();
				if(!this.dateTimePicker){
					this.dateTimePicker=[];
				}
				if(!this.dateTimePicker[index]){
					this.dateTimePicker[index] = this.$createPotDatePicker({
				        title: onlyDate?'请选择日期':'请选择日期和时间',
				        min: new Date(year-3, 7, 8, 8, 0, 0),
				        max: new Date(year+7, 9, 20, 20, 59, 59),
				        value: new Date(),
				        format: {
				            year: 'YY年',
				            month: 'MM月',
				            date: 'DD日'
				            
				        },
				        columnCount: onlyDate?3:6,
				        onSelect:(v)=>{
				        	item.model=this.getFormatTime(v,onlyDate)
				        }
				    })
				}
				this.dateTimePicker[index].show();
			}
		}
	}
</script>