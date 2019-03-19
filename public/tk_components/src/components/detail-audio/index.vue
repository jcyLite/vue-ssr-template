<style lang="less">
	@import '../../style/variable.less';
	.tk-detail-audio {
		overflow: hidden;
		background: #fff;
		padding-top: 10px;
		padding-bottom: 10px;
		.tk-detail-audio-item {
			float: left;
			margin: 5px;
			border-radius: 2px;
			width: calc(100vw/4 - 10px);
			height: calc(100vw/8 - 10px);
			background:#fcbd3a;
			background-image: url('./audio.png');
			background-size: contain;
			background-repeat: no-repeat;
			>div {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>
<template>
	<div class="tk-detail-audio">
		<div @click="createFile(item.src,item.id)" v-for="item of list" class="tk-detail-audio-item">
		</div>
	</div>
</template>

<script>
	import playAudio from './playAudio.js'
	export default {
		data() {
			return {
				progress: 0,
				showProgress: true
			}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			createFile(src,id) {
				this.playAudio(src)
//				var _this=this;
//				console.log(src);
//				var a=id.substring(0,10)+'.wav';
//				window.resolveLocalFileSystemURL(
//					cordova.file.externalDataDirectory,
//					function(fs) {
//						fs.getFile(
//							a, // 创建的文件名
//							{
//								create: true,
//								exclusive: true
//							},
//							// create：创建新文件，exclusive:文件已存在时抛出异常
//							function(fileEntry) {
//								// 创建成功回调下载方法写入文件
//								_this.downloadFile(fileEntry,src);
//							},
//							function(err) {
//								// 失败回调
//								// 重新读取文件并打开
//								fs.getFile(
//									a, {
//										create:false
//									},
//									function(fileEntry) {
//										// 成功读取文件后调用cordova-plugin-file-opener2插件打开文件
//										alert(fileEntry.nativeURL);
//										_this.playAudio(fileEntry.nativeURL)
//									},
//									function(err) {
//										alert('读取文件失败');
//									}
//								);
//							}
//						);
//					},
//					function(error) {
//						_this.toast('进入文件系统失败！');
//					}
//				);
			},
			playAudio(localSrc){
				playAudio(localSrc)
			},
			downloadFile(fileEntry,src){
				var _this = this;
				let fileTransfer = new FileTransfer();
				fileTransfer.onprogress = function(e) {
					if(e.lengthComputable) {
						let progress = e.loaded / e.total;
						// 显示下载进度
						_this.progress = (progress * 100).toFixed(2);
					}
				};
				fileTransfer.download(
					encodeURI(src), //uri网络下载路径
					fileEntry.toURL(), //文件本地存储路径
					function(entry) {
						// 下载完成执行本地播放
						_this.playAudio(entry.nativeURL)
					},
					function(error) {
						alert('下载失败！');
					}
				);
			},
			preView(fileEntry){
			    // 调用cordova-plugin-file-opener2插件实现用第三方app打开文件
			    console.log(fileEntry.toInternalURL())
			    cordova.plugins.fileOpener2.showOpenWithDialog(
			        // 此处必须填写cdvfile://地址，不然android7.0+会报文件权限错误
			        fileEntry.toInternalURL(), //文件本地地址转cdvfile://地址
			        'wav', //文件类型，这里我是写了一个mime-Type类型合集fileTypeArr来调用 
			        function onSuccess(data) {
			        	console.log(11111)
			        	console.log(fileURL);
			            console.log('成功预览:' + fileURL);
			        },
			        function onError(error) {
			        	console.log(error)
			            alert(
			                '出错！请在' + cordova.file.externalDataDirectory + '目录下查看'
			            );
			        }
			    );
			}
		}
	}
</script>