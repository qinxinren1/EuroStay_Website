# 图片资源目录结构说明

这个文件夹包含了网站所有的图片资源，按照页面和功能模块进行分类组织。

## 目录结构

```
public/images/
├── home/                    # 首页图片
│   ├── hero/               # Hero 区域主图
│   │   └── hero-main.jpg   # 主英雄图片
│   ├── features/           # 功能特性图片
│   │   └── feature-*.jpg   # 功能特性展示图片
│   ├── phone-screens/      # 手机界面截图
│   │   ├── screen-1.jpg    # 界面1
│   │   ├── screen-2.jpg    # 界面2
│   │   └── screen-3.jpg    # 界面3
│   ├── advantages/         # 优势展示图片
│   │   └── advantage-*.jpg # 优势模块图片
│   └── host-cards/         # Host卡片图片
│       ├── host-amsterdam.jpg
│       ├── host-barcelona.jpg
│       └── host-*.jpg
│
├── about/                   # 关于页面图片
│   ├── banner/             # 品牌宣传横幅
│   │   └── brand-banner.jpg
│   ├── team/               # 团队照片
│   │   └── team-photo.jpg
│   └── members/            # 团队成员头像
│       ├── member-1.jpg
│       ├── member-2.jpg
│       └── member-3.jpg
│
├── stories/                 # 故事页面图片
│   └── user-stories/       # 用户故事图片
│       ├── story-1-paris.jpg
│       ├── story-2-barcelona.jpg
│       └── story-3-amsterdam.jpg
│
├── products/                # 产品页面图片
│   └── steps/              # 使用步骤图片
│       ├── step-1.jpg
│       ├── step-2.jpg
│       └── step-*.jpg
│
├── globe/                   # 地球相关图片
│   ├── earth-night.jpg     # 地球夜间纹理（Three.js 使用）
│   └── earth-daymap.png    # 地球日间纹理（已在 public/ 根目录）
│
├── footer/                  # 页脚图片
│   └── qr-codes/           # 二维码图片
│       ├── wechat-qr.png   # 微信二维码
│       └── contact-qr.png  # 联系方式二维码
│
└── shared/                  # 共享图片资源
    └── (可存放跨页面使用的图片)
```

## 使用说明

### 1. 首页图片 (home/)

- **hero/hero-main.jpg**: Hero 区域主图，建议尺寸：1200x600px 或更高分辨率
- **features/**: 功能特性展示图片，建议尺寸：800x600px
- **phone-screens/**: 手机界面截图，建议尺寸：375x812px（iPhone X 标准）或按实际屏幕比例
- **advantages/**: 优势展示图片，建议尺寸：600x400px
- **host-cards/**: Host卡片图片，建议尺寸：600x400px

### 2. 关于页面图片 (about/)

- **banner/brand-banner.jpg**: 品牌宣传横幅，建议尺寸：1920x400px（全宽横幅）
- **team/team-photo.jpg**: 团队照片，建议尺寸：800x600px
- **members/member-*.jpg**: 团队成员头像，建议尺寸：400x400px（正方形）

### 3. 故事页面图片 (stories/)

- **user-stories/story-*.jpg**: 用户故事图片，建议尺寸：800x600px
- 命名建议：story-{编号}-{地点}.jpg，例如：story-1-paris.jpg

### 4. 产品页面图片 (products/)

- **steps/step-*.jpg**: 使用步骤指导图片，建议尺寸：600x400px

### 5. 地球纹理 (globe/)

- **earth-night.jpg**: 地球夜间纹理，用于 Three.js 3D 地球，建议尺寸：2048x1024px
- **earth-daymap.png**: 地球日间纹理（已在 public/ 根目录）

### 6. 页脚二维码 (footer/)

- **qr-codes/wechat-qr.png**: 微信二维码，建议尺寸：200x200px
- **qr-codes/contact-qr.png**: 联系方式二维码，建议尺寸：200x200px

## 图片命名规范

1. 使用小写字母和连字符（kebab-case）
2. 文件名要有描述性，例如：`feature-search.jpg` 而不是 `img1.jpg`
3. 编号使用数字，例如：`step-1.jpg`, `step-2.jpg`
4. 图片格式建议：
   - 照片使用 `.jpg` 或 `.jpeg`
   - 透明背景使用 `.png`
   - 图标使用 `.svg`

## 图片优化建议

1. **文件大小**: 网页图片建议单个文件不超过 500KB
2. **格式选择**: 
   - 照片：使用 JPEG，质量 80-85%
   - 图标/简单图形：使用 PNG 或 SVG
   - 现代浏览器：可使用 WebP 格式以获得更好的压缩
3. **分辨率**: 提供 2x 版本的图片用于 Retina 显示器（可选）

## 如何在代码中引用

图片放在 `public/images/` 目录下后，在代码中使用路径 `/images/...` 即可引用：

```jsx
// 示例
<img src="/images/home/hero/hero-main.jpg" alt="Hero" />
<img src="/images/about/banner/brand-banner.jpg" alt="Brand Banner" />
```

注意：使用 `/images/` 开头的路径，Vite 会自动从 `public` 目录提供服务。
