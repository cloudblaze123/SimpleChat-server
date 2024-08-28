// run npm dev 后
// 可切换以下两行的注释以测试 tsx 监听 .ts 文件的变化后自动重启应用的效果
const to = "typescript & tsx!"
// const to = "World!"

function sayhi(){
    console.log("Hello,", to);
}

export { sayhi };