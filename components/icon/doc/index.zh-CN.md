---
category: Components
subtitle: 图标
type: 通用
title: Icon
hasPageDemo: true
---

语义化的矢量图形。

<blockquote style="border-color: orange;">
<p><strong>如遇图标无法显示或控制台出现相关错误，请在项目下执行 <code>ng g ng-zorro-antd:fix-icon</code> 命令修复。</strong></p>
<p>详情请查看 <a href="/components/icon/zh#%E9%9D%99%E6%80%81%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD">静态加载与动态加载</a> 部分。</p>
</blockquote>

## 图标列表

> 点击图标即可复制代码

新版图标可能略有缺失，我们将与 [Ant Design](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) 同步保持图标的更新。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzIconModule } from 'ng-zorro-antd/icon';
```

## API

### [nz-icon]

| 参数             | 说明                                                         | 类型                         | 默认值    |
| ---------------- | ------------------------------------------------------------ | ---------------------------- | --------- |
| `[nzType]`         | 图标类型，遵循图标的命名规范                                 | string                       | -         |
| `[nzTheme]`        | 图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标 | `'fill'丨'outline'丨'twotone'` | `'outline'` |
| `[nzSpin]`       | 是否有旋转动画                                          | `boolean`                    | `false` |
| `[nzTwotoneColor]` | 仅适用双色图标，设置双色图标的主要颜色，仅对当前 icon 生效   | `string (十六进制颜色)`      | -         |
| `[nzIconfont]`     | 指定来自 IconFont 的图标类型                                 | string                       | -         |
| `[nzRotate]` | 图标旋转角度（7.0.0 开始支持） | `number` | - |

<blockquote style="border-color: red;"><p><strong>不加上 nz 前缀的 API，以及原使用 icon 类名的 API 将会在 8.0.0 及之后不被支持，请及时迁移。</strong></p></blockquote>

### NzIconService

| 方法/属性              | 说明                                                                                 | 参数                        |
| ---------------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| `twoToneColor`         | 用于设置双色图标的默认主题色，不设置即为 Ant Design 原生主题蓝色                     | `TwoToneColorPaletteSetter` |
| `addIcon()`            | 用于静态引入图标，可传入多个值（或者用数组解构赋值）                                 | `IconDefinition`            |
| `addIconLiteral()`     | 用于静态引入用户自定义图标                                                           | `string`, `string (SVG)`    |
| `fetchFromIconfont()`  | 用于从 FontIcon 获取图标资源文件                                                     | `NzIconfontOption`          |
| `changeAssetsSource()` | 用于修改动态加载 icon 的资源前缀，使得你可以部署图标资源到你想要的任何位置，例如 cdn | `string`                    |

### InjectionToken

| Token                           | 说明                                                             | 参数                                |
| ------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| `NZ_ICONS`                      | 用于静态引入图标，传入数组                                       | `IconDefinition[]`, `useValue`      |
| `NZ_ICON_DEFAULT_TWOTONE_COLOR` | 用于设置双色图标的默认主题色，不设置即为 Ant Design 原生主题蓝色 | `string (十六进制颜色)`, `useValue` |

### SVG 图标

从 `1.7.0` 版本开始，我们与 Ant Design `3.9.x` 同步，使用了 svg 图标替换了原先的 font 图标，从而带来了以下优势：

- 完全离线化使用，不需要从支付宝 cdn 下载字体文件，图标不会因为网络问题呈现方块，同时还支持本地部署。
- 在低端设备上 SVG 有更好的清晰度。
- 支持多色图标。
- 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

可参与 Ant Design 的相关讨论：[#10353](https://github.com/ant-design/ant-design/issues/10353)。

NG-ZORRO 之前并没有图标组件，而是提供了基于字体文件的解决方案。新版本中我们提供了旧 API 兼容，如果你不修改既有的代码，所有的图标都会被动态加载成 `outline` 主题的图标，而最佳实践是使用新的指令 `nz-icon` 并传入 `theme` 以明确图标的主题风格，例如：

```html
<i nz-icon [type]="'star'" [theme]="'fill'"></i>
```

所有的图标都会以 `<svg>` 标签渲染，但是你还是可以用之前对 i 标签设置的样式和类来控制 svg 的样式，例如：

```html
<i nz-icon [type]="'message'" style="font-size: 16px; color: #08c;"></i>
```

### 静态加载与动态加载

对于 Ant Design 提供的图标，我们提供了两种方式来加载图标资源文件。

静态加载，在 `AppModule` 里加入你需要的图标（推荐）或者是全部的图标，例如：

```ts
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];

// 引入全部的图标，不推荐 ❌
// import * as AllIcons from '@ant-design/icons-angular/icons';

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    NgZorroAntdModule,
  ],
  providers   : [
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
```

本质上是调用了 `NzIconService` 的 `addIcon` 方法，引入后的文件会被打包到 `.js` 文件中。静态引入会增加包体积，所以我们建议尽可能地使用动态加载，如果要静态加载，也仅仅加载你需要用到的图标，具体请看 Ant Design 的 [issue](https://github.com/ant-design/ant-design/issues/12011)。

> 为了加快渲染速度，NG-ZORRO 本身用到的 icon 是静态引入的。而官网的图标是动态引入的。

动态加载，这是为了减少包体积而提供的方式。当 NG-ZORRO 检测用户想要渲染的图标还没有静态引入时，会发起 HTTP 请求动态引入。你只需要配置 `angular.json` 文件：

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
      "output": "/assets/"
    }
  ]
}
```

我们为你提供了一条指令，升级到 1.7.0 之后，执行 `ng g ng-zorro-antd:fix-icon` 命令，就会自动添加以上配置。

你可以通过 `NzIconService` 的 `changeAssetsSource()` 方法来修改图标资源的位置，这样你就可以部署这些资源到 cdn 上。你的参数会被直接添加到 `assets/` 的前面。

例如，你在 `https://mycdn.somecdn.com/icons/assets` 目录下部署了静态资源文件，那么你就可以通过调用 `changeAssetsSource('https://mycdn.somecdn.com/icons')`，来告诉 NG-ZORRO 从这个位置动态加载图标资源。

请在 constructor 里或者在 `AppInitService` 里调用这个方法。

### 双色图标主色

对于双色图标，可以通过修改 `this.iconService.twoToneColor = { primaryColor: '#1890ff' }` 来全局设置图标主色。你还可以访问这个属性获取当前的全局主色。还可以通过 `InjectionToken` 进行设置。

对于单个图标传入的参数有最高的优先级。

### 自定义 font 图标

从 `1.7.0` 版本开始，我们提供了一个 `fetchFromIconfont` 方法，方便开发者调用在 iconfont.cn 上自行管理的图标。

```ts
this._iconService.fetchFromIconfont({
  scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});
```

```html
<i nz-icon [iconfont]="'icon-tuichu'"></i>
```

其本质上是创建了一个使用 `<use>` 标签渲染图标的组件。

`options` 的配置项如下：

| 参数        | 说明                                                                                           | 类型   | 默认值 |
| ----------- | ---------------------------------------------------------------------------------------------- | ------ | ------ |
| `scriptUrl` | [iconfont.cn](http://iconfont.cn/) 项目在线生成的 `js` 地址，在 `namespace` 也设置的情况下有效 | string | -      |

在 scriptUrl 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://iconfont.cn/) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 使用帮助 查看如何生成 js 地址。

### 命名空间

从 `7.0.0-rc.4` 版本开始提供命名空间功能，用户可以使用该功能方便地添加自己的 icon。在渲染一个自定义 icon 时，只需要将 `type` 指定为 `namespace:name` 的形式，icon 组件就会在用户自行添加的图标中进行检索并渲染。同时支持静态和动态引入。

静态引入，只需要调用 `NzIconService` 的 `addIconLiteral` 方法即可。

动态引入，只需要保证 SVG 资源文件放到了相应的目录，即 `assets/${namespace}` 即可。例如你在 `zoo` 命名空间下有一个 `panda` 图标，你需要做的就是将 `panda.svg` 放到 `assets/zoo` 目录底下。

## 常见问题

### 图标都不见了！

你是不是没有阅读以上的文档？

### 出现了两个图标，这是怎么回事？

1.7.0 及之后与之前的版本在图标的实现上完全不同，旧版本的主题文件中，会引入字体文件，字体文件根据 CSS 类名，通过一个伪类元素将 icon 添加进来，加上新版的 SVG icon，就会出现两个 icon。

如果发生了，请先删除 `node_modules` 然后重装，如果还是不行，仔细检查你是否在别处引用了旧版本的主题文件，全局查找 `@icon-url`，删除该行代码即可。

### 我想静态引入全部的图标，该怎么做？

实际上我们已经在 <a href="/components/icon/zh#%E9%9D%99%E6%80%81%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD">静态加载与动态加载</a> 部分演示过了：

```ts
// import * as AllIcons from '@ant-design/icons-angular/icons';

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
```

然后通过 InjectionToken（1.8.0）或者 `NzIconService` 的 `addIcon` 方法引入。

### 动态加载会不会影响网页的性能？

我们用了多种手段来尽量减少动态请求，包括先静态后动态、缓存和相同 icon 的请求复用，用户很少能感知到 icon 是异步加载的。在网络环境尚可的情况下，即使是有三百多 icon 同时展示的 NG-ZORRO 官网，也基本没有卡顿。对于加载速度要求更高的用户，我们也支持 CDN。

### 我怎么知道一个 icon 的静态引入名？

很简单，大写驼峰加主题即为 icon 的引入名。比如，`alibaba` 的引入名就是 `AlibabaOutline`，事实上，编辑器的自动补全能帮助到你。
