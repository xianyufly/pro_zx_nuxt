<style type="text/css" >
#js_content{
  text-align: center;
}

#js_content *{
  text-align: center;
}

</style>
<template>
  <div>
    <!-- <v-menu></v-menu> -->
    <section class="content-wrap">
      <div class="container">
        <div class="row">
          <main class="col-md-12 main-content">
            <article class="post tag-about-ghost tag-release">
              <header class="post-head">
                <h1 class="post-title">{{article.title}}</h1>
                <section class="post-meta">
                  <span class="author">来源：<a >{{article.source}}</a></span> •
                  <time class="post-date">{{article.pubDate}}</time>
                </section>
              </header>
              <br/>
              <div v-html="article.content">
              </div>
            </article>
          </main>
          <aside class="sidebar col-md-8">
            <div class="widget">
              <h4 class="title">相关推荐</h4>
              <div class="content community">
                <p v-for="item in aboutArticle" :key="item.tid"><a :href="'/artDetail/'+item.dirName" :title="item.title"> {{item.title}}</a></p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <v-scrollTop></v-scrollTop>
  </div>
</template>
<script type="text/javascript">
import artDetail from './services/artDetail.js'
export default {
  layout: 'temp_index',
  head () {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: this.article.memo }
      ]
    }
  },
  asyncData({ params }, callback) {
    function getQueryString(url,name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = url.match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
    function regReplaceStyle(str,funCallback) {
      let file_list_map={};
      let file_list=[];
      let account_str="1187383721"
      str = str.replace(/<img [^>]*data-init=[\'\"]([^\'\"]+)[^>]*>/gi, function(match, capture) {
        var beg = /(<img [^>]*data-init=[\'\"])[^\'\"]+[^>]*>/i;
        var end = /<img [^>]*data-init=[\'\"][^\'\"]+([^>]*>)/i;
        var begA = match.match(beg);
        var endA = match.match(end);
        var url = capture;
        let _temp = getQueryString(url,"account_str");
        if(_temp){
          account_str=_temp
        }
        let pdir_key=getQueryString(url,"pdir_key")
        let file_id=getQueryString(url,"file_id")
        if(pdir_key&&file_id){
          let temp={
            "pdir_key":pdir_key,
            "file_id":file_id
          };
          file_list.push(temp)
          file_list_map[url]=temp
        }
        //替换后的图片地址
        return begA[1] + url + endA[1]
      });
      if(file_list.length==0){
        if(funCallback){
          funCallback(str)
        }
      }else{
        //转化地址
        artDetail().wy_diskFileBatchDownload({
          "file_list":JSON.stringify(file_list),
          "account_str":account_str
        },function(data){
            if(data.error=10000){
              let url=data.data['url'];
              let i=0;
              if(url.length>0){
                for(let key in file_list_map){
                  let reg=new RegExp(key,"g");
                  str=str.replace(key,url[i])
                  str=str.replace(key,url[i])
                  i++;
                }
              }
              if(funCallback)
                  funCallback(str)
              }
        })
      }
      
    }
    return artDetail().article_getArticleDetail({
      dirName: params.dirName
    }, function(data) {
      if (data.error = 10000) {
        let article = data.data["article"];
        article.content = article.content.replace(/data-src/g, "data-init");
        article.content = article.content.replace(/src/g, "_src");
        article.content = article.content.replace(/<iframe [^>]*_src=[\'\"][^\'\"]+[^>]*>/gi,function(match, capture) {
           return match.replace("_src","src");
        });
        function _callback(str){
          article.content=str;
          let result = {
            article: article,
            aboutArticle: data.data["aboutArticle"]
          }
          callback(null, result)
        }
        regReplaceStyle(article.content,_callback)
        
      }
    })
  },
  data() {
    return {
      param: {
        dirName: ""
      },
      article: {
        content: ""
      },
      aboutArticle: []
    }
  },
  mounted() {
    let _vue = this;
    _vue.$nextTick(function() {
      //dom已更新
      console.log($("#js_content img").length)
      $("#js_content img").lazyload({ effect: "fadeIn", data_attribute: "init" });
    })

  },
  methods: {}
}

</script>
