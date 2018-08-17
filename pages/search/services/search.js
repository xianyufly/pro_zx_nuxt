import HttpUtil from '~/utils/httpUtil.js'
export default ()=> {
  return {
		bootRes_searchBootstrapResByParam(params,callBack){
			HttpUtil().post("bootRes/searchBootstrapResByParam",params,callBack);
		}
	}
}