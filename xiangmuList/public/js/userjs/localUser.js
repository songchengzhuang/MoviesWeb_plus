//获取服务器的session
new Vue({
    el: "#my_nav",
    data: {
        sessionUser:''
    },
    filters: {},
    mounted: function () {
        this.$nextTick(function () {
            this.localuser();
        })
    },
    methods: {
        localuser: function () {

            $.ajax({
                type: 'GET',
                url: '/localuser',
                dataType: "json",//服务器返回的数据类型
                success: this.localusersuc,
                error: function (err) {
                    console.log("测试错误：" + err);
                }
            });
        },
        localusersuc: function (data, status) {

            this.sessionUser = data._user;
            console.log("测试状态001:" + status);
        }
    }
});