const app = getApp();
var req = true

const request = (url, options) => {
    let token = wx.getStorageSync("TOKEN");
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中...',
            mask: true,
        });
        wx.request({
            url: `${app.globalData.host}${url}`,
            data: options.method === 'GET' ? options.data : (options.data),
            header: {
                'content-type': "application/x-www-form-urlencoded",
                'token': token.token ? token.token : ''
            },
            method: options.method,
            // 请求成功的回调
            success: (res) => {
                //请求成功 但是拿不到数据的回调
                if (res.data.code === 0) {
                    resolve(res.data.data)
                    wx.hideLoading();
                } else if (res.data.code === 2) {
                    wx.hideLoading();
                    // reject(res.data.errmsg)
                    if(req) {
                        req = false
                        setTimeout(() => {
                            req = true
                        }, 600);
                        wx.navigateTo({ // 第一次加载没有授权得情况
                            url: '/pages/homeLogin/homeLogin',
                        });
                    }
                } else if(res.data.code === 4) {
                    console.log(res.data.errmsg)
                    return
                    // wx.showToast({
                    //     title: res.data.errmsg,
                    //     icon: 'none',
                    //     duration: 1500,
                    // });
                    // reject(res.data.errmsg)
                } else {
                    console.log(res.data.errmsg)
                    return
                }
            },
            // 请求失败的回调
            fail: (err) => {
                wx.showToast({
                    title: err,
                    icon: 'none',
                    duration: 1500,
                });
            },
        });
    })
}

const get = (url, options) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}

const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}

const remove = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

module.exports = {
    get,
    post,
    put,
    remove
}