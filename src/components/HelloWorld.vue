<template>
  <div class="user">
    <div class="user-panel">
      <div class="panel-top">扣小扣</div>
      <div class="panel-content">
        <div class="msg-list">
          <div class="msg" v-for="(msg, index) in msgList" :key="index" :class="msg.userId === 1 ? 'self' : 'other'">
            <img class="avatar" :src="msg.userId === 1 ? 'http://thirdqq.qlogo.cn/g?b=sdk&k=gKGJ5vJJKhASwia4Tb8enBw&s=100&t=1556265459?rand=1586095109' : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586180664284&di=32443f04fdcc8605d76d6019dd78507b&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2373951818%2C1368889052%26fm%3D214%26gp%3D0.jpg'">
            <div class="content">{{ msg.content }}</div>
          </div>
        </div>
      </div>
      <div class="panel-bottom">
        <input type="text" v-model="leftMessage">
        <span @click="sendLeftMsg()">发送</span>
      </div>
    </div>
    <div class="user-panel">
      <div class="panel-top">微小信</div>
      <div class="panel-content">
        <div class="msg-list">
          <div class="msg" v-for="(msg, index) in msgList" :key="index" :class="msg.userId === 2 ? 'self' : 'other'">
            <img class="avatar" :src="msg.userId === 2 ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586180664284&di=32443f04fdcc8605d76d6019dd78507b&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2373951818%2C1368889052%26fm%3D214%26gp%3D0.jpg' : 'http://thirdqq.qlogo.cn/g?b=sdk&k=gKGJ5vJJKhASwia4Tb8enBw&s=100&t=1556265459?rand=1586095109'">
            <div class="content">{{ msg.content }}</div>
          </div>
        </div>
      </div>
      <div class="panel-bottom">
        <input type="text" v-model="rightMessage">
        <span @click="sendRightMsg()">发送</span>
      </div>
    </div>
    <video ref="audio" name="media"><source src="../assets/9411.wav" type="audio/wav"></video>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      leftMessage: '',
      rightMessage: '',
      msgList: [{
        content: '欢迎使用MQTT',
        userId: 1
      },
      {
        content: '我是微小信',
        userId: 1
      },
      {
        content: 'hello，我是扣小扣',
        userId: 2
      }]
    }
  },
  created () {
    if (!this._MQTT.client.connected && !this._MQTT.client.disconnecting) {
      console.log('mqtt断开连接')
    }
    this._MQTT.subscribe('/QAndASession', { qos: 1 })
    this._MQTT.on('/QAndASession', (message) => {
      // console.log(message)
      this.msgList.push(message)
    })
  },
  methods: {
    sendLeftMsg () {
      if (!this.leftMessage || this.leftMessage.trim() === '') {
        Dialog({message: '不能发送空白消息'})
        return
      }
      this._MQTT.publish('/QAndASession', {
        clientId: 'mqttjs_d4fee245c0',
        userId: 1,
        content: this.leftMessage
      }, (error) => {
        if (error) {
          console.log(error)
          console.log('发送失败')
          return
        }
        this.$refs.audio.play()
        this.leftMessage = ''
      })
    },
    sendRightMsg () {
      if (!this.rightMessage || this.rightMessage.trim() === '') {
        Dialog({message: '不能发送空白消息'})
        return
      }
      this._MQTT.publish('/QAndASession', {
        clientId: 'mqttjs_d4fee245c0',
        userId: 2,
        content: this.rightMessage
      }, (error) => {
        if (error) {
          console.log(error)
          console.log('发送失败')
          return
        }
        this.$refs.audio.play()
        this.rightMessage = ''
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px !important;
}
div::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
div::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
div::-webkit-scrollbar-thumb:hover {
  background: transparent;
}
video {
  position: absolute;
  bottom: 0;
  left: 0;
}
.user {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .user-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 100px;
    width: 375px;
    height: 667px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 0 10px 5px #eee;
    overflow: hidden;
    background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586180520683&di=8279c4a1dc0fb9575020389430bbe8ee&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a3d159467505a8012193a36e042c.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .panel-top {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #f2f2f2;
      border-bottom: 1px solid #e0e0e0;
      text-align: center;
    }
    .panel-content {
      flex: 1;
      padding: 4px 16px;
      overflow-y: auto;
      background-color: rgba(242, 242, 242, 0.85);
      .msg-list {
        .msg {
          position: relative;
          margin: 18px 0;
          .avatar {
            position: absolute;
            top: 0;
            display: inline-block;
            width: 41px;
            height: 41px;
            background-color: #c0c0c0;
            border-radius: 6px;
            overflow: hidden;
            vertical-align: top;
          }
          .content {
            position: relative;
            display: inline-block;
            max-width: 70%;
            padding: 10px 16px;
            color: #ffffff;
            border-radius: 6px;
          }
          &.self {
            text-align: right;
            .avatar {
              right: 0;
            }
            .content {
              margin-right: 56px;
              background-color: #177afa;
              text-align: left;
              &::after {
                position: absolute;
                top: 17px;
                right: -4px;
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                background-color: #177afa;
                transform: rotate(45deg);
              }
            }
          }
          &.other {
            text-align: left;
            .content {
              margin-left: 56px;
              background-color: #fff;
              color: #333;
              text-align: left;
              &::after {
                position: absolute;
                top: 17px;
                left: -4px;
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                background-color: #fff;
                transform: rotate(45deg);
              }
            }
          }
        }
      }
    }
    .panel-bottom {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 55px;
      background-color: #f6f6f6;
      border-top: 1px solid #e0e0e0;
      input {
        flex: 1;
        margin-left: 16px;
        line-height: 36px;
        padding: 0 12px;
        background-color: #ffffff;
        border-radius: 4px;
        border: none;
        outline: none;
      }
      span {
        height: 36px;
        width: 80px;
        line-height: 36px;
        text-align: center;
        color: #177afa;
        cursor: pointer;
      }
    }
  }
}
</style>
