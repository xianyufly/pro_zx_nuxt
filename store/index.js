import Vue from 'vue'
import common from '~/utils/services/common.js'
// global actions
export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { params, route, req }) {
    //初始化store数据
    const initAppData = [
      store.dispatch('initMenuData')
    ]
    return Promise.all(initAppData)
  },
  //初始化菜单数据
  initMenuData({ commit }) {
    let menuArray = [{
        code: "sy",
        name: "首页",
        href: "/"
      },{
        code: "ss",
        name: "搜索",
        href: "/search"
      }];
    commit("menu/initMenuData",menuArray)
    // return common().subject_getSubjectList({

    // }, function(data) {
    //   if (data.error = 10000) {
    //     let subjects = data.data["subjects"];
    //     let menuArray = [{
    //         code: "sy",
    //         name: "首页",
    //         href: "/"
    //       },{
    //         code: "ss",
    //         name: "搜索",
    //         href: "/search"
    //       }];
    //     // for (let subject of subjects) {
    //     //     menuArray.push({
    //     //       code:subject.subCode,
    //     //       name:subject.subName,
    //     //       href:"/subject/"+subject.subCode
    //     //     })
    //     // }
    //     commit("menu/initMenuData",menuArray)
    //   }
    // })
  }
}
