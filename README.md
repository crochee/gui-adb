# gui-adb

# 开发环境准备

- nodejs
- npm
- pnpm
- tsc

pnpm安装

```bash
npm install -g pnpm
```

typescript编译器安装

```bash
npm install -g typescript
```

安装完成后，可以通过 tsc -v 验证安装是否成功

# 项目搭建

## 初始化项目

```bash
pnpm init
```

在当前目录生成一个 package.json 文件

## 安装依赖

```bash
pnpm add express
pnpm add -D typescript @types/node @types/express
```

## 配置ts

```bash
tsc -m commonjs --init
```

在项目根目录生成 tsconfig.json 文件

## 使用ts-node

```bash
pnpm add -D ts-node
```
并在package.json中添加"scripts": { "dev": "ts-node src/index.ts" }
