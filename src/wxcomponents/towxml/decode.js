const config = require('./config');
const { typeShowCbMap } = require('./typer');

Component({
	options: {
		styleIsolation: 'apply-shared'
	},
	properties: {
		nodes: {
			type: Object,
			value: {},
		}
	},
	lifetimes: {
		ready: function () {
			const _ts = this;
			config.events.forEach(item => {
				_ts['_' + item] = function (...arg) {
					if (global._events && typeof global._events[item] === 'function') {
						global._events[item](...arg);
					}
				};
			});
			// console.log("666666666666666666666666666666666")
			if (this.properties.nodes.children && this.properties.nodes.children.length > 0) {
				let c = 0
				for (let node of this.properties.nodes.children) {
					typeShowCbMap[node.id] = (resolve, index) => {
						if(node.id.startsWith("0-3-")){
							console.log("当前的nodei.id",node.id)
						}
						// console.log("执行普通组件中的cb", node.id, index)
						this.show(resolve, index);
					}
					this.data.isShow[c] = false
					c++
				}
			}
		}
	},
	data: {
		isShow: {}
	},
	methods: {
		show(resolve, index) {
			this.data.isShow[index] = true
			this.setData({
				[`isShow[${index}]`]: true
			});
			// console.log("this.data.isShow的值",this.data.isShow)
			resolve()
		}
	}
})