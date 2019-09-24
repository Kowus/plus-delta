<template>
  <div class="auth text-center">
    <div class="jumbotron">
      <h1 class="display-3">Delta, Plus!</h1>
      <p class="lead">Simple, Anonymous Reviews</p>
      <hr class="my-4" />
      <transition name="fade">
        <router-view />
      </transition>
      <!-- <p>Welcome</p> -->
      <!-- <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">
          <i class="fas fa-paper-plane"></i>
        </a>
      </p>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "Auth"
};
</script>

<style lang="scss" scoped>

.jumbotron {
  color: #000;
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
}
.auth {
  text-align: center;
  padding: 10%;
  margin: 0;
}
</style>