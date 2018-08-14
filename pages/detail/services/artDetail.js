import HttpUtil from '~/utils/httpUtil.js'

export default ()=> {
	return {
		bootRes_getBootstrapResDetail(params,callBack){
			HttpUtil().post("bootRes/getBootstrapResDetail",params,callBack);
		},
		wy_diskFileBatchDownload(params,callBack){
			HttpUtil().post("wy/diskFileBatchDownload",params,callBack);
		}
	}
	
}