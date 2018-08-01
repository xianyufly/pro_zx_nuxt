/*
*
* 全局设置菜单数据状态
*
*/
export const state = () => {
  return {
    menuArray:[]
  }
}

export const mutations = {
  //初始化菜单数据
  initMenuData(state, data){
    state.menuArray=data;
  }
}