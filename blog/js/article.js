$(function (data) {
    //获取当前文章id和作者信息
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    var $id = getQueryString("article_id");
    console.log($id);
    var $author = getQueryString("article_author");
    console.log($author);
    //穿回后端获取文章
    $.ajax({
        url:"php/article.php",
        data:{"article_id" : $id, "article_author" : $author ,"act" : "load_article"},
        type:"GET",
        success:function (data) {
            var obj = eval('('+data+')');
            console.log(obj);
            //创建文章
            var $article = creatContent(obj);
            //添加
            $("#article").append($article);

        },
        error:function (xml) {
            alert(xml.status);
        }
    })
    //填写文章内容
    function creatContent(obj) {
        var $content = $("<div class=\"article row\">\n" +
            "    <div class=\"col-sm-2 article-title\">\n" +
            "        <h5>"+obj.article_title+"</h5>\n" +
            "        <p>"+$author+"</p>\n" +
            "        <p>"+obj.editor_time+"</p>\n" +
            "    </div>\n" +
            "    <div class=\"col-sm-10 article-content\">\n" +
            "        <p>"+obj.article_content+"</p>\n" +
            "    </div>\n" +
            "</div>")
        return $content;
    }




    //评论的功能
    //加载
    $.ajax({
        url: "php/comment.php",
        type: "GET",
        data: {"article_id" : $id, "act" : "load_comment"},
        success: function (data) {
            console.log(data);
            var $obj = eval('(' + data + ')');
            $.each($obj, function (key, value) {
                //根据内荣创建节点
                var $comment = creatComment(value);
                //插入节点
                $("#comment-list").prepend($comment);
            })
        },
        error: function (xml) {
            alert(xml.status)
        }
    })
    //获取当前用户信息
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

                $.ajax({
                    url: "php/usr.php",
                    type: "GET",
                    data:{"act" : "check"},
                    success: function (data) {
                        var $comment_author = getUsr();
                        //0.监听内容的时时输入
                        $("body").delegate("#comment-content", "propertychange input", function () {
                            //判断是否输入了内容
                            if ($(this).val().length > 0) {
                                //让按钮可用
                                $("#comment-post").prop("disabled", false);
                            }
                            else {
                                //让按钮不可用
                                $("#comment-post").prop("disabled", true);
                            }
                        });
                        //1.监听发布按钮的点击
                        $("#comment-post").click(function () {
                            //拿到用户输入的内容
                            var $comment_content = $("#article-comment").val();
                            console.log($comment_content);
                            var obj = {
                                "comment_author": $comment_author,
                                "comment_content": $comment_content,
                                "act" : "comment",
                            };
                            //发送给后端，将内容存进数据库,并刷新页面
                            $.ajax({
                                url: "",
                                type: "GET",
                                data: obj,
                                success: function (data) {
                                    var obj = eval('('+data+')');
                                    if (obj.num == 1){
                                        location.reload(true);
                                    }
                                    else {
                                        alert("评论失败");
                                    }
                                },
                                error: function (xml) {
                                    alert(xml.status);
                                }
                            })
                        })
                    },
                    error: function (xml) {
                        alert(xml.status);
                    }
                })
            }
        })
    }
    //创建评论的方法
    function creatComment(obj) {
        var $comment = $("<div class=\"col-sm-12 comment-content\">\n" +
            "        <div class=\"comment-usr\">\n" +
            "            <span>" + obj.comment_author + "</span>\n" +
            "        </div>\n" +
            "        <div class=\"comment-saying\">\n" +
            "            <p>" + obj.comment_content + "</p>\n" +
            "        </div>\n" +
            "    </div>")
        return $comment;
    }

})