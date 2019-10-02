<template>
  <div class="container">
    <!-- <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Home</a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">Library</a>
      </li>
      <li class="breadcrumb-item active">Data</li>
    </ol>
    <div class="text-left">
      <h1>Courses</h1>
    </div>-->
    <div class="jumbotron">
      <div class="username">
        <small>Barnabas Nomo</small>
      </div>
      <h1 class="display-3 text-left">Courses</h1>
      <hr class="my-4" />
      <div class="row text-left">
        <CourseCard v-for="item in [0,1,2,3,4,5]" :item="item" :key="item" :bind="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "@/components/CourseCard.vue";
export default {
  name: "courses",
  components: {
    CourseCard
  }
};
</script>

<style lang="scss" scoped>
.container {
  // background-color: white;
  // height: calc(100vh - 30px);
  padding-top: 50px;
  h1 {
    color: black;
    font-size: 4em;
    font-weight: lighter;
  }
  .jumbotron {
    background-color: #fff;
    box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.17);
    .username {
      text-align: left;
      position: relative;
      top: -20px;
      opacity: 0.3;
    }
  }
}
</style>