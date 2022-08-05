<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="show = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 三级联动：如果使用声明式导航router-link，可以实现路由的跳转与传递参数，但是会出现卡顿现象（组件渲染频繁） -->
            <!-- 编程式导航如果给每个a标签注册事件，性能也不好 -->
            <!-- 最好的解决方案：编程式导航 + 事件委派 实现路由跳转与传递参数（点击a标签才能进行路由跳转，事件委派存在的问题是：确定点击元素是a标签、区分一二三级分类的标签） -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 通过data-categoryName区分是否是a标签，data-category1Id区分是几级标签 -->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{display: currentIndex === index ? 'block' : 'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
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
import { mapState } from "vuex"
// 按需引入loadsh的节流函数
import throttle from "lodash/throttle";
export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true
    }
  },
  computed: {
    ...mapState({
      // 对象写法属性值需要的是一个函数，当时用这个计算属性的时候，后测函数会立即执行一次
      // 注入一个参数state，即为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将TypeNav进行隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，可能出现上下文this问题
    changeIndex: throttle(function (index) {
      // 由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index
    }, 50),
    goSearch(event) {
      //event.target:获取到的是触发事件的元素(div、h3、a、em、dt、 d1...)
      let node = event.target

      // 给a标签添加自定义属性data-categoryName，全部的标签当中只有a标签带有自定义属性
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = node.dataset
      
      //第二个问题解决了:点击的到底是不是a标签(只要这个标签身上带有categoryname) 一定是a标签
      //当前这个if语句: -定是a标签才会进入
      if (categoryname) {
        // 准备路由跳转的参数
        let location = {name: 'search'}
        let query = { categoryName: categoryname }
        // 一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id
          // 一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id
          // 一定是a标签：三级目录
        } else {
          query.category3Id = category3id
        }
        // 动态给location配置对象添加query属性
        location.query = query
        // 如果路由跳转的时候，带有params参数，捎带传递过去
        location.params = this.$route.params
        // 路由跳转
        this.$router.push(location)
      }
    },
    // 当鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow() {
      this.currentIndex = -1
      // 判断如果是Search路由组件的时候才会执行
      if (this.$route.path !== '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style  lang="less" scoped>
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
            _height: 200px;
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
          background-color: skyblue;
        }
      }
    }
    .sort-enter-active, .sort-leave-active {
      transition: all .1s linear;
    }
    .sort-enter, .sort-leave-to {
      height: 0;
    }
    .sort-enter-to, .sort-leave {
      height: 461px;
    }
  }
}
</style>
