$(function (){
    //进来获取用户信息
    getUsr();
    function getUsr(){
        $.ajax({
                url: "php/usr.php",
                type: "GET",
                data: {"act" : "check"},
                success:function (data) {
                    //alert(data);
                    var $data_JSON = eval('('+data+')');
                    var $author = $data_JSON.article_author;
                    console.log($author);
                    var $article_author = $author;
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
                            url:"php/getlist.php",
                            type:"GET",
                            data: {"article_author": $article_author , "act" : "tab_page"},
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
                    //进来加载文章内容
                    getBlog(1);
                    function getBlog(number){
                        //清空之前内容
                        $("#blog-list").html("");
                        $.ajax({
                            url:"php/jiazai.php",
                            type:"GET",
                            data:{"article_author": $article_author, "act" : "load"},
                            success:function (data) {
                                var obj = eval('('+data+')');
                                //获取页数
                                var list_number = number;
                                //alert(obj);
                                //遍历数据库里的文章并依次输出
                                $.each(obj,function (key,value) {
                                    var $blog = creatBlog(value);
                                    //插入节点
                                    $("#blog-list").prepend($blog);
                                });
                                //删除（页数-1）*5 份文章
                                for (var j = 0;j<(list_number-1)*5;j++){
                                    $(".item:first-child").remove();
                                }
                                //如果数量大于5，删除早先的文章
                                while ($(".item").length > 5) {
                                    $(".item:last-child").remove();
                                }

                            }
                        })
                    }
                    //创建文章节点的方法
                    function creatBlog(obj) {
                        var $link = "article.html?article_id="+obj.article_id+ "&article_author="+$article_author;
                        var $blog = $("<div class=\"item\">\n" +
                            "        <div class=\"item-title\">\n" +
                            "            <h4>"+obj.article_title+"</h4>\n" +
                            "        </div>\n" +
                            "        <div class=\"item-content\">\n" +
                            "            <p>"+obj.article_bi+"</p>\n" +
                            "        </div>\n" +
                            "        <div class=\"item-bottom\">\n" +
                            "            <span>"+obj.editor_time+"</span>\n" +
                            "            <a href="+$link+">评论</a>\n" +
                            "            <a href="+$link+">详情</a>\n" +
                            "        </div>\n" +
                            "        <p style=\"display: none\">"+obj.article_id+"</p>\n" +
                            "    </div>")
                        return $blog;
                    }
                }
            })
    }
});