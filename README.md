# c-react
react 16.10.0 源码阅读。


## create-react-app

基于npm在全局安装create-react-app
```
npm install -g create-react-app
create-react-app my-app-name
yarn start

```
在本地通过create-react-app创建测试项目  
创建完项目之后要修改源码以及webopack配置,需要 执行： 
npm run eject  
项目目录下会多出一个config文件  


## 导入源码文件

将创建的项目替换为下载的源码文件
放到src目录下

更改配置文件 /config/webpack.config.js 在运行项目的时候编译我们导入的源码为

```
    resolve:{
        ...,
        alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        // 'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        // ...(isEnvProductionProfile && {
        //   'react-dom$': 'react-dom/profiling',
        //   'scheduler/tracing': 'scheduler/tracing-profiling',
        // }),
        // ...(modules.webpackAliases || {}),
        'react': path.resolve(__dirname, '../src/react/packages/react'),
        'react-dom': path.resolve(__dirname, '../src/react/packages/react-dom'),
        'legacy-events': path.resolve(__dirname, '../src/react/packages/legacy-events'),
        'shared': path.resolve(__dirname, '../src/react/packages/shared'),
        'react-reconciler': path.resolve(__dirname, '../src/react/packages/react-reconciler'),
      },
    }

```

## 解决各种错误

### flow 检测报错

由于react的源码中采用了flow这个东东做类型检查， 所以我们需要安装 @babel/plugin-transform-flow-strip-types 这个插件忽略类型检测

```
// 插件安装
npm install @babel/plugin-transform-flow-strip-types -D

//插件配置
   //在webpack.config.js的babel-loader中添加配置
    {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
        customize: require.resolve(
          'babel-preset-react-app/webpack-overrides'
        ),
    
        plugins: [
          ...,
          [require.resolve('@babel/plugin-transform-flow-strip-types')]
          // 配置忽略flow类型检测
        ],
        ...
    }
```


### HostConfig配置错误

修改文件 src/react/packages/react-reconciler/src/ReactFiberHostConfig.js, 根据环境去导出HostConfig。
```
//添加以下代码 
export * from './forks/ReactFiberHostConfig.dom';

```

### 部分全局变量报错
修改 /config/env.js 中的stringifed对象增加属性

```
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
    "__DEV__": true,
    "__PROFILE__": true,
    "__UMD__": true
  };
```


### hasOwnProperty ReactSharedInternals.js错误

```
// react此时未export内容，直接从ReactSharedInternals拿值
// import React from 'react';
// 此时React为undefined
// const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
​
import ReactSharedInternals from '../react/src/ReactSharedInternals';
```
### invariant() 函数报错
src/react/packages/shared/invariant.js 文件下 invariant 函数的错误处理
修改如下:
```
export default function invariant(condition, format, a, b, c, d, e, f) {
  if(condition) return ;
  throw new Error(
    'Internal React error: invariant() is meant to be replaced at compile ' +
      'time. There is no runtime version.',
  );
}
```

## 本地调试


```
// 安装依赖
yarn

// 启动项目
yarn start


// 配置调试- 安装插件 debugger for chrome
// 和上面启动的端口保持一致
    "url": "http://localhost:3000",
    "webRoot": "${workspaceFolder}/src/index.js"

```
启动调试，就可以愉快的打断点调试啦


### QA
VSCODE 调试启动有问题 

Unable to launch browser: "spawn ENOTDIR"

1. 降低插件版本，debugger for chrome。
2. 安装插件 view in browser

