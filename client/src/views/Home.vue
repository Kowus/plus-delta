<template>
  <div class="home">
    <button type="button" class="btn btn-primary add-new" @click="createReview()">
      <strong>
        Add Review
        <sup>
          <i class="fas fa-plus"></i>
        </sup>
      </strong>
    </button>

    <div class="row">
      <StickyNote v-for="note in getReviews" :note="note" :bind="note" :key="note._id" />
      {{getCurEdit}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import StickyNote from "@/components/StickyNote.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    HelloWorld,
    StickyNote
  },
  computed: {
    ...mapGetters(["getBlurred", "getReviews", "getCurEdit"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setReviews"]),
    createReview() {
      this.setReviews({
        updateOperator: "unshift",
        reviews: {
          title: "Plus Card Title",
          message:
            "A bad review is the result of a problem. The real problem is whatever happened between your customer and your businesses that created that result ",
          date: "2019-09-09T07:50:51.157Z",
          class: "delta",
          blurred: false,
          _id: new Date().toString()
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  padding: 12px;
  .add-new {
    position: fixed;
    top: 5px;
    right: 35px;
  }
}

// .stcknt {
//   padding: 5px;
// }
.row {
  padding: 12px;
}
</style>