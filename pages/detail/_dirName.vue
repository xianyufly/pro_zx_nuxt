<style type="text/css">
#js_content {
  text-align: center !important;
}

#js_content * {
  text-align: center !important;
}

.post_nav {
  padding: 20px;
  background: #ffffff;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.marginRT10 {
  margin-right: 10px;
  margin-top: 10px;
}

.marginRT10 a {
  color: #e6a23c !important;
}

.height-p100 {
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
            <article class="post div-flex clearfix height-p100">
              <div class="featured-media-30p">
                <a :title="article.title" :href="'/detail/'+article.dirName" target="_blank"><img :src="article.faceUrl==''?img_404:article.faceUrl" :alt="article.title"></a>
              </div>
              <div class="div-flex-1" style="margin-left: 10px;">
                <div>
                  <div class="post-head">
                    <h1 class="post-title one-row-ellipsis"><a :title="article.title" :href="'/detail/'+article.dirName" target="_blank" >
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
                        <a :title="tag.text" :href="'/search/a'+tag.tid">{{tag.text}}</a>
                      </el-tag>
                    </div>
                  </div>
                  <div class="bdsharebuttonbox post-content"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a></div>
                 <script >
                  var _script=document.createElement('script');
                    _script.src = 'https://www.17sobt.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
                    _script.setAttribute('rel', 'nofollow');
                  with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(_script)];
                  </script> 
                  <div class="post-content">
                    <span style="color: red; font-size: 12px">说明:请耐心等待数据返回,如果出现下载不了,请刷新页面再次尝试下载</span>
                  </div>
                </div>
                <footer class="post-footer clearfix t-align-right">

                  <a title="预览" :href="'/viewer/'+article.dirName" target="_blank" class="btn btn-default">预览</a>
                  <a title="下载" href="javascript:" @click="downLoad()" target="_blank" style="margin-left: 10px" class="btn btn-default">下载</a>
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
                    <article class="post">
                      <div>
                        <div class="featured-media">
                          <a :href="'/detail/'+article.dirName" :title="article.title"><img :src="article.faceUrl==''?img_404:article.faceUrl" :alt="article.title"></a>
                        </div>
                        <div>
                          <div class="post-head">
                            <h1 class="post-title one-row-ellipsis"><a :title="article.title" :href="'/detail/'+article.dirName" >
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
  head() {
    return {
      title: this.article.title + "_一起搜模板网",
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.kewords },
        { hid: 'description', name: 'description', content: this.article.memo }
      ]
    }
  },
  asyncData({ params }, callback) {
    return artDetail().bootRes_getBootstrapResDetail({
      dirName: params.dirName
    }, function(data) {
      if (data.error = 10000) {
        let keys = data.data["res"].memo.split(" ");
        let result = {
          article: data.data["res"],
          kewords: keys.join(","),
          aboutArticle: data.data["aboutRes"],
          tagList: data.data["tagList"]
        }
        callback(null, result)
      }
    })
  },
  data() {
    return {
      img_404: img_404,
      param: {
        dirName: ""
      },
      article: {
        content: ""
      },
      aboutArticle: [],
      isDownLoad: false,
      tagList: []
    }
  },
  mounted() {
    let _vue = this;
    window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdMiniList": false, "bdPic": "", "bdStyle": "0", "bdSize": "16" }, "share": {}, "image": { "viewList": ["qzone", "weixin", "tsina", "tqq", "renren"], "viewText": "分享到：", "viewSize": "16" }, "selectShare": { "bdContainerClass": null, "bdSelectMiniList": ["qzone", "weixin", "tsina", "tqq", "renren"] } };
  },
  methods: {
    //下载
    downLoad() {
      let _vue = this;
      if (_vue.isDownLoad) {
        _vue.$message('下载中...,请耐心等待');
        return;
      }
      _vue.isDownLoad = true;
      let account_str = this.article.qq
      let file_list = [{
        "pdir_key": this.article.dirKey,
        "file_id": this.article.fileId
      }]
      let param = {
        "file_list": JSON.stringify(file_list),
        "account_str": account_str
      }
      //转化地址
      artDetail().wy_diskFileBatchDownload(param, function(data) {
        if (data.error = 10000) {
          let url = data.data['url'];
          if (url.length > 0) {
            window.location.href = url[0]
            _vue.isDownLoad = false;
          } else {
            _vue.isDownLoad = false;
            _vue.$message('下载错误,请重试');
          }
        }
      })
    }
  }
}

</script>
