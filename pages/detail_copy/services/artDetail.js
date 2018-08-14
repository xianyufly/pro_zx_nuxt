import HttpUtil from '~/utils/httpUtil.js'

export default ()=> {
	return {
		article_getArticleDetail(params,callBack){
			HttpUtil().post("article/getArticleDetail",params,callBack);
		},
		wy_diskFileBatchDownload(params,callBack){
			HttpUtil().post("wy/diskFileBatchDownload",params,callBack);
		}
	}
	
}