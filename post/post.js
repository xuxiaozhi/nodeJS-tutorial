var http=require("http");
var queryString=require("querystring");
var server=http.createServer(function (req,res) {
    if(req.url=="/dopost"&&req.method.toLocaleLowerCase()=="post"){

        // 定义了一个post变量，用于暂存请求体的信息
        var allData="";

        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.addListener("data",function (chunk) {
            allData+=chunk;
        })

        //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.addListener("end",function () {
            var dataString=allData.toString();
            var dataObj=queryString.parse(dataString);
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
            res.write(dataObj.name+"的年龄是："+dataObj.age);
            res.end();
        })
    }
})

server.listen(8080,"127.0.0.1");