import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
    data() {
        return {
            itemListener: null,
        }
    },
    mounted() {
        // 1.图片加载完成的事件监听
        // 监听事件总线里GoodListItem发射出来的事件
        const refresh = debounce(this.$refs.wrapper.refresh, 50);
        this.itemListener = () => {
            refresh();
        }
        // 当实例挂载，监听全局事件
        this.$bus.$on("itemImageLoad", this.itemListener);
        // console.log("混入内容")
    }
}

export const backTopMixin = {
    data() {
        return {
            isShow: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.wrapper.scrollTo(0, 0);
        }
    }
}