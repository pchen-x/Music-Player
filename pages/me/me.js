//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //上面登录
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //下方按钮
    content: [],
    px: [],
    pxopen: false,
    pxshow: false,
    active: true,
    imgUrl: "/叶子主题icon/叶子主题icon/shuye_10 (3).png"
  },
  //事件处理函数 登录有关
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    console.log("start")
    wx.setStorage({
      key: 'collectionlist',
      data:[ {
        id: 1111,
        title: "test",
        author: "test",
        PicUrl: "test"
      }]
    })
    //登录有关
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //按钮有关
    this.setData({
      px: ['主题切换', '收藏']
    })
  },
  //按钮有关
  listpx: function(e) {
    console.log(e);
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        pxshow: false,
        active: true,
        imgUrl: "/叶子主题icon/叶子主题icon/shuye_10 (3).png"
      })
    } else {
      this.setData({
        content: [{
            text: '>主题切换',
            pathText: 'change'
          },
          {
            text: '>收藏',
            pathText: 'collect'
          }
        ],
        pxopen: true,
        pxshow: false,
        active: false,
        imgUrl: "/叶子主题icon/叶子主题icon/shuye_2 (3).png"
      })
    }
    console.log(e.target)
  },

  //登录有关
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})