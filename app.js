new Vue({
    el:'#app',
    data(){
        return{
            is_white_light:true,
            show_menu:false,
            show_calc:true,
            input_val:'0',
            numbers:[],
            actions:[],
            fake_inp_val:'',
            history:[],
            buttons:[
                {
                    val:'AC',
                    class:'erase',
                    func:this.clear_inp
                },{
                    val:'ᐸ',
                    class:'erase',
                    func:this.minus_symbol
                },{
                    val:'%',
                    class:'action',
                    func:this.set_val
                },{
                    val:'/',
                    class:'action',
                    func:this.set_val
                },{
                    val:'7',
                    class:'',
                    func:this.set_val
                },{
                    val:'8',
                    class:'',
                    func:this.set_val
                },{
                    val:'9',
                    class:'',
                    func:this.set_val
                },{
                    val:'*',
                    class:'action',
                    func:this.set_val
                },{
                    val:'4',
                    class:'',
                    func:this.set_val
                },{
                    val:'5',
                    class:'',
                    func:this.set_val
                },{
                    val:'6',
                    class:'',
                    func:this.set_val
                },{
                    val:'-',
                    class:'action',
                    func:this.set_val
                },{
                    val:'1',
                    class:'',
                    func:this.set_val
                },{
                    val:'2',
                    class:'',
                    func:this.set_val
                },{
                    val:'3',
                    class:'',
                    func:this.set_val
                },{
                    val:'+',
                    class:'action',
                    func:this.set_val
                },{
                    val:'+/-',
                    class:'',
                    func:this.set_val
                },{
                    val:'0',
                    class:'',
                    func:this.set_val
                },{
                    val:'.',
                    class:'',
                    func:this.set_val
                },{
                    val:'=',
                    class:'action',
                    func:this.counter
                },
            ]
        }
    },
    computed:{
        light_mode(){
            if (this.is_white_light) {
                return ''
            }
            return 'dark_light_mode'
        },
        menu_class(){
            if (this.show_menu){
                return ['menu', 'active']
            }
            return 'menu'
        },
        calc_btn_class(){
            if (this.show_calc) {
                return 'active'
            }
            return ''
        },
        convert_btn_class(){
            if (!this.show_calc) {
                return 'active'
            }
            return ''
        }
    },
    methods:{
        clear_inp: function(){
            this.input_val = '0'
            this.numbers = []
            this.actions = []
        },
        minus_symbol: function(){
            if (this.input_val == '') {
                this.input_val = '0'
            }
            if (this.input_val[this.input_val.length-1] == this.actions[this.actions.length-1]) {
                this.actions.pop()
                if (this.actions.length == 0 || this.fake_inp_val == '') {
                    this.numbers.pop()
                } else {
                    this.fake_inp_val = ''
                }
            }
            this.input_val = this.input_val.substring(0, this.input_val.length-1)
        },
        set_val: function(el){
            if (this.input_val == '0') {
                this.input_val = ''
            }
            if (this.actions.length != 0) {
                this.fake_inp_val += el.val
            }
            if (el.class == 'action') {
                if (this.actions.length == 0) {
                    this.numbers.push(Number.parseInt(this.input_val))
                    console.log('push input_val')
                } else {
                    this.numbers.push(Number.parseInt(this.fake_inp_val))
                    console.log('push fake_input_val')
                }
                this.actions.push(el.val)
                this.fake_inp_val = ''
            }
            this.input_val +=  el.val
        },
        calculator: function(f_i, s_i, act){
            switch (act) {
                case '+':
                    return f_i + s_i
        
                case '-':
                    return f_i - s_i
        
                case '*':
                    return f_i * s_i
        
                case '/':
                    return f_i / s_i
            }
        },
        main_actions: function(){
            if (this.actions.includes('*') || this.actions.includes('/')) {
                this.actions.includes('*')
                ?index = this.actions.indexOf('*')
                :index = this.actions.indexOf('/')
            
                console.log(this.numbers);
            
                this.numbers.splice(index, 1, this.calculator(this.numbers[index], this.numbers[index+1], this.actions[index]))
                this.numbers.splice(index+1, 1)
                this.actions.splice(index, 1)
            
                console.log(this.numbers)
            }
        },
        finaly: function(){
            this.actions.forEach(act=>{
                index = this.actions.indexOf(act)
                this.numbers.splice(index, 1, this.calculator(this.numbers[index], this.numbers[index+1], act))
                this.numbers.splice(index+1, 1)
                this.actions.splice(index, 1)
                this.finaly()
            })
        },
        counter: function(){
            if (this.fake_inp_val!='') {
                this.numbers.push(Number.parseInt(this.fake_inp_val))
            } else {
                return
            }
            this.history.unshift(this.input_val)
            this.actions.forEach(el=>{
                this.main_actions()
            })
            this.finaly()
            this.input_val = this.numbers[0].toString()
            this.history[0]+=`=${this.input_val}`
            this.numbers = []
            this.fake_inp_val=''
        }
    }
})