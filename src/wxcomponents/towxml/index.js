const md = require('./parse/markdown/index'),
    parse = require('./parse/index')

// module.exports = (str,type,option)=>{
//     option = option || {};
//     let result;
//     switch (type) {
//         case 'markdown':
//             result = parse(md(str),option);
//         break;
//         case 'html':
//             result = parse(str,option);
//         break;
//         default:
//             throw new Error('Invalid type, only markdown and html are supported');
//         break;
//     };
//     return result;
// };


module.exports = (str,type,option)=>{
    option = option || {};
    let result;
    switch (type) {
        case 'markdown':
            let r = md(str)
            // 添加如下代码，过滤 \r\n
            r = r.replace(/(\r|\n){1,}/g, str => {
                return new Array(str.length).join("<p>&nbsp;</p>")
            });
            r = r.replace(/\r|\n/g, str => {
                return "\r"
            });

            result = parse(r,option);
        break;
        case 'html':
            result = parse(str,option);
        break;
        default:
            throw new Error('Invalid type, only markdown and html are supported');
        break;
    };
    return result;
};