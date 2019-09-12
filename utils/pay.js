import api from '../api/api'

const Pay = (urlData, snData, keyData1) => {
    return new Promise((res, ret) => {
        api.post(urlData, {
                [keyData1]: snData
            })
            .then(reslute => {
                var pay = JSON.parse(reslute)
                console.log(pay)
                wx.requestPayment({
                    timeStamp: pay.timeStamp,
                    nonceStr: pay.nonceStr,
                    package: pay.package,
                    signType: pay.signType,
                    paySign: pay.paySign,
                    success: (result) => {
                        console.log(result)
                        res('succ')
                    },
                    fail: () => {
                        console.log('取消订单')
                        res('fail')
                    },
                    complete: () => {}
                });
            })
    })
}

module.exports = {
    Pay
}