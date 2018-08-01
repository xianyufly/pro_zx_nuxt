import Vue from 'vue'
//Element
import ElementUI from 'element-ui'
//组件
import Components from '~/components/'

export default () => {
	//动态挂载组件
	Object.keys(Components).forEach((key) => {
	  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
	  Vue.component(`v${name}`, Components[key])
	})
  	Vue.use(ElementUI)
}



