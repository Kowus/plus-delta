<template>
  <div class="card col-md-4 bg-primary text-white">
    <div class="card-body">
      <h4 class="card-title">CE2136, Data Structures and Algorithms</h4>
      <h4 class="card-subtitle">
        <small>
          <sub>Navel Sharma</sub>
        </small>
      </h4>
      <hr />
      <!-- <p
        class="card-text"
      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
      <router-link to="/" class="float-right">
        <span class="badge badge-light">
          Go to class
          <sup class="bdg" title="3 reviews">3</sup>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {}
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
  max-width: 18rem;
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.17);
  // text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
}
.bdg {
  background-color: red;
  color: white;
  vertical-align: top;
  padding: 3px 6px;
  border-radius: 30px;
  position: relative;
  right: -20px;
}
</style>