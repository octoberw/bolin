// const app = getApp();

// const login = () => {
//     return new Promise((resolve, reject) => {
//         let en_iv = wx.getStorageSync("ENCRYPTEDDATA_IV"); // 获取授权信息
//         let token = wx.getStorageSync("TOKEN");

//         wx.getSetting({
//             success: res => {

//                 if (res.authSetting['scope.userInfo']) { // 授权成功
//                     wx.login({
//                         success: (result) => {

//                             // wx.getSetting({
//                             //     success: res => {
//                             //         if (res.authSetting['scope.userInfo']) {
//                             //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//                             //             wx.getUserInfo({
//                             //                 success: res => {
//                             //                     // 可以将 res 发送给后台解码出 unionId
//                             //                     wx.setStorage({
//                             //                         key: 'USER_INFO',
//                             //                         data: {
//                             //                             userInfo: res.userInfo,
//                             //                         }
//                             //                     });
//                             //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//                             //                     // 所以此处加入 callback 以防止这种情况
//                             //                     // if (this.userInfoReadyCallback) {
//                             //                     //   this.userInfoReadyCallback(res)
//                             //                     // }
//                             //                 }
//                             //             })
//                             //         }
//                             //     }
//                             // })

//                             // 判断是否有token
//                             if (token) {
//                                 // 如果有token，就请求判断token是否过期的接口
//                                 wx.request({
//                                     url: `${app.globalData.host}/wechat/root/time.htm`,
//                                     data: {
//                                         'token': token.token
//                                     },
//                                     header: {
//                                         'content-type': 'application/x-www-form-urlencoded'
//                                     },
//                                     method: 'POST',
//                                     success: (result) => {
//                                         var isValidity = result.data.data.isValidity
//                                         if (!isValidity) {
//                                             console.log(isValidity)
//                                             console.log('token过期的时候')
//                                             wx.login({
//                                                 success: (resultaa) => {
//                                                     wx.request({
//                                                         url: `${app.globalData.host}/wechat/root/login.htm`,
//                                                         data: {
//                                                             'code': resultaa.code,
//                                                             'encryptedData': en_iv.encryptedData,
//                                                             'ivStr': en_iv.iv
//                                                         },
//                                                         header: {
//                                                             'content-type': 'application/x-www-form-urlencoded'
//                                                         },
//                                                         method: 'POST',
//                                                         success: (result) => {
//                                                             if (result.data.code === 0) {
//                                                                 wx.setStorage({
//                                                                     key: 'LOGIN',
//                                                                     data: {
//                                                                         id: result.data.data.id,
//                                                                     }
//                                                                 });
//                                                                 wx.setStorage({
//                                                                     key: 'TOKEN',
//                                                                     data: {
//                                                                         token: result.data.data.token,
//                                                                     }
//                                                                 });
//                                                                 // 成功之后 promise 返回 token
//                                                                 resolve(result.data.data)
//                                                             } else {
//                                                                 console.log('result.data.code!=0,报错！！！')
//                                                             }
//                                                         }
//                                                     });
//                                                 },
//                                             });
//                                         } else {
//                                             resolve() // 如果isValidity没有过期就直接调请求接口
//                                         }
//                                     },
//                                 });
//                                 // 判断token是否过期，如果过期就重新登陆

//                             } else { // 若果没有token就登陆
//                                 console.log('没有token就登陆')
//                                 wx.request({
//                                     url: `${app.globalData.host}/wechat/root/login.htm`,
//                                     data: {
//                                         'code': result.code,
//                                         'encryptedData': en_iv.encryptedData,
//                                         'ivStr': en_iv.iv
//                                     },
//                                     header: {
//                                         'content-type': 'application/x-www-form-urlencoded'
//                                     },
//                                     method: 'POST',
//                                     success: (result) => {
//                                         console.log('api.js', result.data)
//                                         if (result.data.code === 0) {
//                                             wx.setStorage({
//                                                 key: 'LOGIN',
//                                                 data: {
//                                                     id: result.data.data.id,
//                                                 }
//                                             });
//                                             wx.setStorage({
//                                                 key: 'TOKEN',
//                                                 data: {
//                                                     token: result.data.data.token,
//                                                 }
//                                             });
//                                             // 成功之后 promise 返回 token
//                                             resolve(result.data.data)

//                                         } else {
//                                             console.log('result.data.code!=0,报错！！！')
//                                         }
//                                     }
//                                 });
//                             }

//                         }
//                     });

//                 } else if (res.authSetting['scope.userInfo'] === false) { //拒绝授权
//                     console.log('拒绝授权1')
//                     wx.navigateTo({
//                         url: '/pages/homeLogin/homeLogin',
//                     });
//                 } else {
//                     console.log('拒绝授权2')
//                     wx.navigateTo({ // 第一次加载没有授权得情况
//                         url: '/pages/homeLogin/homeLogin',
//                     });
//                 }
//             }
//         })
//     })
// }

// module.exports = {
//     // login
// }