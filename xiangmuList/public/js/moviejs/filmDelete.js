/**
 * Created by Administrator on 2017/3/21.
 */
function filmdel(e) {
    e = e || event
    var target = $(e.target);
    var id = $.trim(target.parent().parent().children("td:eq(0)").text());
    var deltr = target.parent().parent();

    var movie = confirm("您要删除【" + $.trim(deltr.children("td:eq(2)").text()) + "】视频吗");

    if (movie == true) {
        $.ajax({
            type: 'DELETE',//删除 操作
            url: "/film/delete?id=" + id,
            dataType: "json"//服务器返回的数据类型
        })
            .done(function (res) {      //done成功时执行
                if (res.success === 1) {
                    if (deltr.length > 0) {
                        deltr.remove();
                        alert("删除成功。");
                    }
                }
            })
    }
    else {
        alert("你取消了删除操作。");
    }
}