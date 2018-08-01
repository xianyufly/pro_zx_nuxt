import HttpUtil from '~/utils/httpUtil.js'
export default ()=> {
  return {
		subject_getSubjectList(params,callBack){
			HttpUtil().post("subject/getSubjectList",params,callBack);
		}
	}
}