# VUE前端模板库
请基于此模板创建项目  
***$repo***代表当前项目名称,同时也是实际的路由名称  

## 初始化说明
#### 项目创建
1. 🌈 修改 ***package.json*** 中的name字段为`$repo`
2. 🌈 修改 ***.github/workflows/deploy.yml*** 中的bucket位置,如非独立仓库,应为`oss://jx3box-www/$repo/`
3. 🌈 指定 ***.env*** 中的 [**`STATIC_PATH`**](#静态资源路径)

#### 项目启动
1. 🌈 `npm install` 安装依赖
2. ✨ `npm run serve` 启动本地服务

#### 项目修改
1. 🌈 修改***setting.json***文件,优化seo

#### 依赖说明
1. 🌈 默认基于vue + element ui,lib库请直接在public/$template中引用mirror地址
2. css变量默认包含 ***./assets/css/var.less*** 自定义变量
3. css mixin默认包含[csslab](https://github.com/iRuxu/csslab)

#### 部署上线
+ 🌈 添加项目secrets=>`AccessKey_ID`+`Access_Key_Secret`（公开仓库已共享指定密钥、私有库需要单独设置）
+ 🌈 （可选）如需要绑定独立域,需在github setting中指定并修改DNS指向.
+ 🆘 （可选）统一rewrite请补填至apidocs仓库
+ ✨ ecs需自行部署,执行`git deploy`同步gh-pages分支.

## 其它说明
#### 静态资源路径  
默认通过 ***.env*** 文件中 **`STATIC_PATH`** 来指定加载路径,可选值:  
1. 🌍 jsdelivr - 自动回源到github pages  
2. 🌸 root - 使用相对路径,且项目为独立域时
3. 🌷 repo - 使用相对路径,且项目没有独立域时
4. 💟 mirror - 使用OSS=>CDN镜像 【当前默认】

#### 部署集
github pages与oss由actions自动部署,ecs自行部署
1. 🌍 github pages - 国外访问endpoint
2. 💖 ecs - 国内访问endpoint 【当前默认】
3. 💟 oss - 国内备用方案,当DNS解析为整站CDN时生效  

#### DNS解析
目前为境外解析至github,境内解析为ecs
1. 🌍 github pages - 国外直接解析到github
2. 💖 ecs - 国内A记录至指定ECS 【当前默认】
3. 💟 oss - 国内备用方案,整站CDN,自动回源至oss
