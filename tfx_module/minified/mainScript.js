function chooseMedia(){audioDevices=[],videoDevices=[];document.getElementById("mediaChooseArea");"undefined"==typeof MediaStreamTrack?(console.log("This browser does not support MediaStreamTrack."),audioDevices.push({id:"default",label:"Default"}),videoDevices.push({id:"default",label:"Default"})):(MediaStreamTrack.getSources(function(e){for(var t=0;t!==e.length;++t){var o=e[t];"audio"===o.kind?(o.label=o.label||"microphone "+(audioDevices.length+1),audioDevices.push(o)):"video"===o.kind&&(o.label=o.label||"camera "+(audioDevices.length+1),videoDevices.push(o))}$("#videodevices").html(" "),$.each(videoDevices,function(e,t){$("#videodevices").append($("<option />").val(t.id).text(t.label))}),$("#audiodevices").html(" "),$.each(audioDevices,function(e,t){$("#audiodevices").append($("<option />").val(t.id).text(t.label))}),localStorage.getItem("selectedAudioDevice")&&$("#audiodevices").val(localStorage.getItem("selectedAudioDevice")),localStorage.getItem("selectedVideoDevice")&&$("#videodevices").val(localStorage.getItem("selectedVideoDevice")),$("#choosemediapopup").dialog({resizable:!1,width:"35%",modal:!0,buttons:{Save:function(){localStorage.setItem("selectedVideoDevice",$("#videodevices").val()),localStorage.setItem("selectedAudioDevice",$("#audiodevices").val()),mediaOptions.audio={optional:[{sourceId:localStorage.getItem("selectedAudioDevice")}]},mediaOptions.video={optional:[{sourceId:localStorage.getItem("selectedVideoDevice")}]},window.navigator.webkitGetUserMedia(mediaOptions,function(e){document.getElementById("localVideo").src=window.URL.createObjectURL(e)},function(){alert("Unable to select this media option.")}),$(this).dialog("close")},Cancel:function(){$(this).dialog("close")}}})}),console.log(" choose Media || Video ->  ",videoDevices," || Audio -> ",audioDevices))}function windowOnload(){function e(e){if(void 0!=gapi.client&&null!=e){DEBUG&&console.log("shorten this URL : ",e);var t="AIzaSyAnPxrh7veHDrDaPjoTRJJV7GoqIoIYgOw";gapi.client.setApiKey(t);var o,n,i=e;gapi.client.load("urlshortener","v1",function(){o=gapi.client.urlshortener.url.insert({resource:{longUrl:i}}),n=o.execute(function(t){t.error?(DEBUG&&console.log("Error: "+t.error.message),localStorage.setItem("shorturl",e),showtooltip(tooltiproomnotifications,"bubbletooltip",e)):(localStorage.setItem("shorturl",t.id),showtooltip(tooltiproomnotifications,"bubbletooltip",t.id))})})}else DEBUG&&console.log(" gapi.client is undefined ")}function t(){if(membersCount=webrtc.webrtc.getPeers().length+1,membersCount>=2)callflag=1,$("#notifications").text(""),l("notificationsDiv"),hidetooltip(tooltiproomnotifications);else if(1==membersCount&&1==callflag){for(x in widgetarray)DEBUG&&console.log(widgetarray[x].type),null!=document.getElementById(widgetarray[x].type)&&y(widgetarray[x].type);callflag=0,s("notificationsDiv"),$("#notifications").text("Your partner has left")}}function o(){n(membersCount,document.getElementById("localVideo"),document.getElementById("remotes").getElementsByTagName("video")[0])}function n(e,t,o){var n=document.getElementById("myCanvas");E=window.innerHeight,B=window.innerWidth,n.height=E,n.width=B,void 0==t&&(t=document.getElementById("localVideo")),void 0==o&&(o=void 0!=document.getElementById("remotes").getElementsByTagName("video")[0]?document.getElementById("remotes").getElementsByTagName("video")[0]:null),membersCount=webrtc.webrtc.getPeers().length+1,i(membersCount,t,o)}function i(e,t,o){DEBUG&&console.log("No of participants: membersCount -> "+membersCount),1==membersCount?(a(t,o,E,B),l("localVideo"),$("#media_settings_btn").removeClass("hidedisplay"),0==callflag?s("notificationsDiv"):1==callflag&&(s("notificationsDiv"),$("#notifications").text("Your partner has left"))):2==membersCount&&(null!=t&&null!=o&&t!=o&&(a(t,o,E,B),s("localVideo")),$("#notifications").text(""),l("notificationsDiv"),$("#media_settings_btn").addClass("hidedisplay"),hidetooltip(tooltiproomnotifications))}function a(e,t,o,n){DEBUG&&console.log("localvideo ",e," remotevideo",t," height ",o,"width ",n);var i=document.getElementById("myCanvas"),a=i.getContext("2d");null!=e&&null==t?(DEBUG&&console.log(" drawing local video on canvas"),clearInterval(I),e.addEventListener("play",r(e,a,n,o))):null!=e&&null!=t&&e!=t&&(DEBUG&&console.log(" drawing remote video on canvas "),clearInterval(I),t.addEventListener("play",r(t,a,n,o)))}function r(e,t,o,n){t.clearRect(0,0,o,n),I=window.setInterval(function(){t.drawImage(e,0,0,o,n)},20)}function s(e){document.getElementById(e).removeAttribute("hidden")}function l(e){document.getElementById(e).hidden=!0}function c(){$.getJSON("../../widgetsmanisfest.json").done(function(e){widgetarray=e,DEBUG&&console.log(" widgestarray ",widgetarray,"||",widgetarray.length)})}function d(e){$("#MessageHistoryBox").text($("#MessageHistoryBox").text()+"\nyou : "+e)}function u(){"unmuted"==document.getElementById("voicemute").value?(document.getElementById("voicemute").value="muted",TFXvoiceoff()):(document.getElementById("voicemute").value="unmuted",TFXvoiceon())}function g(){"unmuted"==document.getElementById("videomute").value?(document.getElementById("videomute").value="muted",TFXvideooff()):(document.getElementById("videomute").value="unmuted",TFXvideoon())}function m(){"unmuted"==document.getElementById("remotes").value?(TFXRemoteVideooff(),document.getElementById("remotes").value="muted"):(TFXRemoteVideoon(),document.getElementById("remotes").value="unmuted")}function p(e,t,o){null!=document.getElementById(e)?(DEBUG&&console.log(" switch between parallel frames "),f(e)):(v(e,t,o),TFXPluginShareFunction(e,t,o))}function v(e,t,o){if(null==document.getElementById(e)){DEBUG&&console.log(" creating the frame "+e),ifrm=document.createElement("IFRAME"),ifrm.setAttribute("id",e),ifrm.setAttribute("frameborder",0);var n;for(n=0;n<widgetarray.length;n++)if(widgetarray[n].plugintype==e){ifrm.className="widget_"+n,"yes"==widgetarray[n].resize||"no"==widgetarray[n].resize;var i="widgets/"+widgetarray[n].path+"/index.html";window.updateWidget(n),$.get(i).done(function(){ifrm.src=i,DEBUG&&console.log(" sucessfully loaded Iframe url : "+ifrm.src)}).fail(function(e){console.log(" Error"+e),ifrm.src="../../src/error/error.html"})}var a=document.getElementById("widget_loader");a.appendChild(ifrm)}f(e)}function f(e){for(x in widgetarray)widgetarray[x].type!=e&&null!=document.getElementById(widgetarray[x].type)?"true"==widgetarray[x].persistance?b(widgetarray[x].type):"false"==widgetarray[x].persistance&&y(widgetarray[x].type):widgetarray[x].type==e&&null!=document.getElementById(widgetarray[x].type)&&(currentframe=widgetarray[x].type,w(widgetarray[x].type))}function h(e){DEBUG&&console.log(" Hide current frame -> leave screen blank");for(x in widgetarray)widgetarray[x].type==e&&null!=document.getElementById(widgetarray[x].type)&&("true"==widgetarray[x].persistance?b(widgetarray[x].type):"false"==widgetarray[x].persistance&&y(widgetarray[x].type));currentframe=""}function w(e){document.getElementById(e).removeAttribute("hidden")}function b(e){document.getElementById(e).hidden=!0}function y(e){var t=window.parent.document.getElementById(e);t.parentNode.removeChild(window.parent.document.getElementById(e))}c(),window.setInterval(MeasureConnectionSpeed,12e4),webrtc=new SimpleWebRTC({localVideoEl:"localVideo",remoteVideosEl:"",autoRequestMedia:!0,debug:!1,detectSpeakingEvents:!1,autoAdjustMic:!1,media:mediaOptions}),DEBUG&&console.log(" Signalling server ",webrtc.config.url),DEBUG&&console.log(" Socketio ",webrtc.config.socketio),DEBUG&&console.log(" ICE  ",webrtc.webrtc.config.peerConnectionConfig.iceServers),membersCount=webrtc.webrtc.getPeers().length+1,webrtc.on("readyToCall",function(){DEBUG&&console.log(" connection established with server --- ")}),document.getElementById("videomute").value="unmuted",document.getElementById("voicemute").value="unmuted",TFXjoinroom=function(){if(room=location.search.substring(1),localStorage.setItem("session","active"),room){webrtc.joinRoom(room);var t="https://tfxserver.above-inc.com/static/tangofxsessionsshare.html?broplugid="+broPlugId+"&roomname="+room;gapi.load("client",function(){DEBUG&&console.log("gapi.client loaded."),e(t)})}membersCount=webrtc.webrtc.getPeers().length+1,n(membersCount,document.getElementById("localVideo"),null)},webrtc.on("joinedRoom",function(){DEBUG&&console.log("Joined Room",room),$("#connectionnotification").text("Joined the session"),membersCount=webrtc.webrtc.getPeers().length+1,1>=membersCount&&($("#notifications").html('<div class="roboto"> <span class="fw-100">Oops!</span> <br/> 	<span class="fw-400">It takes two to Tango</span> <br/> <span class="fw-100-small">Why dont you invite someone</span>  </div>'),LoadshareButtons(room),$("#shareDiv").share({networks:["facebook","googleplus","twitter","email","linkedin","tumblr"]}),s("shareDiv"))}),webrtc.on("RoomTaken",function(){DEBUG&&console.log(" Room is already taken by 2 members"),showtooltip(tooltiproomnotifications,"bubbletooltip","Sorry this session name is already taken")}),webrtc.on("channelMessage",function(e,t,o){"message"==o.type&&$("#MessageHistoryBox").text($("#MessageHistoryBox").text()+"\nother : "+o.message),"plugin"==o.type&&(DEBUG&&console.log("plugin message recived"+o.action),"create"==o.action?(DEBUG&&console.log("Create Plugin  "+o.plugintype),v(o.plugintype,o.dimensionh,o.dimensionw)):"update"==o.action?(DEBUG&&console.log("Update Plugin  "+o.plugintype),updateplugin(o.plugintype,o.content)):"EqualSize"==o.action?(DEBUG&&console.log("EqualSize  Plugin  "+o.plugintype+" || "+o.dimensionh+" "+o.dimensionw),p(o.plugintype,o.dimensionh,o.dimensionw)):"remove"==o.action&&(DEBUG&&console.log("Close Plugin  "+o.plugintype),h(o.plugintype)))}),webrtc.on("videoAdded",function(e,t){var o=document.getElementById("remotes");if(o){var i=document.createElement("div");i.className="videoContainer",i.id="container_"+webrtc.getDomId(t),e.setAttribute("width","200px"),e.setAttribute("height","200px"),e.setAttribute("hidden","true"),e.setAttribute("autoplay","true"),i.appendChild(e),e.onclick=function(){e.style.width=e.videoWidth+"px",e.style.height=e.videoHeight+"px"},o.appendChild(i),membersCount=webrtc.webrtc.getPeers().length+1,DEBUG&&console.log("Peer Added || Memebers count "+membersCount),callflag=1,n(membersCount,document.getElementById("localVideo"),e)}}),webrtc.on("videoRemoved",function(e,t){var o=document.getElementById("remotes"),i=document.getElementById("container_"+webrtc.getDomId(t));o&&i&&(o.removeChild(i),membersCount=webrtc.webrtc.getPeers().length+1,n(membersCount,document.getElementById("localVideo"),null))});setInterval(function(){t()},3e3);TFXgetRoom=function(){return"undefined"!=room&&""!=room?room:location.search.substring(1)},TFXPluginFunction=function(e,t,o){if(null!=document.getElementById(e))if(e==currentframe)h(e,t,o),TFXPluginRemoveFunction(e);else{p(e,t,o);var n={type:"plugin",plugintype:e,dimensionh:t,dimensionw:o,action:"EqualSize"};sendWidgetMessage(n)}else{var n={type:"plugin",plugintype:e,dimensionh:t,dimensionw:o,action:"EqualSize"};sendWidgetMessage(n)}},TFXPluginShareFunction=function(e,t,o){var n={type:"plugin",plugintype:e,dimensionh:t,dimensionw:o,action:"create"};sendWidgetMessage(n)},TFXPluginRemoveFunction=function(e){var t={type:"plugin",plugintype:e,action:"remove"};sendWidgetMessage(t)},TFXvoiceon=function(){webrtc.unmute()},TFXvoiceoff=function(){webrtc.mute()},TFXvideoon=function(){webrtc.resumeVideo()},TFXvideooff=function(){webrtc.pauseVideo()},TFXclose=function(){open(location,"_self").close()},TFXRemoteVideoon=function(){s(document.getElementById("remotes").getElementsByTagName("video")[0].id)},TFXRemoteVideooff=function(){l(document.getElementById("remotes").getElementsByTagName("video")[0].id)},window.addEventListener("resize",o,!1);var B,E,I;TFXlocalVideo=function(e,t){DEBUG&&console.log("TFX Local Video for plugin "+e+" ||  element id "+t);var o=document.getElementById(e).contentWindow.pluginlocalVideo,n=document.createElement("source");n.setAttribute("src",document.getElementById("localVideo").src),o.appendChild(n),o.play()},TFXremoteVideo=function(e,t){DEBUG&&console.log("TFX Remote Video for plugin "+e+" ||  element id "+t);var o=document.getElementById(e).contentWindow.pluginremoteVideo,n=document.createElement("source");n.setAttribute("src",document.getElementById("remotes").getElementsByTagName("video")[0].src),o.appendChild(n),o.play()},TFXlocalStream=function(e,t){var o;"ask"==t?(DEBUG&&console.log(" broplug requested simplewebrtc for stream "),webrtc.pluginRequestStream(e)):(DEBUG&&console.log(" Audio Stream obtained",t),o=t,document.getElementById(e).contentWindow.fetchstream(o))},TFXstats=function(){webrtc.passWebrtcStats()},$("#SendMessage").click(function(){var e=$("#MessageBox").val();sendMessage(e),d(e),$("#MessageBox").val("")}),$("#messageContent").keyup(function(e){13==e.keyCode&&$("#SendMessage").click()}),$("#voicemute").click(function(){DEBUG&&console.log(" Voice Mute "),$("#voicemute").hasClass("audio_btn_Notworking")||($(this).toggleClass("audio_btn_inactive"),u())}),$("#videomute").click(function(){DEBUG&&console.log("video off "),$("#videomute").hasClass("camera_btn_Notworking")||($(this).toggleClass("camera_btn_inactive"),g())}),$("#remotewindow").click(function(){DEBUG&&console.log("remote window "),$(this).toggleClass("btn-style-active"),m()}),$("#manuals").click(function(){DEBUG&&console.log(" Manuals ");var e="https://tfxserver.above-inc.com/static/manuals/src/menu.html";chrome.tabs.create({url:e})}),$(".main_container").show(),$(".widget-panel").animate({left:"-60px"}),$("#widget_toolbar").height(window.innerHeight-42);var S=$(".controls");$(".settings_btn").click(function(){"0px"==S.css("left")?S.animate({left:-1*S.width()+"px"}):S.animate({left:"0px"})}),$("#media_settings_btn").click(function(){$("#videomute").attr("class").indexOf("camera_btn_Notworking")<=0&&$("#voicemute").attr("class").indexOf("audio_btn_Notworking")<=0?chooseMedia():alert("To Choose Media Devices remove media block permissions from Chrome Settings")})}function getWebrtcStats(e){DEBUG&&console.log(" ----statistics-----"),e.getStats(function(t,o){for(var n={audio:{},video:{},results:o},i=0;i<o.length;++i){var a=o[i];if("opus"==a.googCodecName){globalObject.audio.prevBytesSent||(globalObject.audio.prevBytesSent=a.bytesSent);var r=a.bytesSent-globalObject.audio.prevBytesSent;globalObject.audio.prevBytesSent=a.bytesSent;var s=r/1024;n.audio=merge(n.audio,{availableBandwidth:s.toFixed(1),inputLevel:a.audioInputLevel,packetsLost:a.packetsLost,rtt:a.googRtt,packetsSent:a.packetsSent,bytesSent:a.bytesSent})}if("VP8"==a.googCodecName){globalObject.video.prevBytesSent||(globalObject.video.prevBytesSent=a.bytesSent);var r=a.bytesSent-globalObject.video.prevBytesSent;globalObject.video.prevBytesSent=a.bytesSent;var s=r/1024;n.video=merge(n.video,{availableBandwidth:s.toFixed(1),googFrameHeightInput:a.googFrameHeightInput,googFrameWidthInput:a.googFrameWidthInput,googCaptureQueueDelayMsPerS:a.googCaptureQueueDelayMsPerS,rtt:a.googRtt,packetsLost:a.packetsLost,packetsSent:a.packetsSent,googEncodeUsagePercent:a.googEncodeUsagePercent,googCpuLimitedResolution:a.googCpuLimitedResolution,googNacksReceived:a.googNacksReceived,googFrameRateInput:a.googFrameRateInput,googPlisReceived:a.googPlisReceived,googViewLimitedResolution:a.googViewLimitedResolution,googCaptureJitterMs:a.googCaptureJitterMs,googAvgEncodeMs:a.googAvgEncodeMs,googFrameHeightSent:a.googFrameHeightSent,googFrameRateSent:a.googFrameRateSent,googBandwidthLimitedResolution:a.googBandwidthLimitedResolution,googFrameWidthSent:a.googFrameWidthSent,googFirsReceived:a.googFirsReceived,bytesSent:a.bytesSent})}"VideoBwe"==a.type&&(n.video.bandwidth={googActualEncBitrate:a.googActualEncBitrate,googAvailableSendBandwidth:a.googAvailableSendBandwidth,googAvailableReceiveBandwidth:a.googAvailableReceiveBandwidth,googRetransmitBitrate:a.googRetransmitBitrate,googTargetEncBitrate:a.googTargetEncBitrate,googBucketDelay:a.googBucketDelay,googTransmitBitrate:a.googTransmitBitrate}),"googCandidatePair"==a.type&&"true"==a.googActiveConnection&&(n.connectionType={local:{candidateType:a.googLocalCandidateType,ipAddress:a.googLocalAddress},remote:{candidateType:a.googRemoteCandidateType,ipAddress:a.googRemoteAddress},transport:a.googTransportType})}document.getElementById("stats").contentWindow.printStats("audiostats",n.audio),document.getElementById("stats").contentWindow.printStats("videostats",n.video),document.getElementById("stats").contentWindow.printStats("connectionstats",n.connectionType),setTimeout(function(){getWebrtcStats(e)},2e3)})}function merge(e,t){if(e||(e={}),!t)return e;for(var o in t)e[o]=t[o];return e}function sendMessage(e){room&&webrtc.sendControlPackets(e)}function sendWidgetMessage(e){room&&webrtc.sendControlPackets(e)}function sendWidgetContent(e){room&&webrtc.sendControlPackets(e.data)}function updateplugin(e,t){document.getElementById(e).contentWindow.postMessage(t,"*")}function onWebRTCError(e,t){DEBUG&&console.log(" test fail "+JSON.stringify(t)),"PermissionDeniedError"==t.name?(showtooltip(tooltipwebrtcnotifications,"webrtctooltip","Block permisson for webcam acesss."),$("#videomute").removeClass("camera_btn"),$("#videomute").addClass("camera_btn_Notworking"),$("#voicemute").removeClass("audio_btn"),$("#voicemute").addClass("audio_btn_Notworking")):showtooltip(tooltipwebrtcnotifications,"webrtctooltip",t.name),setTimeout(function(){tooltipwebrtcnotifications.hidden="true"},5e3)}function onWebRTCSucess(e,t){DEBUG&&console.log(" test okay for "+e)}function MeasureConnectionSpeed(){function e(){var e=(n-o)/1e3,t=8*downloadSize,i=(t/e).toFixed(2),a=(i/1024).toFixed(2),r=(a/1024).toFixed(2);$("#network").attr("title",r+" Mbps"),2>r?($("#network").attr("class","tango-nav-btn network_btn_inactive"),$("#videomute").hasClass("camera_btn_Notworking")||$("#videomute").hasClass("camera_btn_inactive")?showtooltip(tooltipnetworknotifications,"networktooltip","Low signals."):showtooltip(tooltipnetworknotifications,"networktooltip","Low signals. Turn off video for better performance")):($("#network").attr("class","tango-nav-btn network_btn"),hidetooltip(tooltipnetworknotifications)),DEBUG&&console.log(r+" Mbps<br/>")}function t(){$("#network").attr("class","tango-nav-btn network_btn_unavailable")}DEBUG&&console.log("testing for speed ");var o,n,i=new Image;i.onload=function(){n=(new Date).getTime(),e()},i.onerror=function(e,o){t(),DEBUG&&console.log(e,"||",o)},o=(new Date).getTime();var a="?nnn="+o;i.src=imageAddr+a}function showtooltip(e,t,o){e.setAttribute(t,o),e.removeAttribute("hidden")}function hidetooltip(e){e.hidden="true"}var broPlugId=chrome.runtime.id,room=null,membersCount=0,callflag=0,webrtc,TFXlocalVideo,TFXremoteVideo,TFXlocalStream,TFXremoteStream,TFXvoiceoff,TFXvoiceon,TFXvideooff,TFXvideoon,TFXclose,TFXjoinRoom,TFXPluginFunction,TFXPluginShareFunction,TFXstats,TFXgetRoom,widgetarray=[],currentframe="",finalh,finalw,remoteVideoHandler,mediaOptions={audio:!0,video:!0};""!=localStorage.getItem("selectedVideoDevice")&&(mediaOptions.video={optional:[{sourceId:localStorage.getItem("selectedVideoDevice")}]}),""!=localStorage.getItem("selectedAudioDevice")&&(mediaOptions.audio={optional:[{sourceId:localStorage.getItem("selectedAudioDevice")}]});var audioDevices=[],videoDevices=[],OSName="Unknown OS";-1!=navigator.appVersion.indexOf("Win")&&(OSName="Windows"),-1!=navigator.appVersion.indexOf("Mac")&&(OSName="MacOS"),-1!=navigator.appVersion.indexOf("X11")&&(OSName="UNIX"),-1!=navigator.appVersion.indexOf("Linux")&&(OSName="Linux"),DEBUG&&console.log("Your OS: "+OSName);var globalObject={audio:{},video:{}};window.onunload=window.onbeforeunload=function(){localStorage.setItem("room",""),webrtc.leaveRoom(),localStorage.setItem("session","inactive"),chrome.extension.sendMessage({status:"bye"},function(){})},window.addEventListener("message",sendWidgetContent,!1);var imageAddr="https://tfxserver.above-inc.com/static/tfx1.png",downloadSize=1160471,LoadshareButtons=function(e){DEBUG&&console.log(" Social networking sharing options ");var t=window.document;$.fn.share=function(o){var n={init:function(o){this.share.settings=$.extend({},this.share.defaults,o);var n=(this.share.settings,this.share.settings.networks),a=this.share.settings.theme,r=this.share.settings.orientation,s=this.share.settings.affix,l=this.share.settings.margin,c=this.share.settings.title||$(t).attr("title"),d=this.share.settings.urlToShare||$(location).attr("href"),u="";return $.each($(t).find('meta[name="description"]'),function(e,t){u=$(t).attr("content")}),this.each(function(){var t,o=$(this),g=o.attr("id"),m=encodeURIComponent(d),p=encodeURIComponent(c),v=u.substring(0,250);null!=localStorage.getItem("shorturl")?(p=localStorage.getItem("shorturl"),m=localStorage.getItem("shorturl")):(p="https://tfxserver.above-inc.com/static/tangofxsessionsshare.html?broplugid="+broPlugId+"&roomname="+e,m="https://tfxserver.above-inc.com/static/tangofxsessionsshare.html?broplugid="+broPlugId+"&roomname="+e);for(var f in n)f=n[f],t=i.networkDefs[f].url,t=t.replace("|u|",m).replace("|t|",p).replace("|d|",v).replace("|140|",p.substring(0,130)),$("<a href='"+t+"' title='Share this page on "+f+"' class='pop share-"+a+" share-"+a+"-"+f+"'></a>").appendTo(o);$("#"+g+".share-"+a).css("margin",l),"horizontal"!=r?$("#"+g+" a.share-"+a).css("display","block"):$("#"+g+" a.share-"+a).css("display","inline-block"),"undefined"!=typeof s&&(o.addClass("share-affix"),-1!=s.indexOf("right")?(o.css("left","auto"),o.css("right","0px"),-1!=s.indexOf("center")&&o.css("top","40%")):-1!=s.indexOf("left center")&&o.css("top","40%"),-1!=s.indexOf("bottom")&&(o.css("bottom","0px"),o.css("top","auto"),-1!=s.indexOf("center")&&o.css("left","40%"))),$(".pop").click(function(){return console.log(" $(this).attr('href')",$(this).attr("href")),console.log(" t ",p),window.open($(this).attr("href"),"t","toolbar=0,resizable=1,status=0,width=640,height=528"),!1})})}},i={networkDefs:{facebook:{url:"http://www.facebook.com/share.php?u=|u|"},twitter:{url:"https://twitter.com/share?text=|u|"},linkedin:{url:"http://www.linkedin.com/shareArticle?mini=true&url=|u|&title=|t|&summary=|d|&source=in1.com"},in1:{url:"http://www.in1.com/cast?u=|u|",w:"490",h:"529"},tumblr:{url:"http://www.tumblr.com/share?v=3&u=|u|"},digg:{url:"http://digg.com/submit?url=|u|&title=|t|"},googleplus:{url:"https://plusone.google.com/_/+1/confirm?hl=en&url=|u|"},reddit:{url:"http://reddit.com/submit?url=|u|"},pinterest:{url:"http://pinterest.com/pin/create/button/?url=|u|&media=&description=|d|"},posterous:{url:"http://posterous.com/share?linkto=|u|&title=|t|"},stumbleupon:{url:"http://www.stumbleupon.com/submit?url=|u|&title=|t|"},email:{url:"mailto:?subject=Please%20Join%20the%20Room&body=|t|"}}};return n[o]?n[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?void $.error('Method "'+o+'" does not exist in social plugin'):n.init.apply(this,arguments)},$.fn.share.defaults={networks:["facebook","twitter","linkedin"],theme:"icon",autoShow:!0,margin:"3px",orientation:"horizontal",useIn1:!1},$.fn.share.settings={}};document.getElementById("tooltiproomnotifications").addEventListener("click",function(){window.prompt(" Send this link to your friend , Copy to clipboard: Ctrl+C, Enter",document.getElementById("tooltiproomnotifications").getAttribute("bubbletooltip"))}),window.onerror=function(e,t,o){return alert("Error message: "+e+"\nURL: "+t+"\nLine Number: "+o),window.location.href="index.html",!0};
var app=angular.module("tangofx",["ui.router"]);app.controller("AppController",["$scope","$state","$location",function(e,o,t){e.chatRoom="",e.chatRoomModel="",e.joinClickHandler=function(){""==e.chatRoomModel?alert("Please enter Session"):e.chatRoomModel.indexOf(" ")>0?alert("Please enter 1 word session name"):(e.chatRoom=e.chatRoomModel,window.location.href="?"+e.chatRoomModel+"#/widgets/"+e.chatRoomModel)},e.logoffHandler=function(){e.chatRoom="",e.chatRoomModel="",window.location.href="index.html"},e.resize=function(){var e=$("#localVideo");e.css({width:window.innerWidth+"px",height:window.innerHeight+"px"})},$(window).resize(e.resize),windowOnload(),TFXjoinroom()}]),app.controller("HomeController",["$scope","$sce",function(e,o){e.$parent.chatRoom="",e.$parent.chatRoomModel="",e.$parent.resize()}]),app.controller("WidgetsController",["$scope","widgetData","$location","$stateParams","$sce",function(e,o,t,n,i){e.widgets=o.data,e.currentWidget=-1,document.getElementById("roonnameDiv").removeAttribute("hidden"),e.$parent.chatRoom=n.roomId,e.$parent.myStyle={color:"#fff","font-size":"16px"},window.updateWidget=e.updateWidget=function(o){e.currentWidget=o,e.$apply()},e.linkClickHandler=function(o,t){document.getElementsByClassName("widget_"+t);TFXPluginFunction(o.plugintype,window.innerWidth,window.innerHeight),e.currentWidget=t}}]),app.run(function(e,o){var t;e.$on("$stateChangeStart",function(e,n,i,r,a){t=o.search()}),e.$on("$stateChangeSuccess",function(e,n,i,r,a){o.search(t)})}),app.config(function(e,o,t){e.otherwise("/home"),o.state("home",{url:"/home",templateUrl:"templates/home.html",controller:"HomeController"}).state("widgets",{url:"/widgets/:roomId",templateUrl:"templates/widgets.html",controller:"WidgetsController",resolve:{widgetData:function(e){return e.get("widgetsmanisfest.json").then(function(e){return e})}}})});