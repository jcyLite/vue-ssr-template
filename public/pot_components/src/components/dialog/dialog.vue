<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"
	@import './dialog.less'
  .pot-dialog-main{
    width: 270px;
    padding: 0;
    text-align: center;
    overflow: hidden;
    background-color: $dialog-bgc;
  }
  .pot-dialog-confirm, .pot-dialog-alert{
  	position: relative;
    overflow: hidden;
  }
    
  .pot-dialog-icon
    margin-top: 20px
    margin-bottom: 16px
    line-height: 1
    color: $dialog-icon-color
    font-size: $fontsize-large-xxxx
    i
      display: inline-block
      width: 30px
      height: 30px
      padding: 10px
      box-sizing: content-box
      border-radius: 50%
      background-color: $dialog-icon-bgc
    +
      .pot-dialog-title
        .pot-dialog-title-def
          margin-top: 0
    +
      .pot-dialog-content
        margin-top: -4px
  .pot-dialog-title
    color: $dialog-title-color
    font-size: $fontsize-large
    line-height: 1
    +
      .pot-dialog-content
        margin-top: 12px
  .pot-dialog-title-def
    margin: 20px 16px
    overflow: hidden
    white-space: nowrap
  .pot-dialog-content
    margin: 16px 0
    text-align: left
    color: $dialog-color
    font-size: $fontsize-medium
    line-height: 22px
  .pot-dialog-content-def
    padding: 0 16px
    > p
      display: table
      margin: auto
      + .pot-input
        margin-top: 12px
  .pot-dialog-confirm, .pot-dialog-prompt
    .pot-dialog-btns
      .pot-dialog-btn
        width: 50%
        float: left
      &.border-right-1px
        &::after
          right: 50%
          border-color: $dialog-btns-split-color
  .pot-dialog-close
    display: flex
    align-items: center
    justify-content: center
    z-index: 1
    position: absolute
    top: 0
    right: 0
    width: 32px
    height: 32px
    color: $dialog-close-color
    font-size: $fontsize-large-x
  .pot-dialog-btns
    overflow: hidden
    width: 100%
    font-size: 0
  .pot-dialog-btn
    display: inline-block
    width: 100%
    padding: 17px 10px
    margin: 0
    font-size: $fontsize-large
    line-height: 1
    text-align: center
    text-decoration: none
    color: $dialog-btn-color
    background-color: $dialog-btn-bgc
    background-clip: padding-box
    box-sizing: border-box
    &:active
      background-color: $dialog-btn-active-bgc
  .pot-dialog-btn_highlight
    color: $dialog-btn-highlight-color
    &:active
      background-color: $dialog-btn-highlight-active-bgc
  .pot-dialog-btn_disabled
    color: $dialog-btn-disabled-color
    &:active
      background-color: $dialog-btn-disabled-active-bgc

  .pot-dialog-fade-enter-active
    animation: dialog-fadein .4s
    .pot-dialog-main
      animation: dialog-zoom .4s

  @keyframes dialog-fadein
    0%
      opacity: 0
    100%
      opacity: 1
  @keyframes dialog-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
<template>
  <transition name="pot-dialog-fade">
    <pot-popup
      type="dialog"
      :z-index="zIndex"
      :mask="true"
      :center="true"
      v-show="isVisible"
      @mask-click="maskClick"
      >
      <div class="pot-dialog-main">
        <span class="pot-dialog-close" v-show="showClose" @click="close"><i class="potic-close"></i></span>
        <div :class="containerClass">
          <p class="pot-dialog-icon" v-if="icon"><i :class="icon"></i></p>
          <h2 v-if="title || $slots.title" class="pot-dialog-title">
            <slot name="title">
              <p class="pot-dialog-title-def">{{title}}</p>
            </slot>
          </h2>
          <div v-if="!isSelect" class="pot-dialog-content">
            <slot name="content">
              <div class="pot-dialog-content-def">
                <p v-html="content" v-if="content"></p>
                <pot-input v-bind="prompt" v-model="promptValue" v-if="isPrompt" />
              </div>
            </slot>
          </div>
          <!--详情-->
          <div class="pot-detail" v-if="type=='detail'">
          	<pot-scroll>
          		<ul>
          			<li v-for="item of data">
          				{{item}}
          			</li>
          		</ul>
          	</pot-scroll>
          </div>
          <!--多选-->
          <div class="selects_list" v-if="isSelects">
          	<div :class="{active:hasSelects.indexOf(index)!=-1}" @click="onSelects(index)" class="select_item" v-for="(item,index) of selects">
          		<span class="icon">
          			<svg fill="#fff" t="1541034906007" style="" viewBox="0 0 1397 1024" version="1.1" p-id="1046" width="272.8515625" height="200">
									<path d="M1396.363636 121.018182c0 0-223.418182 74.472727-484.072727 372.363636-242.036364 269.963636-297.890909 381.672727-390.981818 530.618182C512 1014.690909 372.363636 744.727273 0 549.236364l195.490909-186.181818c0 0 176.872727 121.018182 297.890909 344.436364 0 0 307.2-474.763636 902.981818-707.490909L1396.363636 121.018182 1396.363636 121.018182zM1396.363636 121.018182" p-id="1047"/>
								</svg>
          		</span>
          		<span class="text">
          			{{item}}
          	</span>
          	</div>
          </div>
          <!--单选-->
          <div class="select_list" v-if="isSelect">
          	<div :class="{active:active==index}" @click="active=index" class="select_item" v-for="(item,index) of selects">
          		<span class="icon">
          			<svg fill="#fff" t="1541034906007" style="" viewBox="0 0 1397 1024" version="1.1" p-id="1046" width="272.8515625" height="200">
						<path d="M1396.363636 121.018182c0 0-223.418182 74.472727-484.072727 372.363636-242.036364 269.963636-297.890909 381.672727-390.981818 530.618182C512 1014.690909 372.363636 744.727273 0 549.236364l195.490909-186.181818c0 0 176.872727 121.018182 297.890909 344.436364 0 0 307.2-474.763636 902.981818-707.490909L1396.363636 121.018182 1396.363636 121.018182zM1396.363636 121.018182" p-id="1047"/>
					</svg>
          		</span>
          		<span class="text">
          			{{item}}
          	</span>
          	</div>
          </div>
          <div class="pot-dialog-btns" :class="{'border-right-1px': isConfirm || isPrompt}">
            <slot name="btns">
              <a :href="_cancelBtn.href" class="pot-dialog-btn border-top-1px" :class="{'pot-dialog-btn_highlight': _cancelBtn.active, 'pot-dialog-btn_disabled': _cancelBtn.disabled}" v-if="isConfirm || isPrompt" @click="cancel">{{_cancelBtn.text}}</a>
              <a :href="_confirmBtn.href" class="pot-dialog-btn border-top-1px" :class="{'pot-dialog-btn_highlight': _confirmBtn.active, 'pot-dialog-btn_disabled': _confirmBtn.disabled}" @click="confirm">{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </pot-popup>
  </transition>
</template>

<script type="text/ecmascript-6">
  import potPopup from '../popup/popup.vue'
  import potInput from '../input/input.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import localeMixin from '../../common/mixins/locale'

  const COMPONENT_NAME = 'pot-dialog'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'

  const defHref = 'javascript:;'
  const defConfirmBtn = {
    textType: 'ok',
    active: true,
    disabled: false,
    href: defHref
  }
  const defCancelBtn = {
    textType: 'cancel',
    active: false,
    disabled: false,
    href: defHref
  }
  const parseBtn = function (btn, defBtn) {
    if (typeof btn === 'string') {
      btn = {
        text: btn
      }
    }
    const text = defBtn && this.$t(defBtn.textType)
    return Object.assign({}, defBtn, { text }, btn)
  }

  export default {
    name: COMPONENT_NAME,
    mixins: [visibilityMixin, popupMixin, localeMixin],
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      data:{
      	type:Array,
      	default:()=>[]
      },
      selects:{
      	type:Array,
      	default:()=>[]
      },
      prompt: {
        type: Object,
        default() {
          return {
            value: '',
            placeholder: ''
          }
        }
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      select:{
      	type:Array,
      	default(){
      		return ['1','2','3','4']
      	}
      },
      content: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: false
      },
      confirmBtn: {
        type: [Object, String],
        default() {
          return {
            ...defConfirmBtn
          }
        }
      },
      cancelBtn: {
        type: [Object, String],
        default() {
          return {
            ...defCancelBtn
          }
        }
      }
    },
    data() {
      return {
        defHref,active:0,
        hasSelects:[],
        promptValue: this.prompt.value
      }
    },
    computed: {
      _confirmBtn() {
        return parseBtn.call(this, this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn() {
        return parseBtn.call(this, this.cancelBtn, defCancelBtn)
      },
      isConfirm() {
        return this.type === 'confirm'
      },
      isSelects(){
      	return this.type === 'selects'
      },
      isSelect(){
      	return this.type === 'select'
      },
      isPrompt() {
        return this.type === 'prompt'
      },
      containerClass() {
        return `pot-dialog-${this.type}`
      }
    },
    watch: {
      'prompt.value': {
        handler: function (newVal) {
          this.promptValue = newVal
        }
      }
    },
    methods: {
    	onSelects(index){
    		var i=this.hasSelects.indexOf(index)
    		if(i==-1){
    			this.hasSelects.push(index);
    		}else{
    			this.hasSelects.splice(i,1);
    		}
    	},
      maskClick(e) {
        this.maskClosable && this.cancel(e)
      },
      confirm(e) {
        if (this._confirmBtn.disabled) {
          return
        }
        this.hide();
        if(this.isSelect){
        	this.$emit(EVENT_CONFIRM, e,this.active)
        }else if(this.isSelects){
        	this.$emit(EVENT_CONFIRM, e,this.hasSelects)
        }else{
        	this.$emit(EVENT_CONFIRM, e, this.promptValue)
        }
      },
      cancel(e) {
        if (this._cancelBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CANCEL, e)
      },
      close(e) {
        this.hide()
        this.$emit(EVENT_CLOSE, e)
      }
    },
    components: {
      potPopup,
      potInput
    }
  }
</script>


