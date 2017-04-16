/**
 * Created by Administrator on 2017/4/11.
 */
new Vue({
    el: "#user_list",
    data: {
        userList: [],
        updatepw: ''
    },
    filters: {},
    mounted: function () {
        this.$nextTick(function () {
            this.userdetail();
        })
    },
    methods: {
        usersuc: function (data, status) {

            this.userList = data.users;
            console.log("测试数据1:" + data.users._id);
            console.log("测试状态:" + status);
        },

        userdetail: function () {

            $.ajax({
                type: 'GET',
                url: "/admin/list",//从那个路由获取数据。
                dataType: "json",//服务器返回的数据类型
                success: this.usersuc,
                error: function (err) {
                    console.log("测试错误：" + err);
                }
            })
        },

        updatePassword: function (user) {
            this.updatepw = user;
            console.log("修改：" + this.updatepw.name);
        }
    }
});