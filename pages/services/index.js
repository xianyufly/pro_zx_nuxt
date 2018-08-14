import HttpUtil from '~/utils/httpUtil.js'
export default ()=> {
  return {
		bootRes_getBootstrapResByPage(params,callBack){
			HttpUtil().post("bootRes/getBootstrapResByPage",params,callBack);
		}
	}
}