var app=angular.module("tangofx",["ngRoute"]);app.controller("AppController",["$scope","$state","$location",function(e,o,t){e.chatRoom="",e.chatRoomModel="",e.joinClickHandler=function(){""==e.chatRoomModel?alert("Please enter Session"):e.chatRoomModel.indexOf(" ")>0?alert("Please enter 1 word session name"):(e.chatRoom=e.chatRoomModel,window.location.href="?"+e.chatRoomModel+"#/widgets/"+e.chatRoomModel)},e.logoffHandler=function(){e.chatRoom="",e.chatRoomModel="",window.location.href="index.html"},e.resize=function(){var e=$("#localVideo");e.css({width:window.innerWidth+"px",height:window.innerHeight+"px"})},$(window).resize(e.resize),windowOnload(),TFXjoinroom()}]),app.controller("HomeController",["$scope","$sce",function(e,o){e.$parent.chatRoom="",e.$parent.chatRoomModel="",e.$parent.resize()}]),app.controller("WidgetsController",["$scope","widgetData","$location","$stateParams","$sce",function(e,o,t,n,i){e.widgets=o.data,e.currentWidget=-1,document.getElementById("roonnameDiv").removeAttribute("hidden"),e.$parent.chatRoom=n.roomId,e.$parent.myStyle={color:"#fff","font-size":"16px"},window.updateWidget=e.updateWidget=function(o){e.currentWidget=o,e.$apply()},e.linkClickHandler=function(o,t){document.getElementsByClassName("widget_"+t);TFXPluginFunction(o.plugintype,window.innerWidth,window.innerHeight),e.currentWidget=t}}]),app.run(function(e,o){var t;e.$on("$stateChangeStart",function(e,n,i,r,a){t=o.search()}),e.$on("$stateChangeSuccess",function(e,n,i,r,a){o.search(t)})}),app.config(function(e,o,t){e.otherwise("/home"),o.state("home",{url:"/home",templateUrl:"templates/home.html",controller:"HomeController"}).state("widgets",{url:"/widgets/:roomId",templateUrl:"templates/widgets.html",controller:"WidgetsController",resolve:{widgetData:function(e){return e.get("widgetsmanisfest.json").then(function(e){return e})}}})});