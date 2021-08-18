// pages/collect/collect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectionlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 读收藏歌单
    let collectionlist = wx.getStorageSync('collectionlist');
    // console.log(collectionlist)
    that.setData({
      collectionlist: collectionlist
    })
    let musicID = options.id;
    for (let item of collectionlist) {
      if (item.id == musicID) {
        let songInfo = {
          id: musicID,
          name: item.name,
          img: item.PicUrl,
          author: item.author,
        }
        // console.log(songInfo)
        that.setData({
          songInfo: songInfo
        })
      }
    }


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