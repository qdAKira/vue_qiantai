<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台售卖属性面包屑 -->
            <li class="with-x" v-for="(attrsValue,index) in searchParams.props":key="index">
              {{ attrsValue.split(":")[1] }}<i @click="removeAttrsValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!--trademarkInfo前一个用于子组件调用 ，第二个是父组件中调用 -->
        <SearchSelector @trademarkInfo1="trademarkInfo" @attrInfo1="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格排序结构 -->
              <ul class="sui-nav">
                <!-- 这里isOne、isTwo、isAsc、isDesc是计算属性，如果不使用计算属性要在页面中写很长的代码 -->
                <li :class="{active:isOne}"@click="changeOrder('1')">
                   <!-- 阿里图标前置类iconfont -->
                  <a >综合<span v-show="isOne" class="iconfont" :class="{'icon-caret-up':isAsc,'icon-caret-down':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}"@click="changeOrder('2')">
                  <a >价格<span v-show="isTwo" class="iconfont" :class="{'icon-caret-up':isAsc,'icon-caret-down':isDesc}"></span></a>
                </li>
                
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                      <router-link :to="`/detail/${good.id}`">
                        <!-- <img :src="good.defaultImg"/> -->
                        <!-- 懒加载指令 -->
                        <img v-lazy="good.defaultImg"/>
                      </router-link>
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='getTotal' :continues='5'@getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //分类的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器用的：代表的是当前是第几页
        pageNo: 1,
        //代表的是每一个展示数据的个数
        pageSize: 3,
        //平台售卖属性的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,  
  },
  //在组件挂载完成前，执行一次把参数传过去
  beforeMount() {
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    //  this.searchParams.keyword = this.$route.params.keyword

    //s使用ES6中object.asign 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //测试接口返回的数据格式
  mounted() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getData();
  },
  computed: {
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块
    ...mapGetters(["goodList"]),
    ...mapGetters({ trademarkList: "trademarkList" }),
    ...mapGetters(["attrsList"]),

    //
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1
    },
    // 获取search模块展示产品多少数据
    ...mapState({
      getTotal:state =>state.search.searchList.total
    })
  },
  methods: {
    //向服务器请求获取Search模块数据（依据参数不同返回数据进行展示）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类名字
    removeCategoryName() {
      //将该数据置成undefined,数据就不会传给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //置空后，需要再次发请求
      this.getData();
      //地址栏也需要更改，改变路径
      //注意：这边只删除query参数相关数据，params需要保留
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams中的keyword关键字置空
      this.searchParams.keyword = undefined;
      //置空后，需要再次发请求
      this.getData();
      //通知兄弟组件header删除输入框的keyword关键字
      this.$bus.$emit("clear");
      if(this.$route.query){
         this.$router.push({ name: "search", query: this.$route.query });
      }
      
      
    },
    //自定义事件的回调
    trademarkInfo(trademark){
      //需要整理品牌字段的参数 'ID:品牌名称'
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //再次发请求，获取search模块数据进行展示
      this.getData()
    },
    //删除品牌面包屑
    removeTradeMark(){
      this.searchParams.trademark = undefined;
      this.getData()
    },
    //收集平台属性地方回调函数（自定义事件）
    attrInfo(attrs,attrValue){
      //["属性ID：属性值：属性名"]
      //参数格式整理
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;

      //数组去重
      if(this.searchParams.props.indexOf(props)==-1)
      {this.searchParams.props.push(props);}
      //再次发送请求
      this.getData();
      
    },
    //删除平台属性面包屑
    removeAttrsValue(index){
      this.searchParams.props.splice(index,1);
      //再次发请求
      this.getData()
    },
    changeOrder(flag){
      //flag：用户每一次点击li标签的时候，用于区分是综合（1）还是价格（2）
      //先获取order初始状态【需要通过初始状态去判断接下来做什么】
      let originOrder = this.searchParams.order;
      let originsFlag = originOrder.split(':')[0];
      let originsSort = originOrder.split(':')[1];
      //新的排序方式
      let newOrder = '';
      //判断的是多次点击的是不是同一个按钮
      if(flag==originsFlag){
        newOrder = `${originsFlag}:${originsSort=='desc'?'asc':'desc'}`
      }else{
        // 点击的不是同一个按钮
        newOrder = `${flag}:${'desc'}`
      }
      // 需要重新给order赋值
      this.searchParams.order = newOrder
      // 再次发送请求
      this.getData()
    },
    // 自定义事件回调函数---获取当前点击的是第几页
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    }
    
  },
  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3

      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getData();
      //分类名字与关键字不用清理；因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>