$(function () {
    //监听分页兰的点击
    $("body").delegate(".nav-bar .nav-link", "click" , function () {
        $(this).addClass("change");
        $(this).siblings().removeClass("change");
        console.log($(this).html());
        getBlog($(this).html());
    })
    //进来获取页码信息
    getlist(1);
    function getlist(number) {
        $("#nav-bar").html("");
        $.ajax({
            url:"php/getlist1.php",
            type:"GET",
            data: {"act" : "tab_page"},
            success:function (data) {
                var obj = eval('('+data+')');
                for (var i = 0;i<obj.count;i++){
                    var $a = $("<a class=\"nav-link\" href=\"#\">"+(i+1)+"</a>");
                    $("#nav-bar").append($a);
                }
                if (number == 1){
                    $("#nav-bar a").first().addClass("change");
                }
                return number;
            }
        })
    }
    //进来即加载所有文章列表信息
    //进来加载文章内容
    getBlog(1);
    function getBlog(number){
        //清空之前内容
        $("#list-group").html("");
        $.ajax({
            url:"php/jiazai1.php",
            type:"GET",
            data:{"act" : "load"},
            success:function (data) {
                var obj = eval('('+data+')');
                //获取页数
                var list_number = number;
                //alert(obj);
                //遍历数据库里的文章并依次输出
                $.each(obj,function (key,value) {
                    var $blog_list = creatBlogList(value);
                    //插入节点
                    $("#list-group").prepend($blog_list);
                });
                //删除（页数-1）*10 份文章
                for (var j = 0;j<(list_number-1)*10;j++){
                    $(".list-group-item:first-child").remove();
                }
                //如果数量大于10，删除早先的文章
                while ($(".list-group-item").length > 10) {
                    $(".list-group-item:last-child").remove();
                }

            }
        })
    }

    //创建博客列表的方法
    function creatBlogList(obj) {
        var $link = "article.html?article_id="+obj.article_id + "&article_author="+obj.article_author;
        var $blog_list = $("<a href="+$link+" class=\"list-group-item list-group-item-action\">"+obj.article_author+"\n" +
            "        <span>"+obj.article_title+"</span>\n" +
            "        <input style=\"display: none\" value="+obj.article_id+"></a>")
        return $blog_list;
    }
})