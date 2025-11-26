# 使用多阶段构建，减小最终镜像大小

# 第一阶段：构建阶段
FROM node:25-alpine AS builder

# 设置工作目录并安装构建依赖
WORKDIR /app
RUN apk add --no-cache git python3 make g++ && npm install -g pnpm

# 复制package.json和pnpm-lock.yaml，安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源代码并构建
COPY src ./src
COPY tsconfig.json ./
RUN pnpm run build

# 第二阶段：运行阶段
FROM node:25-alpine

# 设置工作目录，安装adb工具和pnpm
WORKDIR /app
RUN apk add --no-cache android-tools && npm install -g pnpm

# 设置ANDROID_HOME和ANDROID_SDK_ROOT环境变量
ENV ANDROID_HOME=/usr
ENV ANDROID_SDK_ROOT=/usr

# 创建platform-tools目录并添加adb符号链接，确保appium-adb能找到adb
RUN mkdir -p /usr/platform-tools \
    && ln -s /usr/bin/adb /usr/platform-tools/adb \
    && ln -s /usr/bin/adb /usr/adb

# 复制package.json和pnpm-lock.yaml，安装生产依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# 从构建阶段复制构建结果
COPY --from=builder /app/dist ./dist

# 复制环境变量文件
COPY .env ./

# 复制启动脚本
COPY start.sh ./
RUN chmod +x start.sh

# 设置entrypoint和启动命令
ENTRYPOINT ["/bin/sh"]
CMD ["start.sh"]
