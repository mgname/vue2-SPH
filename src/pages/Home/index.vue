<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floorInfo="floor"/>
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex"
import ListContainer from "./ListContainer"
import Recommend from "./Recommend"
import Rank from "./Rank"
import Like from "./Like"
import Floor from "./Floor"
import Brand from "./Brand"
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style>

</style>