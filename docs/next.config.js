const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = withNextra({
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: isProd ? '/yamlpress' : '',
    assetPrefix: isProd ? '/yamlpress/' : '',
})
