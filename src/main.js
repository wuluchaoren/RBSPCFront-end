// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AxiosPlugin from './AxiosPlugin'

Vue.use(iView);
Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
Vue.use(AxiosPlugin)
Vue.prototype.$downloadFile = (filename, data) => {
  if (!data) return;
  let arr8 = Uint8Array.from(data); //！！！注意1：应根据数据的类型选择适当的JS原生数组类型进行转换，也就是说服务端推送的byte型数组还是int型数组等。
  //定义文件内容，类型必须为Blob 否则createObjectURL会报错
  let blob = null;
  let type = 'application/octet-binary';
  if (typeof (window.Blob) == "function") {
    blob = new Blob([arr8], {//！！！注意2：数组两边必须加上[]
      type: type
    });
  } else {
    let BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    let bb = new BlobBuilder();
    bb.append([arr8]);
    blob = bb.getBlob(type);
  }
  let URL = window.URL || window.webkitURL;
  let bloburl = URL.createObjectURL(blob);
  let anchor = document.createElement("a");
  if ('download' in anchor) {
    anchor.style.visibility = "hidden";
    anchor.href = bloburl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    let evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    location.href = bloburl;
  } //移除链接释放资源
};

router.beforeEach((to, from, next) => {
  console.log("检查令牌");
  if (localStorage.token !== '' && localStorage != null) {
    console.log("检查令牌通过");
    axios.defaults.headers['Authorization'] = localStorage.getItem('token')
    next();
  } else {
    console.log("检查令牌未通过");
    if (to.path === '/PC/PClogin') {
      next();
    } else {
      next('/PC/PClogin')
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
    axios.defaults.baseURL='http://119.29.24.35:8001'
    // axios.defaults.baseURL='http://gscawv.natappfree.cc'
    // axios.defaults.baseURL='http://192.168.0.163:8080'
  },

  components: { App },
  template: '<App/>'
})
