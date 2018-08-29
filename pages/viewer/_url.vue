<style type="text/css">
  *, *:before, *:after {
  -webkit-box-sizing: inherit !important;
          box-sizing: inherit !important;
  margin: 0;
}
@media (max-width: 767px){
  .hid{
    display: none !important;
  }
}
.hid{
    
}
</style>
<template>
  <div>
    <div id="switcher">
      <div class="center">
        <ul>
          <li class="logoTop" id="sj2"><a :href="article.viewUrl">{{article.title}}</a></li>
          <div id="Device">
            <li class="device-monitor">
              <a href="javascript:">
                <div class="icon-monitor active">
                </div>
              </a>
            </li>
            <li class="device-mobile hid">
              <a href="javascript:">
                <div class="icon-tablet">
                </div>
              </a>
            </li>
            <li class="device-mobile hid">
              <a href="javascript:">
                <div class="icon-mobile-1">
                </div>
              </a>
            </li>
            <li class="device-mobile-2 hid">
              <a href="javascript:">
                <div class="icon-mobile-2">
                </div>
              </a>
            </li>
            <li class="device-mobile-3 hid">
              <a href="javascript:">
                <div class="icon-mobile-3">
                </div>
              </a>
            </li>
          </div>
          <li class="remove_frame"><a :href="article.viewUrl" title="移除框架"></a></li>
        </ul>
      </div>
    </div>
    <div id="iframe-wrap">
      <iframe id="iframe" :src="article.viewUrl" frameborder="0" width="100%"></iframe>
    </div>
  </div>
</template>
<script type="text/javascript">
import artDetail from './services/artDetail.js'
export default {
  head() {
    return {
      title: this.article.title+"预览_一起搜模板网",
      meta: [
        { hid: 'keywords', name: 'keywords', content:"Bootstrap模板,后台模板,前端模板,html5模板,淘宝商城模板" },
        { hid: 'description', name: 'description', content: "免费预览Bootstrap模板,后台模板,前端模板,html5模板,淘宝商城模板" }
      ]
    }
  },
  asyncData({ params }, callback) {
    return artDetail().bootRes_getBootstrapResDetail({
      dirName: params.url
    }, function(data) {
      if (data.error = 10000) {
        let result = {
          article: data.data["res"],
          aboutArticle:data.data["aboutRes"]
        }
        callback(null, result)
      }
    })
  },
  data() {
    return {
      article:{}
    }
  },
  mounted() {
      this.$nextTick(function(){
        var theme_list_open = false;
        $(document).ready(function () {
            function fixHeight() {
                var headerHeight = $("#switcher").height();
                $("#iframe").attr("height", $(window).height() - 54 + "px");
            }
            $(window).resize(function () {
                fixHeight();
            }).resize();

            $('.icon-monitor').addClass('active');

            $(".icon-mobile-3").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width-3');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-mobile-2").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width-2');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-mobile-1").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width');
                $('.icon-tablet,.icon-mobile,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-tablet").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('tablet-width');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-monitor").click(function () {
                $("#by").css("overflow-y", "hidden");
                $('#iframe-wrap').removeClass().addClass('full-width');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });
        });
      })
      
    
  },
  methods: {}
}

</script>
