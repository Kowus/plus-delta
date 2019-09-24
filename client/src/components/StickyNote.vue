<template>
  <transition name="fade">
    <div class="card note" :class="`border-${note.class === 'plus'?'warning':'danger'}`">
      <div class="card-body">
        <small class="note-editor">
          <i class="fas fa-edit" @click="setCurEdit(note._id)" v-if="getCurEdit !== note._id"></i>
          <button type="button" class="btn btn-danger btn-sm" v-if="getCurEdit === note._id">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button
            type="button"
            class="btn btn-success btn-sm"
            v-if="getCurEdit === note._id"
            @click="sBlur({id:note._id})"
          >
            <i class="fas fa-save"></i>
          </button>
        </small>
        <div class="form-group" v-if="getCurEdit === note._id">
          <input
            class="form-control"
            id="projectTitle"
            aria-describedby="titleHelp"
            placeholder="Review Title"
            v-model="note.title"
          />
          <small id="titleHelp" class="form-text text-muted">Enter title for review</small>
        </div>
        <h5 class="card-title" v-else>{{note.title}}</h5>
        <img src="/img/tack.png" class="tack" />
        <textarea
          class="form-control"
          id="exampleTextarea"
          rows="5"
          v-model="note.message"
          v-if="getCurEdit === note._id"
        ></textarea>
        <p class="card-text" v-else>{{note.message}}</p>

        <div class="preloader" v-if="note.blurred">
          <div class="spinner">
            <i class="fas fa-spinner"></i>
          </div>
        </div>
        <p class="text-right">
          <small class="text-muted">-- {{revDate(note.date)}}</small>
        </p>
        <fieldset class="form-group fgs" v-if="getCurEdit === note._id">
          <div class="form-check">
            <label class="form-check-label text-warning">
              <input
                type="radio"
                class="form-check-input"
                name="optionsRadios"
                id="optionsRadios1"
                value="plus"
                v-model="note.class"
              />
              Plus
            </label>
            <span class="plus-delta-separator">|</span>
            <label class="form-check-label text-danger">
              <input
                type="radio"
                class="form-check-input"
                name="optionsRadios"
                id="optionsRadios2"
                value="delta"
                v-model="note.class"
              />
              Delta
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "StickyNote",
  props: {
    note: {},
    editing: ""
  },

  computed: {
    ...mapGetters(["getBlurred", "getCurEdit"])
  },
  methods: {
    revDate(dateString) {
      return moment(dateString).fromNow();
    },
    ...mapActions(["setBlurred", "setCurEdit"]),
    sBlur(id) {
      this.setBlurred(id);
      this.note.blurred = true;
      var scope = this;
      setTimeout(function() {
        scope.note.blurred = false;
        if (scope.getCurEdit === scope.note._id) return scope.setCurEdit("");
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
[contenteditable="true"] {
  border: 1px solid black;
  padding: 3px;
  outline: none;
}
.btn {
  padding: 2px;
}

#projectTitle {
  // background-image: url("&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: 16px 18px;
  background-position: 98% 50%;
  cursor: auto;
}
.note {
  margin: 5px;
  text-align: left;
  max-width: 13rem;
  transform: rotate(-5deg);
  box-shadow: -5px 1px 5px rgba(7, 7, 7, 0.4);
  .tack {
    width: 25px;
    height: 25px;
    position: absolute;
    top: -6px;
    right: -2px;
  }
  .note-editor {
    cursor: pointer;
    font-size: 14px;
    float: right;
    :hover {
      opacity: 0.4;
    }
  }
}
.fgs {
  display: inline;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.preloader {
  height: 100%;
  min-width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
.spinner {
  color: white;
  font-size: 2em;
  font-weight: 900%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 30%;
  width: 50%;
  margin: -15% 0 0 -25%;
}
.fa-spinner {
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: spinner;
  animation-duration: 1s;
}
</style>