<template>
  <div class="comment-list">
    <h1>Управление комментариями</h1>
    <div
      class="comment"
      v-for="item in commentsList"
      :key="item.id"
      :class="{disabled: sendedIds.length > 0}"
    >
      {{item.comment}}
      <div class="loader" v-if="sendedIds.includes(item.id)">
        <img class="spinner" src="../assets/spinner.svg">
      </div>
      <Button class="btn-delete" @onClick="removeCommentRequest(item.id)">Удалить</Button>
    </div>
  </div>
</template>

<script>
import comments from "../utils/comments"
import Button from "@/components/Button"
import "v-toaster/dist/v-toaster.css"

export default {
  name: "comments",
  components: {
    Button
  },
  data() {
    return {
      wsUrl: "ws://echo.websocket.org/",
      commentsList: comments.data,
      socketConnected: false,
      websocket: null,
      sendedIds: []
    }
  },
  mounted() {
    this.websocket = new WebSocket(this.wsUrl)
    this.websocket.onopen = () => this.handleSocketConnection(true)
    this.websocket.onclose = () => this.handleSocketConnection(false)
    this.websocket.onmessage = res => this.wsMessageHandler(res)
    this.websocket.onerror = () => this.handleSocketError()
  },

  destroyed() {
    this.websocket.close()
  },

  methods: {
    handleSocketConnection(status) {
      this.socketConnected = status
    },

    wsMessageHandler(res) {
      const id = parseInt(res.data)
      const isCorrectId = this.sendedIds.indexOf(id) !== -1

      if (isCorrectId) {
        this.removeComment(id)
        this.removeIdFromStack(id)
      }
    },

    handleSocketError() {
      this.$toaster.error("Произошла ошибка")
    },

    removeComment(id) {
      this.commentsList = this.commentsList.filter(item => item.id !== id)
    },

    removeIdFromStack(id) {
      this.sendedIds = this.sendedIds.filter(el => el !== id)
    },

    removeCommentRequest(id) {
      this.sendedIds.push(id)
      if (this.socketConnected && id !== 2) {
        this.websocket.send(id)
      }
      if (id === 2) {
        setTimeout(() => {
          this.removeIdFromStack(id)
          this.handleSocketError()
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list {
  margin: 0 auto;
  width: 50%;
}

.comment {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 32px;
  padding: 8px;
  border-bottom: 1px solid #e7e8ec;
  transition: background 0.2s ease;
  &:hover {
    background: #f0f2f5;
  }
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(197, 199, 202, 0.8);
}

.spinner {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
  height: 16px;
  width: 16px;
  animation: loading 0.6s steps(8, end) infinite forwards;
}

.disabled {
  pointer-events: none;
}

@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
