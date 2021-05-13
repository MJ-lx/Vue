  // 1:歌曲搜索接口
  //   请求地址:https://autumnfish.cn/search
  //   请求方法:get
  //   请求参数:keywords(查询关键字)
  //   响应内容:歌曲搜索结果

  // 2:歌曲url获取接口
  //   请求地址:https://autumnfish.cn/song/url
  //   请求方法:get
  //   请求参数:id(歌曲id)
  //   响应内容:歌曲url地址
  // 3.歌曲详情获取
  //   请求地址:https://autumnfish.cn/song/detail
  //   请求方法:get
  //   请求参数:ids(歌曲id)
  //   响应内容:歌曲详情(包括封面信息)
  // 4.热门评论获取
  //   请求地址:https://autumnfish.cn/comment/hot?type=0
  //   请求方法:get
  //   请求参数:id(歌曲id,地址中的type固定为0)
  //   响应内容:歌曲的热门评论
  // 5.mv地址获取
  //   请求地址:https://autumnfish.cn/mv/url
  //   请求方法:get
  //   请求参数:id(mvid,为0表示没有mv)
  //   响应内容:mv的地址


var musicPlay = new Vue({
	el:".wrap",
	data:{
		// 查询关键字
		query: "",
		//歌曲列表
		musicList:[],
		musicUrl:"",
		musicImgUrl:"",
		isPlaying:false,
		musicComment:[],
		musicMvUrl:"",
		isShow:false
		
	},
	methods:{
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
		musicPlay:function(id){
			var that = this;
			axios.get("https://autumnfish.cn/song/url?id="+id).then(
			function(response){
				// console.log(response);
				//获取播放的音频
				that.musicUrl = response.data.data[0].url;				
			},
			function(err){
				
			}
			);
			//获取歌曲封面
			axios.get("https://autumnfish.cn/song/detail?ids="+id).then(
			function(response){
				that.musicImgUrl = response.data.songs[0].al.picUrl;
			},
			function(err){
				
			}
			);
			//获取歌曲评论
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id).then(
			
			function(response){
				that.musicComment = response.data.hotComments;
				
			},
			function(err){
				
			}
			);
			that.isPlaying = true;
		},
		play:function(){
			this.isPlaying = true;
		},
		pause:function(){
			this.isPlaying = false;
		},
		getMv:function(mvid){
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(
				function(response){
					// console.log(response);
					that.musicMvUrl = response.data.data.url;
				},
				function(err){
					
				}
			);
			this.isShow = true;
		},
		hide:function(){
			this.musicMvUrl = "";//重置mvUrl使得视频关闭
			this.isShow = false;
		}
	}
});