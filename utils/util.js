var treeData = [{
  id: 1,
  name: '地铁',
  children: [{
      parentID: 1,
      name: '1号线',
      children: ['西朗', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公元前', '农讲所', '烈士陵园', '东山口', '杨箕', '体育西路', '体育中心', '广州东站']
    },
    {
      parentID: 1,
      name: '2号线',
      children: ['广州南站', '石壁', '会江', '南浦', '洛溪', '南洲', '东晓南', '江泰路', '昌岗', '江南西', '市二宫', '海珠广场', '公元前', '纪念堂', '越秀公园', '广州火车站', '三元里', '飞翔公园', '白云公园', '白云文化广场', '萧岗']
    },
    {
      parentID: 1,
      name: '3号线',
      children: ['番禺广场', '石桥', '汉溪长隆', '大石', '沥滘', '厦滘', '大塘', '客村', '广州塔', '珠江新城', '体育西路', '石牌桥', '岗顶', '华师', '五山', '天河客运站']
    },
    {
      parentID: 1,
      name: '3号线(北延段)',
      children: []
    }
  ]
}, {
  id: 2,
  name: '区域',
  children: [{
    parentID: 2,
      name: '天河区',
      children: ['西朗', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公元前', '农讲所', '烈士陵园', '东山口', '杨箕', '体育西路', '体育中心', '广州东站']
    },
    {
      parentID: 2,
      name: '海珠区',
      children: ['西朗', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公元前', '农讲所', '烈士陵园', '东山口', '杨箕', '体育西路', '体育中心', '广州东站']
    },
    {
      parentID: 2,
      name: '白云区',
      children: ['西朗', '坑口', '花地湾', '芳村', '黄沙', '长寿路', '陈家祠', '西门口', '公元前', '农讲所', '烈士陵园', '东山口', '杨箕', '体育西路', '体育中心', '广州东站']
    }
  ]
}]

module.exports = {
  treeData: treeData
}






















// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }