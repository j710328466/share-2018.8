var tools = new Object()

// 两个数字相加
tools.sum = function (a, b) {
  console.log(a, b)
}

// var storage = null;
// if (window.localStorage) {              //判断浏览器是否支持localStorage  
//   storage = window.localStorage;
//   storage.setItem("name", "Rick");    //调用setItem方法，存储数据  
//   alert(storage.getItem("name"));     //调用getItem方法，弹框显示 name 为 Rick  
//   storage.removeItem("name");     //调用removeItem方法，移除数据  
//   alert(storage.getItem("name"));   //调用getItem方法，弹框显示 name 为 null  

// }  
export default tools