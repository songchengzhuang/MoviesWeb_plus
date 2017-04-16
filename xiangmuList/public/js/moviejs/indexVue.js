/**
 * Created by Administrator on 2017/3/19.
 * 电影首页的vue.js用于数据绑定
 */
new Vue({
    el: "#my_index",
    data: {
        limitNum: 5,
        movieList: []
    },
    filters: {},
    mounted: function () {
        this.$nextTick(function () {
            this.filmdetail();
        })
    },
    methods: {
        filmsuc: function (data, status) {

            this.movieList = data.movies;
            console.log("测试数据1:" + data.movies._id);
            console.log("测试index状态:" + status);
        },

        filmdetail: function () {

            $.ajax({
                type: 'GET',
                url: "/film/index",//从那个路由获取数据。
                dataType: "json",//服务器返回的数据类型
                success: this.filmsuc,
                error: function (err) {
                    console.log("测试错误：" + err);
                }
            })
        }
    },
    computed: {
        filterMovies: function () {
            return this.movieList.slice(0, this.limitNum);
        }
    }
});