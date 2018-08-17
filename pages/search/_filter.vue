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
.marginT20{
  margin-top: 20px;
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
.search-box{
  padding: 5px 30px;
}
.search-box .text{
  margin-top: 0;
  padding-bottom: 7px;
  border-bottom: 1px dashed #ebebeb;
  /*margin-bottom: 21px;*/
  position: relative;
}
.tag-normal{
    /* background-color: rgba(64, 158, 255, .1); */
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #909399;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border: 1px solid rgba(64, 158, 255, .2); */
    white-space: nowrap;
}
.no-resource{
  text-align: center;
}
.no-resource img{
  width: 300px;
}
.no-resource .desc{
  color: #e6a23c;
  font-size: 24px;
  line-height:30px;
}
</style>
<template>
  <div>
    <aside class="post_nav">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </aside>
    <section class="content-wrap">
      <div class="container">
        <div class="row">
          <aside class="sidebar col-md-12">
            <div class="about-widget">
              <div class="about-widget-titbox">
                <h4 class="title">搜索条件</h4>
              </div>
              <div class="row">
                <div class="container">
                  <div class="search-box">
                    <div class="text">你的选择:</div>
                    <div>
                      <el-tag @close="clearTag(tag)" v-for="tag in selectTag" :key="tag.tid" closable type="warning" hit size="mini" class="marginRT10">{{tag.text}}</el-tag>
                    </div>
                  </div>
                  <div class="search-box" v-for="tag in tagList" :key="tag.tid">
                    <div class="text">{{tag.text}}:</div>
                    <div>
                      <a onclick="return false;" @click.prevent.stop="search(item)" :href="'/search/'+item.tid" v-for="item in tag.children" :key="item.tid">
                        <span :class='{"tag-normal":item.isActive==false,"marginRT10":true,"el-tag--mini":true,"el-tag el-tag--warning is-hit":item.isActive==true}'>
                          {{item.text}}
                          <i @click.prevent.stop="clearTag(item)" v-if="item.isActive==true" class="el-tag__close el-icon-close"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
            </div>
          </aside>
          <main class="col-md-12 main-content marginT20">
            <div v-if="tableData.length>0" class="col-md-4" v-for="article in tableData" :key="article.tid">
              <article class="post" >
                <div>
                  <div class="featured-media">
                    <a :href="'/detail/'+article.dirName" target="_blank"><img :src="article.faceUrl==''?img_404:article.faceUrl" :alt="article.title"></a>
                  </div>
                  <div>
                    <div class="post-head">
                      <h1 class="post-title one-row-ellipsis"><a :href="'/detail/'+article.dirName" target="_blank" >
                        {{article.title}}
                      </a></h1>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div v-if="tableData.length==0" class="no-resource sidebar">
              <div class="about-widget" style="padding: 20px;">
                <div><img :src="img_404"></div>
                <span class="desc">不存在该类型模板</span>
              </div>
            </div>
            <nav class="pagination col-md-12">
              <v-pager :total="totals" :current_page="page" :page_size="rows">
              </v-pager>
            </nav>
          </main>
          
        </div>
      </div>
    </section>
    <v-scrollTop></v-scrollTop>
  </div>
</template>
<script type="text/javascript">
import img_404 from '~/assets/images/404.gif'
import search from './services/search.js'
import pager from '~/components/pager.vue'
export default {
  components: {
    "v-pager": pager
  },
  layout: 'temp_index',
  head () {
    return {
      title: "一起搜模板网-搜索",
      meta: [
        { hid: 'description', name: 'description', content: "一起搜模板 17搜模板" }
      ]
    }
  },
  asyncData({ params , query}, callback) {
    let zm=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    //计算选中的标签
    function selectTagList(filter,tagList,selectTag){
      //tid 为key
      let tagMap={

      }
      let index=0;
      //把标签弄成Map
      for(let tag of tagList){
        for(let item of tag.children){
          let key=zm[index]+item["tid"];
          tagMap[key]=item
          item["isActive"]=false
          item["tid"]=key;
        }
        index++
      }
      if(filter!=""){
        let filter_temp=filter.split("-");
        //挑选出选中的标签
        for(let t of filter_temp){
          if(tagMap[t]){
            selectTag.push(tagMap[t]);
            tagMap[t]["isActive"]=true;
          }
        }
      }
    }
    return search().bootRes_searchBootstrapResByParam({
      filter: params.filter,
      page: query.page || 1,
      rows: query.rows || 15
    }, function(data) {
      if (data.error = 10000) {
        let result = {
          tableData: data.data["dataRows"],
          totals: data.data["totals"],
          tagList: data.data["tagList"],
          filter: params.filter|| "",
          selectTag: [],
          page: query.page || 1,
          rows: query.rows || 15
        }
        selectTagList(result.filter,result.tagList,result.selectTag);
        callback(null, result)
      }
    })
  },
  data() {
    return {
      img_404:img_404,
      selectTag: [],
      tagList:[]
    }
  },
  mounted() {
    let _vue = this;
    // this.selectTagList()
  },
  methods: {
    clearTag(item){
      let index=0;
      for(let t of this.selectTag){
        if(item.tid==t.tid){
          this.selectTag.splice(index,1)
          break;
        }
        index++
      }
      let filter=[]
      //跳转地址
      for(let tag of this.selectTag){
        filter.push(tag.tid)
      }
      window.location.href="/search/"+filter.join("-");
    },
    search(item){
      for(let t of this.selectTag){
        if(item.tid==t.tid)
          return;
      }
      this.selectTag.push(item);
      let filter=[]
      //跳转地址
      for(let tag of this.selectTag){
        filter.push(tag.tid)
      }
      window.location.href="/search/"+filter.join("-");
     
    }
  }
}

</script>
