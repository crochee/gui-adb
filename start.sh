#!/bin/bash

# 断开adb连接的函数
disconnect_adb() {
  echo "Disconnecting from Android device..."
  adb disconnect $ANDROID_DEVICE_IP
  exit 0
}

# 捕获信号，确保在脚本结束时断开adb连接
trap disconnect_adb SIGINT SIGTERM

# 连接远程安卓设备
echo "Connecting to Android device at $ANDROID_DEVICE_IP..."
adb connect $ANDROID_DEVICE_IP

# 启动node服务
echo "Starting Node.js service..."
node dist/index.js

# 如果node服务正常结束，也断开adb连接
disconnect_adb
