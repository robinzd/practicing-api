import moment, { Moment } from 'moment'

export const searchFilter =  async (filter:any, search:any,search_list:any)=>{
    return new Promise( async (resolve) => {
        type search_ObjectKey = keyof typeof search_list;
        let keyval='' as search_ObjectKey;
        if(filter!=null &&  search!=''){
            for(const k in filter){
                keyval=filter[k];
                await checkKey(search,keyval,search_list).then((data: any) => {resolve(data);return;});
            }
        }
    });
};


//async function checkKey(search:any,keyval:any,search_key_val:any,Subkey:any={}){
const checkKey = async(search:any,keyval:any,search_key_val:any,Subkey:any={}) => {
    return new Promise( (resolve) => {
        let bigint_fields:any=["contact_no","alternative_contact_no","firm_contact_no","spoc_contact_no"];
        let date_fields:any=["created_at"];
        let search_val:any;
        let objectkeyflag:number=0;
        let new_search_key_val:any;
        let shouldSkip = false;
        let responsecolumn:any={};
        let subcolumn:any={};
        let KeyColumn:any={};
        let chkkeyval='';
        let search_key:any='';
        let arrCheck:boolean=false;
        Object.keys(search_key_val).forEach(async function(key, index) {
            if (!shouldSkip) {
                chkkeyval=JSON.parse(JSON.stringify(key));
                new_search_key_val=search_key_val[chkkeyval];
                arrCheck=Array.isArray(new_search_key_val);
                if(!arrCheck && typeof new_search_key_val == 'object'){
                    if(keyval in new_search_key_val){
                        search_key=new_search_key_val[keyval];
                        if(Object.keys(Subkey).length === 0){
                            KeyColumn[chkkeyval]=key;
                        }else{
                            KeyColumn=Subkey;
                        }
                        arrCheck=Array.isArray(search_key);
                        objectkeyflag=1;
                        shouldSkip = true;
                    }else{
                        Object.keys(new_search_key_val).filter(async key =>{ 
                            if(typeof new_search_key_val[key] == 'object'){
                                Subkey[chkkeyval]=key; 
                                arrCheck=Array.isArray(new_search_key_val[key]);
                                if(!arrCheck){
                                    resolve(await checkKey(search,keyval,new_search_key_val,Subkey)); 
                                    return;
                                }
                            }else{
                                Subkey={};
                            }
                        })
                        Subkey={};
                    }
                }else if(chkkeyval==keyval){
                    search_key=new_search_key_val;
                    objectkeyflag=2;
                    shouldSkip = true;
                }
            }
        });
        if(shouldSkip && objectkeyflag>0){
            if(bigint_fields.includes(search_key)){
                search_val=Number(search);
                if(typeof search_val == 'number' && !isNaN(search_val)){
                    subcolumn[search_key]=BigInt(search_val);
                }
            }else if(date_fields.includes(search_key)){
                let search_date_val:any =new Date(search);
                let whereDate:any;
                if(search_date_val.toString() === 'Invalid Date'){
                    search.replace(/-/g, "/"); 
                    whereDate = moment(search,'DD/MM/YYYY').format('YYYY-MM-DD')
                }else{
                    whereDate=search_date_val.toISOString().split('T')[0];
                }
                let start_date:any=new Date(whereDate +' 00:00:00');
                let end_date:any=new Date(whereDate +' 23:59:59');
                subcolumn[search_key]={ lte: start_date,gte:end_date};
            }else{
                search=search.toString();
                subcolumn[search_key]={ "contains": search};
            }
            if(arrCheck){
                let subcolumnArr:any=[];
                Object.values(search_key).forEach(function(item){
                    let new_key_search:any=item;
                    let a1: any={};
                    a1[new_key_search]=subcolumn[search_key];
                    subcolumnArr.push(a1)
                })
                delete subcolumn[search_key];
                subcolumn={'OR':subcolumnArr};
            }
            if(objectkeyflag==1){
                let newkeyColumn:any={};
                let newsubkey:any={};
                for(let key in KeyColumn){
                    let newkeyval:any;
                    if(typeof KeyColumn[key] == 'object'){
                        while(typeof KeyColumn[key] == 'object'){
                            newkeyval=KeyColumn[key];
                            newkeyColumn[key]=newkeyval;
                            key=newkeyval;
                        }
                        newkeyColumn[newkeyval]=subcolumn;
                    }else{
                        newkeyval=KeyColumn[key];
                        if(newkeyval!=key){
                            newsubkey[newkeyval]=subcolumn;
                            newkeyColumn[key]=newsubkey;
                        }else{
                            newkeyColumn[newkeyval]=subcolumn;
                        }
                      
                    }  
                }
                responsecolumn=newkeyColumn;
            }else{
                responsecolumn=subcolumn;
            }
        } 
        if(Object.keys(responsecolumn).length>0){
            resolve(responsecolumn);
            return;
        }
    });
}
