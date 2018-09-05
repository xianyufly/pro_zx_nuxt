<template>
  <div class="el-pagination is-background">
    <button @click="prev" type="button" :disabled="c_current_page==1" class="btn-prev">
      <i class="el-icon el-icon-arrow-left"></i>
    </button>
    <ul class="el-pager">
      <li :class="n.class" v-for="n in pageNum" :key="n.key">
        <a v-if="n.page!=c_current_page&&n.isLink==true" :href="c_url+'?page='+n.page+'&rows='+c_page_size">{{n.page}}</a>
        <a v-if="!n.isLink&&n.class.indexOf('btn-quickprev')!=-1" @click="quickprev">{{n.page}}</a>
        <a v-if="!n.isLink&&n.class.indexOf('btn-quicknext')!=-1" @click="quicknext">{{n.page}}</a>
        <b v-if="n.page==c_current_page" >{{n.page}}</b>
      </li>
    </ul>
    <ul class="el-pager-mobile">
      <li class="number" v-if="c_current_page!=1">
        <b>...</b>
      </li>
      <li class="number active">
        <b>{{c_current_page}}</b>
      </li>
      <li class="number" v-if="c_current_page!=totalPageNum">
        <b>...</b>
      </li>
    </ul>
    <button @click="next" type="button" :disabled="c_current_page==totalPageNum" class="btn-next">
      <i class="el-icon el-icon-arrow-right"></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    "page_size": [String, Number],
    "current_page":[String, Number],
    "total": [String, Number],
    "url": String
  },
  data: function() {
    return {
      c_page_size: parseInt(this.page_size)||10,
      c_total: parseInt(this.total)||0,
      c_url: this.$route.path,
      c_current_page: parseInt(this.current_page)||1,
      c_show_page_num: 5
    };
  },
  computed: {
    totalPageNum(){
      let mod=this.c_total%this.c_page_size
      let num=parseInt(this.c_total/this.c_page_size);
      let totalPage=mod==0?num:num+1;
      return totalPage;
    },
    pageNum:function(){
      let _pageNum=this.totalPageNum;
      let pageNumArray=[];
      if(this.c_total==0){
        return pageNumArray;
      }
      // 首页必填加
      pageNumArray.push({
        page:"1",
        key:1,
        class:"number",
        isLink:true
      })
      //判断是否出现前跨步按钮
      if(this.c_current_page-1>=this.c_show_page_num-1){
        pageNumArray.push({
          page:"...",
          key:-1,
          class:"el-icon btn-quickprev",
          isLink:false
        })
      }
      let start=2;
      let countNum=this.c_show_page_num>_pageNum?_pageNum:this.c_show_page_num;
      let temp=parseInt((countNum-1)/2);
      //计算页数起点
      if(this.c_current_page-temp>1&&this.c_current_page+temp<_pageNum){
        start=this.c_current_page-temp;
      }
      if(this.c_current_page+temp>=_pageNum){
        if(_pageNum-countNum>0){
          start=_pageNum-countNum;
        }
      }
      let pushed_max_num=1;
      if(_pageNum!=1){
        for(let i=0;i<countNum;i++){
          if(start+i<=_pageNum){
            pageNumArray.push({
              page:start+i+"",
              class:"number",
              key:start+i,
              isLink:true
            })
            pushed_max_num=start+i
          }
        }
      }
      //判断是否出现后跨步按钮
      if(_pageNum-this.c_current_page>=(this.c_show_page_num-1)){
        pageNumArray.push({
          page:"...",
          key:-2,
          class:"el-icon btn-quicknext",
          isLink:false
        })
      }
      if(_pageNum!=pushed_max_num){
        //末尾页必填加
        pageNumArray.push({
          page:""+_pageNum,
          class:"number",
          key:_pageNum,
          isLink:true
        })
      }
      for(let item of pageNumArray){
        if(item.page==this.c_current_page){
          item.class="number active";
        }
      }
      return pageNumArray;
    }
  },
  mounted() {
  },
  methods: {
    //页数改变事件
    current_change() {
      this.$emit('current-change', this.c_curent_page)
    },
    //上一页
    prev(){
      if(this.c_current_page-1<=0){
        return;
      }
      window.location.href=this.c_url+'?page='+(this.c_current_page-1)+'&rows='+this.c_page_size;
    },
    //下一页
    next(){
      if(this.c_current_page+1>this.totalPageNum){
        return;
      }
      window.location.href=this.c_url+'?page='+(this.c_current_page+1)+'&rows='+this.c_page_size;
    },
    //快速前翻
    quickprev(){
      if(this.c_current_page-this.c_show_page_num<=0){
        this.c_current_page=1;
      }else{
        this.c_current_page-=this.c_show_page_num;
      }
      window.location.href=this.c_url+'?page='+this.c_current_page+'&rows='+this.c_page_size;
    },
    //快速后翻
    quicknext(){
      if(this.c_current_page+this.c_show_page_num>=this.totalPageNum){
        this.c_current_page=this.totalPageNum;
      }else{
        this.c_current_page+=this.c_show_page_num;
      }
      window.location.href=this.c_url+'?page='+this.c_current_page+'&rows='+this.c_page_size;
    }
  }
}

</script>
<style lang="css">
  @media (max-width: 767px){
    .el-pager{
      display: none;
    }
    .el-pager-mobile{
      display: inline-block !important;
    }
  }
  .el-pager-mobile{
    display: none;
  }
  .el-pager-mobile li {
    vertical-align: top;
    margin: 0;
    display: inline-block;
}
  .el-pager-mobile li {
      padding: 0 4px;
      background: #fff !important;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0 5px;
      background-color: #ffffff !important;
      color: #606266 !important; 
      min-width: 30px;
      border-radius: 2px;
  }
  .el-pager-mobile li:not(.disabled).active {
    background-color: #E67E22 !important;
    color: #fff !important;
  }
  .el-pager a,.el-pager-mobile a
  {
    color: #606266 !important;
    background: #ffffff; 
    width: 100%;
    text-decoration: none !important;
  }
  .el-pager a.active,.el-pager-mobile a.active{
    background: none !important;
    color: #fff !important;
  }
  .el-pager a:hover,.el-pager-mobile a:hover{
    color:#e67e22 !important;
  }
</style>
