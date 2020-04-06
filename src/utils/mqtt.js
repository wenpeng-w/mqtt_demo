/**
 *  =========================================================================================
 *
 *  mqtt.js
 *  https://github.com/mqttjs/MQTT.js/tree/ea439b1e36b6fceadfed4ff58e8018cafaa08bbb
 *
 *  MQTT 协议中文版
 *  https://mcxiaoke.gitbooks.io/mqtt-cn/content/
 *
 *  =========================================================================================
 */

import mqtt from 'mqtt'
class MQTT {
  constructor () {
    this.socket = 'ws://localhost:8083/mqtt'
    // this.client = null
    this.options = {
      reconnectPeriod: 10000, // 重连时间
      keepalive: 10 // 心跳时间
    }
  }

  // 连接
  launch (clientId, callback) {
    this.client = mqtt(this.socket, { clientId: clientId.toString(), ...this.options })
    // console.log(this.client)
    this.client.on('connect', (connack) => {
      console.log('连接成功')
      callback && callback(connack)
    })
  }

  // 断开连接
  end () {
    this.client.end()
  }

  // 订阅
  subscribe (...options) {
    this.client.subscribe(...options)
  }

  // 发布
  publish (topic, message, callback, options) {
    this.client.publish(topic, JSON.stringify(message), options, (error) => {
      callback && callback(error)
    })
  }

  on (topic, callback) {
    this.client.on('message', (_topic, message) => {
      if (topic === _topic) {
        callback && callback(JSON.parse(message.toString()))
      }
    })
  }
}

export default new MQTT()
