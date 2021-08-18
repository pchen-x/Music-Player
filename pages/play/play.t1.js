// pages/play/play.js
var util = require('../../utils/util.js')
const audioManger = wx.getBackgroundAudioManager()
var curr = 0   //当前播放第几首个
var count = 0  //当前共有多少首歌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider_value: 0,
    audio_length: 0,
    name: "",
    author: "",
    now_time: "",
    total: "",
    shoucang: "../../images/收藏.png",
    top_img: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.showToast({
      title: '一些VIP歌曲可能无法播放',
      icon: 'none',
      // image:"/images/感叹号.PNG",
      duration: 2000
    })
    var that = this
    var id = parseInt(options.id)

    let song_info = wx.getStorageSync('songs')
    let i = 0
    for (let item of song_info) {
      if (item.id == id) {
        curr = i
      }
      i += 1
    }
    //设置当前歌曲
    //  count += 1
    count = song_info.length

    //付费歌曲无法播放
    //设置播放器
    console.log(song_info[curr])
    audioManger.title = song_info[curr].title
    // audioManger .epname = song_info.author
    audioManger.singer = song_info[curr].author
    audioManger.coverImgUrl = song_info[curr].PicUrl
    // 设置了 src 之后会自动播放
    // audioManger.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // let songmid = "003q3roO4UY77L"
    // let addr = 'http://ws.stream.qqmusic.qq.com/C100'+songmid+'.m4a?fromtag=0&guid=126548448'
    audioManger.src = "https://v1.itooi.cn/netease/url?id=" + song_info[curr].id
    // 检查歌曲是否被收藏

    this.setData({
      // audio_length:all,
      author: song_info[curr].author,
      name: song_info[curr].title,
      playicon: "../../images/播放器-暂停_44.png",
      shoucang: "../../images/收藏.png",
      top_img: song_info[curr].PicUrl
    })
    let cl = wx.getStorageSync("collectionlist")
    for (let item of cl) {
      if (item.title == that.data.name) {
        {
          console.log("已收藏")
          that.setData({
            shoucang: "../../images/收藏后.png"
          })
        }
      }
    }
    //实时更新进度条
    console.log(audioManger.src)
    audioManger.onTimeUpdate(function () {
      let all = audioManger.duration
      console.log(all)
      let t_t = util.num2time(all)
      let curr = audioManger.currentTime
      let per = (audioManger.currentTime) / (audioManger.duration) * 100
      let t = util.num2time(curr)
      that.setData({
        audio_length: all,
        total: t_t,
        slider_value: per,
        now_time: t
      })
    })            //song_info[curr].title

    // let badthing = song_info[curr].author +"\nVIP歌曲不可播放"
    // let badthing = "VIP歌曲不可播放\n"+that.data.name
    //  if(typeof(audioManger.duration) == "undefined"){
    //    console.log(badthing)
    //    that.setData({
    //     name:badthing
    //    })
    //  }
  },
  //拖动进度条
  listenerSlider: function (e) {
    //获取滑动后的值
    console.log(e.detail.value);
    var per = e.detail.value / 100;
    var long = per * this.data.audio_length;//选取的长度
    long = parseInt(long)
    console.log(long)
    var now = util.num2time(long)
    console.log(now)
    this.setData({
      now_time: now //util.formatSeconds(long)
    })
    audioManger.seek(long);//通过滑块控制音频进度
  },
  //滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current })
  },

  // 点击tab切换 
  swichNav: function (e) {
    var that = this
    console.log(this.data.currentTab)
    console.log(e.currentTarget.dataset.current) //currentTarget.dataset
    if (this.data.currentTab == e.currentTarget.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }

  },
  //切换播放状态
  changemusicplaystate: function () {
    // play= "../../image/play.png"
    // pauseicon= "../../image/play2.png"
    var that = this
    if (!audioManger.paused) {
      //暂停
      audioManger.pause()
      that.setData({
        playicon: "../../images/播放器-播放_44.png"
      })
    }
    else {
      audioManger.play()
      that.setData({
        playicon: "../../images/播放器-暂停_44.png"
      })
    }
  },
  // 上一首
  formersong: function () {
    let that = this
    if (!audioManger.paused)
      audioManger.pause()
    let pos = 0
    if (curr == 0) {
      pos = count - 1
    } else {
      pos = (curr - 1) % count
    }

    let song_info = wx.getStorageSync("songs")[pos]
    // audioManger.src =
    audioManger.title = song_info.title
    // audioManger.author = song_info.author
    // audioManger.coverImgUrl = song_info.img 
    audioManger.src = "https://v1.itooi.cn/netease/url?id=" + song_info.id
    // audioManger.play()
    this.setData({
      author: song_info.author,
      name: song_info.title,
      top_img: song_info.PicUrl,
      playicon: "../../images/播放器-暂停_44.png",
      shoucang: "../../images/收藏.png"
      // playicon: "../../images/播放器-暂停_44.png"
    })
    let songs = wx.getStorageSync("collectionlist")
    for (let item of songs) {
      if (item.title == that.data.name) {
        {
          console.log("已收藏")
          that.setData({
            shoucang: "../../images/收藏后.png"
          })
        }
      }
    }
    //实时更新进度条
    //  let that= this
    //  audioManger.onTimeUpdate(function () {
    //   let all = audioManger.duration
    //   console.log(all)
    //   let t_t = util.num2time(all)
    //   let curr = audioManger.currentTime
    //   let per = (audioManger.currentTime)/(audioManger.duration)*100
    //   let t = util.num2time(curr)
    //   that.setData({
    //     audio_length:all,
    //     total:t_t,
    //     slider_value:per,
    //     now_time:t
    //   })
    // })
    curr = pos
    // let badthing = that.data.author +"\nVIP歌曲不可播放"
    // let badthing = "VIP歌曲不可播放\n"+that.data.name
    // if(typeof(audioManger.duration) == "undefined"){
    //   that.setData({
    //     name:badthing
    //   })
    // }
  },
  //下一首
  nextsong: function () {
    let that = this
    if (!audioManger.paused)
      audioManger.pause()
    let pos = 0
    if (curr == (count - 1)) {
      pos = 0
    } else {
      pos = (curr + 1) % count
    }
    // console.log(pos)
    // console.log(curr)
    // let songs =     let songs = wx.getStorageSync("collectionlist")
    let song_info = wx.getStorageSync("songs")[pos]
    // audioManger.src = 
    audioManger.title = song_info.title

    audioManger.src = "https://v1.itooi.cn/netease/url?id=" + song_info.id

    this.setData({
      author: song_info.author,
      name: song_info.title,
      top_img: song_info.PicUrl,
      playicon: "../../images/播放器-暂停_44.png",
      shoucang: "../../images/收藏.png"
      // playicon: "../../images/播放器-暂停_44.png"
    })
    let songs = wx.getStorageSync("collectionlist")
    for (let item of songs) {
      if (item.title == that.data.name) {
        {
          console.log("已收藏")
          that.setData({
            shoucang: "../../images/收藏后.png"
          })
        }
      }
    }
    //实时更新进度条
    //  let that= this
    curr = pos

  },
  //处理点击收藏按钮
  toMyCollect: function () {
    var that = this
    let cl = wx.getStorageSync("collectionlist")
    let isClollect = false
    let index_item = 0
    for (let item of cl) {
      if (item.title == that.data.name) {
        {
          console.log("已收藏，将取消收藏")
          isClollect = true
          that.setData({
            shoucang: "../../images/收藏.png"
          })
          return
        }
      }
      index_item += 1
    }
    if (!isClollect) {
      //没被收藏
      let song_info = wx.getStorageSync('songs')[curr]
      cl.push(song_info)
    } else {
      // cl.slice(index_item)
      let temp = cl[cl.length - 1]
      cl[cl.length - 1] = cl[index_item]
      cl[index_item = temp]
      cl.pop()
      return
    }
    wx.setStorage({
      key: 'collectionlist',
      data: cl,
    })
    that.setData({
      shoucang: "../../images/收藏后.png"
    })
  },
  //点击歌曲列表的事项
  shoSongs: function () {
    var that = this
    let songs = ["Now " + this.data.author + " " + this.data.name]
    let song_info = wx.getStorageSync('songs')
    // let have_now = false
    // console.log(song_info)
    let i = 1
    for (let item of song_info) {
      //小程序限制为6
      if (i >= 5) {
        break
      }
      if (item.author == that.data.author) {
        // console.log(item.author)
        // console.log(that.data.author)
        // songs.push("Now: "+ song_info[i].author +" "+song_info[i].title)
        continue
      } else {
        console.log(i)
        songs.push(item.author + " " + item.title)
      }
      i += 0
    }
    songs = songs.slice(0, 6)

    wx.showActionSheet({
      itemList: songs,
      success: function (res) {
        console.log(songs[res.tapIndex])
        //切换到点击的歌曲
        let click_song = song_info[res.tapIndex + 1]

        audioManger.src = "https://v1.itooi.cn/netease/url?id=" + click_song.id
        let badthing = click_song.name
        if (typeof (audioManger.duration) == "undefined") {
          badthing = "VIP歌曲不可播放\n" + click_song.name
        }
        that.setData({
          name: badthing,
          title: click_song.title,
          top_img: song_info.PicUrl
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    if (!audioManger.paused) {
      audioManger.pause()
      that.setData({
        playicon: "../../images/播放器-播放_44.png"
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})