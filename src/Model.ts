import {Builder} from "./Builder";
import {Helper} from "./Helper";
export class Model implements IModel{
    private builder :Builder;
    private columns;
    protected tableName;
    protected key;

    save(){
        let helper = new Helper();
        this.columns = helper.getParams(this);
        if(this.key==undefined){
            this.key = "id";
        }
        if(this.tableName==undefined){
            this.tableName = helper.getTableName(this);
        }
        var operation = "I";//insert
        if(this.builder!=undefined){
            operation="U";
        }
        this.builder = new Builder();
        let insert :Object = {};
        for(let i = 0;i<this.columns.length;i++){
            insert[this.columns[i]]=this[this.columns[i]];
        }
        var result;
        if(operation=="U"){
            result =this.builder.table(this.tableName).where(this.key,insert[this.key]).update(insert);
        }else{
            result = this.builder.table(this.tableName).insert(insert);
        }
        return result;
    }

    all(callback:(model :  IModel[])=>void){
        if(this.builder==undefined){
            let helper = new Helper();
            this.columns = helper.getParams(this);
            if(this.tableName==undefined){
                this.tableName = helper.getTableName(this);
            }
            this.builder = new Builder();
        }
        this.builder.table(this.tableName).getAll((result)=>{
            let retArray = [];
            
            for(let i=0;i<result.rows.length;i++){
                retArray[i]= Object.create( this);
                for(let j in result.rows[i]){
                    retArray[i][j] = result.rows[i][j];
                }
            }
            callback(retArray);
        });
    }

    first(callback:(model :IModel)=>void){
        if(this.builder==undefined){
            let helper = new Helper();
            this.columns = helper.getParams(this);
            if(this.tableName==undefined){
                this.tableName = helper.getTableName(this);
            }
            this.builder = new Builder();
        }
        this.builder.table(this.tableName).getOne((result)=>{
            var ret = Object.create(this);
            if(result.rows.length>0)
            for(let j in result.rows[0]){
                ret[j]= result.rows[0][j];
            }
            callback(ret);
        });
    }
    
    where(w:(builder :Builder)=>void):Model;
    where(key: string,value:any) :Model;
    where(key:string,operator:string,value:any):Model
    where(...args):Model{
        if(this.builder==undefined){
            let helper = new Helper();
            this.columns = helper.getParams(this);
            if(this.tableName==undefined){
                this.tableName = helper.getTableName(this);
            }
            this.builder = new Builder();
        }
        this.builder.where(arguments[0],arguments[1],arguments[2]);
        return this;
    }

    orWhere(w:(builder :Builder)=>void):Model;
    orWhere(key: string,value:any) :Model;
    orWhere(key:string,operator:string,value:any):Model
    orWhere(...args):Model{
        if(this.builder==undefined){
            let helper = new Helper();
            this.columns = helper.getParams(this);
            if(this.tableName==undefined){
                this.tableName = helper.getTableName(this);
            }
            this.builder = new Builder();
        }
        this.builder.orWhere(arguments[0],arguments[1],arguments[2]);
        return this;
    }
    delete(){
        if(this.builder==undefined){
            let helper = new Helper();
            if(this.tableName==undefined){
                this.tableName = helper.getTableName(this);
            }
            this.builder = new Builder();
        }
        this.builder.table(this.tableName).delete();
    }


}

export interface IModel{
    save();
}