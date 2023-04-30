module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                debug: true,
                modules: false,
                forceAllTransforms: true,
                useBuiltIns: "usage",
                targets: "last 1 version, > 1%"
            }
        ]
    ]
};
