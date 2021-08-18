// pages/req3/req32.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/songList?id=2829733864', //歌单获取网页url
      data: '', //创建一个空的data用于储存数据
      method: 'GET', //获取数据的方式
      dataType: 'json', //获取的数据的类型
      responseType: 'text', //返回的类型为Type
      success: function (res) { //如果获取成功
        console.log(res);
        console.log(res.data);
        var data = res.data.data.tracks;
        var arr = []; //保存筛选后的数据
        for (var item of data) {
          let obj = {
            title: item.name,//曲名
            id: item.id,//ID
            author: item.artists[0].name,//歌单不同具体的位置不同，需要通过data检索后才能获取
            picUrl: item.album.blurPicUrl//封面
          };
          arr.push(obj); //将数据传入到obj内
          that.setData({
            audioList: arr
          })
        }

        wx.setStorage({
          key: 'audioList',
          data: arr,
        })
      },
      fail: function (res) {
        console.log(res)
      },
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