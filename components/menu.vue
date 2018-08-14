<style lang="css">
  .m-box{
    position: relative;
  }
  .m-dropdown-menu{
    position: absolute;
    width: 500px;
    right: 0;
    border-top: 2px solid #e1e1e1;
    border-right: 2px solid #e1e1e1;
    border-left: 2px solid #e1e1e1;
    border-bottom: 2px solid #e1e1e1;
    background: #ffffff;
    z-index: 99;
    padding: 30px;
  }
  .m-dropdown-menu ul{
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;

  }
  .m-dropdown-menu ul li{
    float: left;
  }
  .m-dropdown-menu ul li>a{
    color: #505050;
    line-height: 4em;
    display: block;
    padding: 0 21px;
    text-decoration: none;
  }
  .m-dropdown-menu ul li>a:hover{
    color: #e67e22;
  }
  .m-show{
    display: block;
  }

  .m-hide{
    display: none;
  }
</style>
<template>
  <!-- navbar-fixed-top -->
  <nav :class="{'main-navigation':true,'navbar-fixed-top':isFixed}">
    <div class="container">
      <div class="logo div-f-left">
        <!-- start logo -->
        <a class="branding" href="http://www.17sobt.com"><img src="~/assets/images/logo.png" ></a>
        <!-- end logo -->
      </div>
      <div class="row div-f-left">
        <div class="col-sm-12">
          <div class="navbar-header">
            <span class="nav-toggle-button collapsed" data-toggle="collapse" data-target="#main-menu">
              <span class="sr-only">Toggle navigation</span>
            <i class="fa fa-bars"></i>
            </span>
          </div>
          <div class="collapse navbar-collapse m-box" id="main-menu">
            <ul class="menu">
              <li v-for="menu in showMenuArray" :class="{'nav-current':path==menu.href}" :key="menu.code"><a :href="menu.href">{{menu.name}}</a></li>
              <li v-if="hideMenuArray.length!=0" @mouseleave="slipIn" @mouseenter.prevent="slipOut">
                <a href="javascript:void(0)">
                  更多
                  <span v-if="isHide==false" class="glyphicon glyphicon-triangle-top"></span>
                  <span v-if="isHide==true" class="glyphicon glyphicon-triangle-bottom"></span>
                </a>
              </li>
            </ul>
            <div @mouseleave="slipIn" @mouseenter.prevent="slipOut" :class="{'m-dropdown-menu':true,'m-hide':isHide==true,'m-show':isHide==false}">
              <ul class="clearfix">
                <li v-for="menu in hideMenuArray" :key="menu.code"><a :href="menu.href">{{menu.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>
<script>
export default {
    props: {
      menuData:Array
    },
    data: function() {
      return {
        isFixed:false,
        isHide:true,
        //显示菜单数量
        m_showMenuNum:10,
        menuArray: this.menuData||[]
      };
    },
    computed: {
      //找出起始下标
      start_index:function(){
        //找出起始下标
        let sub_index=1;
        if(this.menuArray.length==0){
          return -1;
        }
        for(let menu of this.menuArray){
          if(menu.href==this.path){
            break;
          }
          sub_index=sub_index+1;
        }
        let index=parseInt(this.m_showMenuNum/2);
        let menuLength=this.menuArray.length;
        let start_index=0;
        if(sub_index-index<0){
          start_index=0;
        }else if(sub_index-index>0&&sub_index+index>menuLength){
          start_index=menuLength-this.m_showMenuNum;
          if(start_index<0){
            start_index=0;
          }
        }else{
          start_index=sub_index-index;
        }
        return start_index;
      },
      //计算显示的菜单列表
      showMenuArray:function(){
        let showMenuArray=[];
        let start_index=this.start_index;
        if(this.m_showMenuNum>this.menuArray.length){
          return this.menuArray
        }
        if(start_index==-1){
          return showMenuArray;
        }
        for(let i=start_index;i<this.m_showMenuNum+start_index;i++){
          showMenuArray.push(this.menuArray[i])
        } 
        return showMenuArray;
      },
      //计算隐藏的菜单列表
      hideMenuArray:function(){
        let hideMenuArray=[];
        let menuLength=this.menuArray.length;
        if(this.m_showMenuNum>this.menuArray.length){
          return hideMenuArray
        }
        if(this.m_showMenuNum<menuLength){
          for(let i=0;i<this.start_index;i++){
            hideMenuArray.push(this.menuArray[i]);
          }
          for(let i=this.m_showMenuNum+this.start_index;i<menuLength;i++){
            hideMenuArray.push(this.menuArray[i]);
          }
        }
        //计算出隐藏菜单
        return hideMenuArray;
      },
      //计算选中路径
      path: function() {
        let _vue = this;
        let path = "";
        //截取 第一个"/" 到 第二个"/" 直接的路径
        let pathArray = this.$route.path.split("/");
        if (pathArray.length > 2) {
          path = "/"+pathArray[1] + "/" + pathArray[2] ;
        } else if(pathArray[1]=="") {
          path = "/";
        } else{
           path = "/"+pathArray[1];
        }
        return path;
      }
    },
    mounted() {
      let _vue=this;
      $(window).scroll(function(){
        if($(document).scrollTop()==0){
          _vue.isFixed=false;
        }else{
          _vue.isFixed=true;
        }
      })
    },
    methods: {
      
      slipOut(events){
        this.isHide=false;
      },
      slipIn(events){
        this.isHide=true;
      }
    }
}

</script>

