/**
 * 将字符串日期转换为Date对象
 * 日期字符串格式：年-月-日-时-分-秒-毫秒
 * 使用 UTC 时区
 * 注意，转换后的日期对象月份是从0开始的，所以要减1
 */
function stringToDate(dateString:string){
    const dateArr = dateString.split('-').map(Number);
    return new Date(Date.UTC(dateArr[0], dateArr[1]-1, dateArr[2], dateArr[3], dateArr[4], dateArr[5], dateArr[6]));
}


/**
 * 将日期对象转换为日期字符串
 * 日期字符串格式：年-月-日-时-分-秒-毫秒
 * 注意，转换后的日期字符串月份是从1开始的，所以要加1
 * 即 "2024-1-1-0-0-0-0" == Date(2024, 0, 1, 0, 0, 0, 0)
 */
function dateToString(date:Date){
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const millisecond = date.getMilliseconds();
    return `${year}-${month}-${day}-${hour}-${minute}-${second}-${millisecond}`;
}


/**
 * 将日期对象转换为 UTC 日期字符串
 */
function toUTCDateString(date:Date){
    // 获取各部分的 UTC 时间
    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth(); // 注意月份从 0 开始
    const utcDay = date.getUTCDate();
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    const utcSeconds = date.getUTCSeconds();
    const utcMilliseconds = date.getUTCMilliseconds();
    // 组装 UTC 时间字符串
    return `${utcYear}-${utcMonth+1}-${utcDay}-${utcHours}-${utcMinutes}-${utcSeconds}-${utcMilliseconds}`;
}


export { stringToDate, dateToString, toUTCDateString };