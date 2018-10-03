$(function () {
    //获取当前用户信息
    $.ajax({
        url: "php/usr.php",
        type: "GET",
        success:function (data) {
            var msg = eval('('+data+')');
            var $article_author = msg.article_author;
            //0.监听内容的时时输入
            $("body").delegate("#article-content" , "propertychange input",function () {
                //判断是否输入了内容
                if ($(this).val().length > 0){
                    //让按钮可用
                    $("#article-post").prop("disabled", false);
                }
                else {
                    //让按钮不可用
                    $("#article-post").prop("disabled", true);
                }
            });
            //1.监听发布按钮的点击
            $("#article-post").click(function () {
                //拿到用户输入的内容
                var $article_title = $("#article-title").val();
                console.log($article_title);
                var $article_bi = $("#article-bi").val();
                console.log($article_bi);
                var $article_content = $("#article-content").val();
                console.log($article_content);
                var $myDate = new Date();
                var $time = formartDate($myDate)
                alert($time);
                var obj = {
                    "article_author" : $article_author,
                    "article_title" : $article_title,
                    "article_bi" : $article_bi,
                    "article_content" : $article_content,
                    "editor_time" : $time,
                    "act" : "edit"
                };
                //发送给后端，将内容存进数据库，并跳转回博客页面
                $.ajax({
                    url:"",
                    type:"GET",
                    data:obj,
                    success:function (data) {
                        var msg = eval('('+data+')');
                        if (msg.num == 1){
                            window.location.href = "blog.html";
                        }
                        else {
                            alert("发表失败！");
                        }
                    },
                    error(xml){
                        alert(xml.status);
                    }

                })
                //暂时放着
                window.location.href = "blog.html";
            })
        },
        error:function (xml) {
            alert(xml.status);
        }
    })
    //创建文章节点的方法
    function creatBlog(obj) {
        var $link = "article.html?article_id="+obj.article_id;
        var $blog = $("<div class=\"col-sm-8 item\">\n" +
            "        <div class=\"item-title\">\n" +
            "            <h4>"+obj.article_title+"</h4>\n" +
            "        </div>\n" +
            "        <div class=\"item-image\">\n" +
            "            <img src=\"images/blog-background.png\">\n" +
            "        </div>\n" +
            "        <div class=\"item-content\">\n" +
            "            <p>"+obj.article_bi+"</p>\n" +
            "        </div>\n" +
            "        <div class=\"item-bottom\">\n" +
            "            <span>"+obj.editor_time+"</span>\n" +
            "            <a href="+$link+">评论</a>\n" +
            "            <a href="+$link+">详情</a>\n" +
            "        </div>\n" +
            "    </div>")
        return $blog;
    }
    // 生成时间方法
    function formartDate(time) {
        var arr = [time.getFullYear() + "-",
            time.getMonth() + 1 + "-",
            time.getDate() + " ",
            time.getHours() + ":",
            time.getMinutes() + ":",
            time.getSeconds()];
        return arr.join("");
    }
})