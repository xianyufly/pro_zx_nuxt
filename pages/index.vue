<style type="text/css" scoped>


</style>
<template>
  <div>
    <!-- <v-menu :menuData="menuData"></v-menu> -->
    <!-- <div class="container">
      <div class="row">
        <header class="main-header col-md-12">
           <el-carousel height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
        </header>         
      </div>
    </div> -->
    <section class="content-wrap">
      <div class="container">
        <div class="row">
          <main class="col-md-8 main-content">
            <article class="post" v-for="article in tableData" :key="article.tid">
              <div class="clearfix div-flex">
                <div class="div-flex-1">
                  <div class="post-head">
                    <h1 class="post-title one-row-ellipsis"><a :href="'/artDetail/'+article.dirName" target="_blank" >
                      {{article.title}}
                    </a></h1>
                  </div>
                  <div class="post-content">
                    <p>{{article.memo}}</p>
                  </div>
                </div>
                <div class="featured-media">
                  <a :href="'/artDetail/'+article.dirName" target="_blank"><img :src="article.smallPic" :alt="article.title"></a>
                </div>
              </div>
              <div class="post-permalink t-align-right">
                <div class="post-meta">
                  <span class="author">来源：<a>{{article.source}}</a></span> •
                  <time class="post-date">{{article.pubDate}}</time>
                </div>
              </div>
              <footer class="post-footer clearfix t-align-right">
                <a :href="'/artDetail/'+article.dirName" target="_blank" class="btn btn-default">阅读全文</a>
              </footer>
            </article>
            <nav class="pagination">
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
import index from './services/index.js'
import pager from '~/components/pager.vue'
export default {
  components: {
    "v-pager": pager
  },
  layout: 'temp_index',
  asyncData({ params, query }, callback) {
    return index().article_getArticleByPage({
      page: query.page || 1,
      rows: query.rows || 5
    }, function(data) {
      if (data.error = 10000) {
        let result = {
          tableData: data.data["dataRows"],
          totals: data.data["totals"],
          page: query.page || 1,
          rows: query.rows || 5
        }
        callback(null, result)
      }
    })
  },
  data() {
    return {
      param: {
        page: 1,
        rows: 5
      },
      page: 1,
      rows: 5,
      tableData: [],
      totals: 0
    }
  },
  mounted() {
    // console.log(this.$store.state)
  },
  methods: {
    handleSizeChange(size) {
      this.param.rows = size;
      this.selectData();
    },
    handleCurrentChange(currentPage) {
      this.param.page = currentPage;
      this.selectData();
    },
    selectData() {
      let _vue = this;
      index().article_getArticleByPage(_vue.param, function(data) {
        if (data.error = 10000) {
          _vue.tableData = data.data["dataRows"]
          _vue.totals = data.data["totals"]
        }
      })
    }
  }
}

</script>
