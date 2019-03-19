// 利用 cordova 播放音频时，要对src进行处理
// 安卓的本地资源需要去掉‘file://’
// ios的线上资源无法利用cordova播放，需下载在本地后，才可播放
import {hndsDirectoryPath,hndsDirectory,myFs} from './file.js';
export default function playAudio(src,id,isOnline){
    var audioPlayObj=new Media(src)
    if (device.platform == "Android") {
        audioPlayObj.play()
    } else {
        audioPlayObj.play({
            numberOfLoops: 1, // 播放循环次数
            audioSrcHandleWhenScreenIsLocked: false // 锁屏时是否播放
        })
    }
}
