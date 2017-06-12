$(function() {
    var li = $(".school-nav li");
    li.css("width", 100 / li.length + "%");
    $(".slider").css({
        width: 100 / li.length + "%"
    });
    $(".school-nav li").click(function(e) {

        // make sure we cannot click the slider
        if ($(this).hasClass('slider')) {
            return;
        }

        /* Add the slider movement */

        // what tab was pressed
        var whatTab = $(this).index();

        // Work out how far the slider needs to go
        var nav_width = $(".school-nav").width();
        var howFar = (nav_width / li.length) * whatTab;
        $(".slider").css({
            left: howFar + "px",
            width: 100 / li.length + "%"
        });

        /* Add the ripple */

        // Remove olds ones
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple'></span>");

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;

        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");

        var index = $(this).index();
        $("#detailwz>div").hide();
        $("#detailwz>div").eq(index).show().parent().css("height", "auto");
        $(".major_wzp-more").unbind("click").removeClass("show");
        detail();
    });


    var li2 = $(".zhuanye-nav li");
    li2.css("width", 100 / li2.length + "%");
    $(".slider").css({
        width: 100 / li2.length + "%"
    });
    $(".zhuanye-nav li").click(function(e) {

        // make sure we cannot click the slider
        if ($(this).hasClass('slider')) {
            return;
        }

        /* Add the slider movement */

        // what tab was pressed
        var whatTab = $(this).index();

        // Work out how far the slider needs to go
        var nav_width = $(".zhuanye-nav").width();
        var howFar = (nav_width / li2.length) * whatTab;
        $(".slider").css({
            left: howFar + "px",
            width: 100 / li2.length + "%"
        });

        /* Add the ripple */

        // Remove olds ones
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple'></span>");

        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;

        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");

        var index = $(this).index();
        $("#detailwz>div").hide();
        $("#detailwz>div").eq(index).show().parent().css("height", "auto");
        $(".major_wzp-more").unbind("click").removeClass("show");
        detail();
    });
    //专业折叠
    $("#major_alllist").on('click', '.major-name', function(e) {
        var parent = $(this).parent(".major_all");
        if (parent.hasClass('selet') || $(".major_class").is(':animated')) {
            //修改为展开再次点击则收起
            $(".major_class").slideUp("first");
            parent.removeClass("selet");
            return false;
        }
        parent.siblings().removeClass("selet");
        $(".major_class").slideUp("first");
        parent.addClass("selet");
        parent.find(".major_class").slideDown("first");
    });
    // showmore();
    
})

function detail() {
    //文字详情展开
    var zywz_height = $("#detailwz").height();
    var font_size = parseInt($("html").css("font-size"));
    var wzcon = zywz_height / font_size;
    var more = $(".major_wzp-more");
    if (wzcon > 10) {
        $("#detailwz").css("height", "auto");
        more.css("display", "block");
        more.text("全部展开");
        more.on('click', function() {
            if (more.hasClass('show')) {
                $(this).removeClass("show");
                $(this).text("全部展开");
                $("#detailwz").css("height", "auto");
            } else {
                $(this).addClass("show");
                $(this).text("全部收起");
                $("#detailwz").css("height", "auto");
            }
        });
    } else {
        more.css("display", "none");
        more.removeClass("show");
        more.text("全部收起");
    }
}

function showMoreJh() {

    var key = 1;
    var year = $('#year').val();
    var province = $('#province').val();
    var subject = $('#subject').val();
    var tbody = window.document.getElementById("planinfo");

    $.ajax({
        type: "post",
        dataType: "json",
        url: "./sql.php",
        data: {
            key: key,
            year: year,
            province: province,
            subject: subject
        },
        success: function(data) {
            var str = "";
            for (i in data) {
                str += "<tr>" +
                    "<td>" + data[i].major + "</td>" +
                    "<td>" + data[i].plan + "</td>" +
                    "<td>" + data[i].nature + "</td>" +
                    "<td>" + data[i].tuition + "</td>" +
                    "</tr>";
            }
            tbody.innerHTML = str;
        },
        error: function() {
            alert("未查询到相关数据，请重新设置查询条件")
        }
    });

}

function showMoreFs() {

    var key = 2;
    var year = $('#year').val();
    var province = $('#province').val();
    var subject = $('#subject').val();
    var tbody = window.document.getElementById("planinfo");

    $.ajax({
        type: "post",
        dataType: "json",
        url: "./sql.php",
        data: {
            key: key,
            year: year,
            province: province,
            subject: subject
        },
        success: function(data) {
            var str = "";
            for (i in data) {
                str += "<tr>" +
                    "<td>" + data[i].year + "</td>" +
                    "<td>" + data[i].batch + "</td>" +
                    "<td>" + data[i].minscore + "</td>" +
                    "<td>" + data[i].controlline + "</td>" +
                    "</tr>";
            }
            tbody.innerHTML = str;
        },
        error: function() {
            alert("查询失败")
        }
    });

}

function showMoreZy() {

    var key = 3;
    var year = $('#year2').val();
    var province = $('#province2').val();
    var subject = $('#subject2').val();
    var tbody = window.document.getElementById("info");

    if (province == '江苏' || province == '新疆') {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "./sql.php",
            data: {
                key: key,
                year: year,
                province: province,
                subject: subject
            },
            success: function(data) {
                var str = "";
                for (i in data) {
                    str += "<div class='table-block'>" +
                        "<div class='block-title'>" +
                        "<p>专业：<span>" + data[i].major + "</span></p>" +
                        "</div>" +
                        "<div class='item-content'>" +
                        "<div class='block-item border-r'><span>" + data[i].minscore +"</span><p>最低分</p></div>" +
                        "<div class='block-item border-r'><span>" + data[i].avgscore +"</span><p>平均分</p></div>" +
                        "<div class='block-item border-r'><span>" + data[i].enroll +"</span><p>录取人数</p></div>" +
                        "<div class='block-item'><span class='itemremarks'>" + data[i].remarks +"</span><p>备注</p></div>" +
                        "</div></div>";
                }
                tbody.innerHTML = str;
            },
            error: function() {
                alert("查询失败")
            }
        });
    }else {
        key = 4;
        $.ajax({
            type: "post",
            dataType: "json",
            url: "./sql.php",
            data: {
                key: key,
                year: year,
                province: province,
                subject: subject
            },
            success: function(data) {
                var str = "";
                for (i in data) {
                    str += "<div class='table-block'>" +
                        "<div class='block-title'>" +
                        "<p>专业：<span>" + data[i].major + "</span></p>" +
                        "</div>" +
                        "<div class='item-content'>" +
                        "<div class='block-item2 border-r'><span>" + data[i].minscore +"</span><p>最低分</p></div>" +
                        "<div class='block-item2 border-r'><span>" + data[i].avgscore +"</span><p>平均分</p></div>" +
                        "<div class='block-item2 border-r'><span>" + data[i].enroll +"</span><p>录取人数</p></div>" +
                        "</div></div>";
                }
                tbody.innerHTML = str;
            },
            error: function() {
                alert("查询失败")
            }
        });
    }


}

//答案超过3行 折叠
function fold(){
    $(".answer").each(function(){
        var answer_height = $(this).height();
        var answer_size = parseInt($(".answer").css("line-height"));
        var answer_line= answer_height/answer_size;
        if(answer_line>3){
            $(this).css({"overflow":"hidden","-webkit-line-clamp":"3"});
            $(this).after("<div class='more show'></div>");
        }
    })
    $(".askcon li").on("click",".more",function(){
        if($(this).hasClass("show")){
            $(this).prev(".answer").css({"overflow":"visible","display":"block"});
            $(this).removeClass("show");
            $(this).addClass("hider");
        }else{
            $(this).prev(".answer").css({"overflow":"hidden","display":"-webkit-box"});
            $(this).removeClass("hider");
            $(this).addClass("show");
        }
    });
}