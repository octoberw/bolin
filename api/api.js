const app = getApp();
import login from './login'

const request = (url, options) => {
    let token = wx.getStorageSync("TOKEN");
    return new Promise((resolve, reject) => {
        login.login()
            .then((resToken) => {
                wx.showLoading({
                    title: '加载中...',
                    mask: true,
                });
                wx.request({
                    url: `${app.globalData.host}${url}`,
                    data: options.method === 'GET' ? options.data : (options.data),
                    header: {
                        'content-type': "application/x-www-form-urlencoded",
                        'token': token.token
                    },
                    method: options.method,
                    // 请求成功的回调
                    success: (res) => {
                        //请求成功 但是拿不到数据的回调
                        if (res.data.code === 0) {
                            resolve(res.data.data)
                            wx.hideLoading();
                        } else {
                            reject(res.data.errmsg)
                        }
                    },
                    // 请求失败的回调
                    fail: (err) => {
                        reject(err)
                    },
                });
            })
            // 处理到的异常拿到的数据  是请求接口成功，但是拿不到数据的情况
            .catch(res => {
                wx.showToast({
                    title: res,
                    icon: 'none',
                    duration: 1500,
                });
            })
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