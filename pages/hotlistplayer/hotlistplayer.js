// pages/hotlistplayer/hotlistplayer.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        hotList: [],
        name: "",
        author: "",
        url: "",
        id: ''

      },

      /**
       * 生命周期函数--监听页面加载
       */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    var id1 = this.data.id;

    let that = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/songList?id=' + id1,
      data: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        let data = res.data.data;
        that.setData({
          url: data.coverImgUrl,
          id: data.id,
          author: data.creator.nickname,
          name: data.name,
        })

        let songdata = res.data.data.tracks;
        let arr = []; // 保存筛选后数据
        const array = Array.from(songdata);
        for (let item of array) {
          let obj = {
            id: item.id,
            title: item.name,
            author: item.artists[0].name,
            img: item.album.picUrl
          };
          arr.push(obj);
        }

        that.setData({
          hotList: arr
        })
        wx.setStorage({
          key: 'audioList',
          data: arr,
        })

      },
      fail: function (res) {
        console.log(res)
      },
    })
  }
})

         