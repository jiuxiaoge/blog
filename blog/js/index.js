$(function () {
    //获取点击事件
    $("#left").click(function () {
        $(".container").html("<form class=\"container-form-login\">\n" +
            "    <div class=\"form-group\">\n" +
            "        <label for=\"usr\">用户名:</label>\n" +
            "        <input type=\"text\" class=\"form-control\" id=\"usr\" placeholder=\"请输入您的账户\">\n" +
            "    </div>\n" +
            "    <div class=\"form-group\">\n" +
            "        <label for=\"pwd\">密码:</label>\n" +
            "        <input type=\"password\" class=\"form-control\" id=\"pwd\" placeholder=\"请输入您的密码\">\n" +
            "    </div>\n" +
            "    <div class=\"login-button\">\n" +
            "        <button id=\"login\" type=\"button\" class=\"btn btn-outline-success\">登陆</button>\n" +
            "    </div>\n" +
            "</form>")
        $("#login").click(function () {
            window.location.href = "blog.html";
            //接受用户输入的信息
            var $usr = $("#usr").val();
            var $pwd = $("#pwd").val();
            //发送登陆请求
            $.ajax({
                url:"",
                type:"GET",
                data:{"usr" : $usr,"pwd" : $pwd , "act" : "login"},
                success:function (data) {
                    var obj = eval('('+data+')');
                    //如果经数据库验证密码和用户名匹配则登陆成功，允许跳转
                    if (obj.num == 1){
                        window.location.href = "blog.html";
                    }
                    else {
                        alert("登陆失败，请前往注册！");
                        window.location.href = "index.html";
                    }
                },
                error:function (xml) {
                    alert(xml.status);
                }
            })
        })
    })
    $("#right").click(function () {
        $(".container").html("<form class=\"container-form-signup\">\n" +
            "    <div class=\"form-group\">\n" +
            "        <label for=\"usr\">用户名:</label>\n" +
            "        <input type=\"text\" class=\"form-control\" id=\"usr\">\n" +
            "    </div>\n" +
            "    <div class=\"form-group\">\n" +
            "        <label for=\"pwd\">密码:</label>\n" +
            "        <input type=\"password\" class=\"form-control\" id=\"pwd\">\n" +
            "    </div>\n" +
            "    <div class=\"form-group\">\n" +
            "        <label for=\"pwd\">确认密码:</label>\n" +
            "        <input type=\"password\" class=\"form-control\" id=\"pwd-again\">\n" +
            "    </div>\n" +
            "    <div class=\"signup-button\">\n" +
            "        <button id=\"signup\" type=\"button\" class=\"btn btn-outline-success\">注册</button>\n" +
            "    </div>\n" +
            "</form>")
        //注册事件
        $("#signup").click(function () {
            var $usr = $("#usr").val();
            var $pwd = $("#pwd").val();
            var $pwd_again = $("#pwd-again").val();
            //两次密码一致，允许注册，发送给后端数据
            if ($pwd === $pwd_again){
                $.ajax({
                    url: "",
                    type: "GET",
                    data:{"usr" : $usr, "pwd" : $pwd, "act" : "signup"},
                    success:function (data) {
                        var $obj = eval('('+data+')');
                        if ($obj.num == 1){
                            alert("恭喜您注册成功！关闭跳转！");
                            window.location.href="blog.html";
                        }
                        else {
                            alert("注册失败，用户名已存在");
                        }
                    },
                    error:function (xml) {
                        alert(xml.status);
                    }
                })
            }
        })
    })
})