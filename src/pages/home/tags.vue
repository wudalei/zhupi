<template>
  <div class="tags"
       v-if="showTags">
    <ul>
      <li class="tags-li"
          v-for="(item,index) in tagsList"
          :class="{'active': isActive(item.path)}"
          :key="index">
        <router-link :to="item.path"
                     class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon"
              @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini"
                   type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small"
                          slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from './bus';
export default {
  data () {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags (index) {
      console.log("index->", index)
      const delItem = this.tagsList.splice(index, 1)[0];
      console.log("delItem->", delItem)
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      console.log("item->", item)
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        //  this.$router.push('/');
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = [];
      this.$router.push('/');
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      })
      this.tagsList = curItem;
    },
    // 设置标签
    setTags (route) {
      console.log("route-->", route)
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.name,
          path: route.fullPath,
          // name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList);
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created () {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push('/');
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    })
  }
}
</script>

