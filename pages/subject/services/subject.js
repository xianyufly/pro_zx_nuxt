import HttpUtil from '~/utils/httpUtil.js'
export default ()=> {
  return {
		article_getArticleByPage(params,callBack){
			HttpUtil().post("article/getArticleByPage",params,callBack);
		}
	}
}