# umi project

## 🤖 Preview

https://emotion-research.vercel.app/

## 相关问题

#### 🥶 Global 非预期

Global 无法去重，如果每次添加删除都加一遍 Global 过于破费。
现自行实现 Global，根据所在环境决定渲染。Client 初次运行会清理 Server 端相关残留。二次渲染根据 prefixCls 差值以节省性能开支。

#### 🥶 组件渲染缺少 Memo 能力

根据 context 传入后，每次节点渲染都会重新计算样式并且走一遍添加流程。`styled` 没有提供 memo 能力，对于大型应用有性能风险。
#### 🚫 SSR Bug

SSR 渲染节点后到 Client 渲染时没有给添加的节点去重导致页面有大量 style 元素影响 layout 计算性能。可以 hack 干掉，但是这样太过耦合，先等等官方处理。

https://github.com/emotion-js/emotion/issues/2472

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```
