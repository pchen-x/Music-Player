// pages/hotlist/hotlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/songList/hot',
      data: '',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
        let data = res.data.data;
        let arr = []; // 保存筛选后数据

        const array = Array.from(data);
        for (let item of array) {
          let obj = {
            id: item.id,
            name: item.name,
            img: item.coverImgUrl
          };
          arr.push(obj);
          that.setData({
            hotList: arr
          })
        }

        wx.setStorage({
          key: 'hotList',
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