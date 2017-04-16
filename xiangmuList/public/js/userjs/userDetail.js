/**
 * Created by Administrator on 2017/4/11.
 */
new Vue({
    el: "#user_detail",
    data: {
        user: {
            //格式化表单
            _id: 'undefined',
            name: '',
            password: '',
            age: '',
            role: '',
            mate: ''
        }
    },
    filters: {},
    mounted: function () {
        this.$nextTick(function () {
            this.userdetail();
        })
    },
    methods: {
        usersuc: function (data, status) {

            this.user = data.user;
            console.log("测试状态:" + status);
        },

        userdetail: function () {

            var _id;
            var url = window.location.href;//获取当前页面的 地址栏url
            var id = url.substring(url.lastIndexOf('/') + 1);//用substring找到url最后一个'/'的位置,substring取+1 位置 到url字符串末尾 的 值

            if (id !== 'undefined') {
                $.ajax({
                    type: 'POST',
                    url: '/admin/changdetail',
                    data: {_id: id},//向服务器发送的数据
                    dataType: "json",//服务器返回的数据类型
                    success: this.usersuc,
                    error: function (err) {
                        console.log("测试错误：" + err);
                    }
                })
            }
        }
    }
})