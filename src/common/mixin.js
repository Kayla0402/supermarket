//两个组件之间复用代码用混入，不仅方法可以混入，data，components都可以混入

/*混入，定义一个公共的事件，可以多个Vue文件共用，且不会覆盖掉原本Vue文件中的其他的mounted:{}中定义的其他的事件
var mixin = {
  created: function () { console.log(1) }
}
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
*/

export const testMixin = {
  data(){
    return{

    }
  },
  components:{

  },
  mounted() {
    // console.log('混入测试');
  }
}
