# api版本的定义
1. api版本由大版本号和小版本号构成，形如 vX.Y，X为大版本号，Y为小版本号。

2. 当 api 有破坏性变化时，比如修改接口参数、返回值等导致前端必须修改才能维持原样功能时，大版本号会逐一增加，如v1.0、v2.0等；

3. 当 api 为非破坏性变化时，比如添加新的接口，调整接口背后的实现等不影响原有接口定义的变化时，小版本号会逐一增加，如v0.1、v0.2等。

4. 为方便查看当前项目的 api 版本，根目录下会有一个以 api 版本命名的文件，之后每次 api 版本更新时，记得同时修改该文件的 api 版本。