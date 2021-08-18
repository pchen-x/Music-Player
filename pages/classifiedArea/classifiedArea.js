// pages/classifiedArea/classifiedArea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null,
    pics: "../../images/ACG1.JPG",
    now: [{
      type: null,
      id: null
    }],
    classify: [{
      type: "乡村",
      id: "560609382",

    },
    {
      type: "民谣",
      id: "518470994",

    },
    {
      type: "爵士",
      id: "2721311087",

    },
    {
      type: "电子",
      id: "935370913",

    },
    {
      type: "说唱",
      id: "777915656",

    },
    {
      type: "摇滚",
      id: "2376212828",

    },
    {
      type: "纯音乐",
      id: "502442345",

    },
    {
      type: "影视",
      id: "896460125",

    },
    {
      type: "ACG",
      id: "39701136",

    },
    {
      type: "儿童",
      id: "613045129",

    },
    {
      type: "军旅",
      id: "363311434",


    },
    {
      type: "有声书",
      id: "122762652",

    },
    ],
    classifiedList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 传值
    this.setData({
      type: options.type
      // type: 'test'
    })
    // 设置导航标题
    wx.setNavigationBarTitle({
      title: that.data.type,
    })
    // 找当前分类
    wx: for (let item of that.data.classify) {
      if (item.type == options.type) {
        that.data.now = item;
        break;
      }
    }
    let obj = {
      "乡村": "XiangCun",
      '民谣': 'MinYao',
      "爵士": "JueShi",
      "电子": "DianZi",
      "说唱": "ShuoChang",
      "摇滚": "YaoGun",
      "纯音乐": "ChunYinYue",
      "影视": "YingShi",
      "ACG": "ACG",
      "儿童": "ErTong",
      "军旅": "JunLv",
      "有声书": "YouShengShu",
    }
    this.setData({
      pics: obj[options.type] + "1.JPG"
    });
    // 请求数据
    wx.request({
      url: 'https://v1.itooi.cn/netease/songList?id={{that.data.now.id}}',
      data: {
        id: that.data.now.id
      },
      // header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        let allData = res.data.data;
        let arr = []; //保存筛选后数据
        // let get = that.test(allData.tracks);
        // console.log(get);

        // for (let item of data) {
        for (var i = 0; i < 6; i++) {
          // let item = allData.tracks[get[i]];
          let item = allData.tracks[Math.floor(Math.random() * allData.trackCount)];
          // let item = data.tracks[that.rand(data.trackCount)];
          // console.log(item);
          let obj = {
            id: item.id,
            title: item.name,
            author: item.artists[0].name,
            img: item.album.picUrl,
          };
          arr.push(obj);
        }
        that.setData({
          classifiedList: arr
        });
        wx.setStorage({
          key: 'audioList',
          data: arr
        })
      },
      fail: function (res) {
        console.error("数据载入错误")
      },
      complete: function (res) { },
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

  },
  // 随机数生成
  rand: function (max) {

    let that = this;
    let ran = Math.random() * max;
    ran = Math.floor(ran);
    let arr = this.data.a;
    console.log(arr);
    for (let item of arr) {
      if (item == ran) {
        ran = that.rand(max);
        // console.log("fuck");
      }

    }
    arr.push(ran);
    this.setData({
      a: arr
    })
    return ran;
    // let data = that.test(10);
    // that.setData({
    // arr: data
    // })
  },

  test: function (max) {
    let arr = [];
    let arrLen = 6;
    let is = true;
    while (is) {
      let randNum = Math.floor == (Math.random() * max);
      if (!arr.includes(randNum)) {
        arr.push(randNum);
        if (arr.length == arrLen) {
          return arr;
        }
      }
    }
  }


})