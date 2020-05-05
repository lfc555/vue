const install = function(Vue) {
  //|| 真前假后
  const ajax = function(options = {}) {
    //01 type
    options.type = (options.type || "get").toUpperCase();
    //02 data
    let data = [];
    for (let i in options.data) {
      data.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    data = data.join("&");
    //请求对象
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        const status = xhr.status;
        if (status >= 200 && status < 300) {
          //success 居功 && 假前真后 03
          options.success &&
            options.success(xhr.responseText, xhr.requestXML);
        } else {
          //04
          options.error && options.error(status);
        }
      }
    };
    //
    if (options.type === "GET") {
      //05 url
      xhr.open("get", options.url + "?" + data, true);
      xhr.send(null);
    } else if (options.type === "POST") {
      xhr.open("post", options.url, true);
      xhr.setRequestHeader("Content-Type", "applycation/x-wwww-form-urlencode");
      xhr.send(data);
    }
  };
  Vue.prototype.$Ajax = ajax;
};
//
export default install;
