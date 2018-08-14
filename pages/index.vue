<style type="text/css" scoped>
</style>
<template>
  <div>
    <section class="content-wrap">
      <div class="container">
        <div class="row">
          <main class="col-md-12 main-content">
            <div class="col-md-4" v-for="article in tableData" :key="article.tid">
              <article class="post" >
                <div>
                  <div class="featured-media">
                    <a :href="'/detail/'+article.dirName" target="_blank"><img :src="article.smallPic==null?img_404:article.smallPic" :alt="article.title"></a>
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
import index from './services/index.js'
import pager from '~/components/pager.vue'
export default {
  components: {
    "v-pager": pager
  },
  layout: 'temp_index',
  asyncData({ params, query }, callback) {
    return index().bootRes_getBootstrapResByPage({
      page: query.page || 1,
      rows: query.rows || 15
    }, function(data) {
      if (data.error = 10000) {
        let result = {
          tableData: data.data["dataRows"],
          totals: data.data["totals"],
          page: query.page || 1,
          rows: query.rows || 15
        }
        callback(null, result)
      }
    })
  },
  data() {
    return {
      img_404:img_404,
      page: 1,
      rows: 15,
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
