# Vue



## 音乐播放器

​	运用vue框架进行数据的获取与绑定，实现模拟音乐播放器的效果。

![](\img\音乐播放器结果图.PNG)

### vue网络数据获取

#### axios

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。此处运用axios.get()方法获取网络资源，并将回调函数中返回的数据赋值各相应的变量，从而获得歌曲音频链接、歌曲信息、评论信息等，并同步更新到页面中。

```javascript
searchMusic:function(){
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords="+that.query).then(
			function(response){
				// console.log(response);
				that.musicList = response.data.result.songs;
			},
			function(err){
				
			}
			);
		},
```



