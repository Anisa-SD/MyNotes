module.exports={
    resolve:{
        fallback: {
             "util": require.resolve("util/"),
             "assert": require.resolve("assert/"),
             "os": require.resolve("os-browserify/browser"),
        },
    },
    node: {
        child_process: "empty",
        fs: "empty" // if unable to resolve "fs"
    },
};