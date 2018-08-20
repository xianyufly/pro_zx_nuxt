<style type="text/css" >
#js_content{
  text-align: center !important;
}

#js_content *{
  text-align: center !important;
}

.post_nav {
  padding: 20px;
  background: #ffffff;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}
.marginRT10{
  margin-right: 10px;
  margin-top: 10px;
}
.marginRT10 a{
  color: #e6a23c !important;
}

.height-p100{
  height: 100% !important;
}
</style>
<template>
  <div>
    <aside class="post_nav">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>模板详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </aside>
    <section class="content-wrap">
      <div class="container">
        <div class="row">
          <main class="col-md-12 main-content">
            <article class="post div-flex clearfix height-p100" >
              <div class="featured-media-30p">
                <a :href="'/detail/'+article.dirName" target="_blank"><img :src="article.faceUrl==''?img_404:article.faceUrl" :alt="article.title"></a>
              </div>
              <div class="div-flex-1" style="margin-left: 10px;">
                <div>
                  <div class="post-head">
                    <h1 class="post-title one-row-ellipsis"><a :href="'/detail/'+article.dirName" target="_blank" >
                      {{article.title}}
                    </a></h1>
                  </div>
                  <div class="post-content">
                    <h4>
                      {{article.memo}}
                    </h4>
                  </div>
                  <div class="post-content" v-if="tagList.length!=0">
                    <h4>
                      标签:
                    </h4>
                    <div>
                      <el-tag v-for="tag in tagList" :key="tag.tid" type="warning" class="marginRT10">
                        <a :href="'/search/a'+tag.tid">{{tag.text}}</a>
                      </el-tag>
                    </div>
                  </div>
                </div>
                <footer class="post-footer clearfix t-align-right">
                  <a :href="'/viewer/'+article.dirName" target="_blank" class="btn btn-default">预览</a>
                  <a href="javascript:" @click="downLoad()" target="_blank" style="margin-left: 10px" class="btn btn-default">下载</a>
                </footer>
              </div>
            </article>
          </main>
          <aside class="sidebar col-md-12">
            <div class="about-widget">
              <div class="about-widget-titbox">
                <h4 class="title">你可能喜欢</h4>
              </div>
              <div class="row">
                <div class="container">
                    <div class="col-md-4" v-for="article in aboutArticle" :key="article.tid">
                      <article class="post" >
                        <div>
                          <div class="featured-media">
                            <a :href="'/detail/'+article.dirName"><img :src="article.faceUrl==''?img_404:article.faceUrl" :alt="article.title"></a>
                          </div>
                          <div>
                            <div class="post-head">
                              <h1 class="post-title one-row-ellipsis"><a :href="'/detail/'+article.dirName" >
                                {{article.title}}
                              </a></h1>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                </div>
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
import img_404 from '~/assets/images/404.gif'
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
    return artDetail().bootRes_getBootstrapResDetail({
      dirName: params.dirName
    }, function(data) {
      if (data.error = 10000) {
        let result = {
          article: data.data["res"],
          aboutArticle:data.data["aboutRes"],
          tagList: data.data["tagList"]
        }
        callback(null, result)
      }
    })
  },
  data() {
    return {
      img_404:img_404,
      param: {
        dirName: ""
      },
      article: {
        content: ""
      },
      aboutArticle: [],
      isDownLoad:false,
      tagList:[]
    }
  },
  mounted() {
    let _vue = this;
    // _vue.$nextTick(function() {
    //   //dom已更新
    //   $("#js_content img").lazyload({ effect: "fadeIn", data_attribute: "init" });
    // })

  },
  methods: {
    //下载
    downLoad(){
      let _vue=this;
      if(_vue.isDownLoad){
        _vue.$message('下载中...,请耐心等待');
        return;
      }
      _vue.isDownLoad=true;
      let account_str=this.article.qq
      let file_list=[{
        "pdir_key":this.article.dirKey,
        "file_id":this.article.fileId
      }]
      let param={
        "file_list":JSON.stringify(file_list),
        "account_str":account_str
      }
      //转化地址
      artDetail().wy_diskFileBatchDownload(param,function(data){
          if(data.error=10000){
            let url=data.data['url'];
            if(url.length>0){
              window.location.href=url[0]
              _vue.isDownLoad=false;
            }else{
              _vue.isDownLoad=false;
              _vue.$message('下载错误,请重试');
            }
          }
      }) 
    }
  }
}

</script>
