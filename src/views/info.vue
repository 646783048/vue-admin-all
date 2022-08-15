<template>
  <div class="mian">
    <app-header></app-header>
    <nav-bar></nav-bar>
    <!-- <mytables></mytables> -->
    <div class="mian-body">
      <router-view />
    </div>
  </div>
</template>

<script>
import vHeader from "../components/Header.vue";
import mynav from "../components/mynav.vue";
import mytables from "../components/tables.vue";
export default {
  components: { "app-header": vHeader, "nav-bar": mynav, mytables: mytables },
  created() {
    // console.log(this.$route.params)
    // this.bar =this.$route.params
  }
};
</script>
<style lang="" scoped>
.mian-body {
  margin-left: 200px;
  padding: 16px;
}
</style>
