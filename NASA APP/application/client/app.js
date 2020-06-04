const searchComponent = {
    template : ` 
            <div class="card" >
            <div class="card-header">
               <p  style="color:#222831" class="text_style"> search history <p>
            </div>
            <ul class="list-group list-group-flush">
            <li v-for="i in previoussearches" class="p-3 mb-2 bg-danger text-white"  @click="previousinformation(i)"
            style="cursor:pointer;" data-toggle="modal" >{{i.title}}  | {{i.date}}</li>
            </ul>
            </div>`,
        props : {
        previoussearches: {
            name:'previoussearches'
            }     
         },
          methods : {
            previousinformation : function(itemclicked){
            this.$parent.showdetail(itemclicked)
            }
        }   
    }
  
const app = new Vue({
    el: '#IMG',
    data: {
        appName: 'Astro Images APP',
        ListofImg: [],
        selected: '',
        usereSearchkey:'',
        detailFlag: false,
        start:0,
        end:4,
        selectedItem:{},  
        previoussearches :[],
        options: [
        { text: 'select menu' },
        { text: 'Jupiter', value: 'Jupiter' },
        { text: 'Pulsar', value: 'Pulsar' },
        { text: 'Mars', value: 'Mars' },
        { text: 'saturn', value: 'saturn' },
        { text: 'nebula', value: 'planetary nebula' } ]    
     
    },
    
    methods: {
    
          search_pic: async function(Searchkey) {
            this. clear()
            ListofImg=[]
            this.selected=Searchkey
            const searchresponse = await axios.post(`http://localhost:8888/api/search_pic?searck_key=${this.selected}`)
            this.ListofImg = searchresponse.data;        
        },
        next:function() {
                
                this.start=this.end
                this.end=this.end+4
    
               
            }
            ,
         showdetail: function(item) {
          
            this.selectedItem=item;
            this.detailFlag=true
    
           // search history, date format
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;

            
            //no duplicates of titles/names in the "History".
            if( this.previoussearches.length === 0){
                
                    this.previoussearches.push({
                        title:item.title,date:today,url:item.url
                    })
            }else if(this.previoussearches.length  >0 ){
                      
                    let result = this.previoussearches.filter(o => o.title === item.title)  
                    console.log(result.length)
                    if(result.length===0)
                    this.previoussearches.push({
                        title:item.title,date:today,url:item.url
                    })
                }
              
    
               
            },
            clear:function() {
                this.detailFlag=false
                this.selectedItem={}
                this.ListofImg=[]
            }
                
    }, components:{
        'searchComponent':searchComponent
    },
        computed: {
            
        resultLength: function () {
            // update the Reamining Result  with nextList button
            return this.ListofImg.length-this.end
            }
        }

})
