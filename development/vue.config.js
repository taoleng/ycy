const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
    configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            // 【必须】生成文件的路径，也可以与webpakc打包的一致
            staticDir: path.join(__dirname, "dist"),
            // 【必须】对应自己的路由文件，如路由有参数，则需写成 /a/param1
            routes: ["/", "/login"],
            //【可选】服务器端口配置
            // server: {
            //   port: 8188
            // },
            // 这个很重要，如果没有配置这段，也不会进行预编译
            renderer: new Renderer({
              inject: {
                foo: "bar"
              },
              headless: false,
              // 对应 src/main.js 中 document.dispatchEvent(new Event('custom-render-trigger'))，两者的事件名称要相同
              renderAfterDocumentEvent: "custom-render-trigger"
            })
          })
        ]
      };
    }
  }
}
