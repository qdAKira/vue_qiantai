<template>
  <div class="type-nav">
    <div class="container">
      <!-- 利用事件委派给父元素 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 编程时导航+事件委派 的方式实现路由跳转。事件委派即把子节点的触发事件都委托给父节点 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级，三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//lodash节流引入，最好按需引入(import _ from 'lodash')
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：可以向服务器发送请求
  mounted() {
    //通知vuex发送请求，获取数据，存储到仓库
    this.$store.dispatch("categoryList");
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //对象的写法，右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state,其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标进入修改currentIndex属性

    // changeIndex(index){
    //   //index：鼠标移上某一个一级分类的元素索引值
    //   this.currentIndex = index
    // },
    //throttle最好不要用箭头函数
    changeIndex: throttle(function (index) {
      //index：鼠标移上某一个一级分类的元素索引值
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出事件回调
    leaveIndex() {
      //鼠标移出currentIndex,变为-1
      this.currentIndex = -1;
      //当鼠标移出的时候，让商品分类列表进行隐藏，判断如果是Search路由组件的时候才会执行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      let element = event.target;
      //html中会把大写转为小写
      //获取目前鼠标点击标签的categoryname,category1id,category2id,category3id，
      // 通过四个属性是否存在来判断是否为a标签，以及属于哪一个等级的a标签
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //categoryname存在，表示为a标签
      if (categoryname) {
        //category1id一级a标签
        //整理路由跳转的参数
        let location = { name: "search" }; //跳转路由name
        // console.log(location)
        let query = { categoryName: categoryname }; //路由参数（k-v形式）
        // console.log(query);
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带传递过去
        if(this.$route.params){
        location.params = this.$route.params;
          //整理完参数（location中有query属性）
        location.query = query;
        // console.log(location.query);
        //路由跳转
        this.$router.push(location);
        }
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }

        // .item:hover{
        //   background-color: skyblue;
        // }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
      
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>