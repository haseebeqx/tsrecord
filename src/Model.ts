import {Builder} from "./Builder";
import {Helper} from "./Helper";
export class Model implements IModel{
    save(){
        let helper = new Helper();
        let columns = helper.getParams(this);
        let table = helper.getTableName(this);
        let insert :Object = {};
        for(let i = 0;i<columns.length;i++){
            insert[columns[i]]=this[columns[i]];
        }
        let builder = new Builder();
        var result = builder.table(table).insert(insert);
        return result;
    }

     all(callback:(model :  IModel[])=>void){
        let helper = new Helper();
        let columns = helper.getParams(this);
        let table = helper.getTableName(this);
        let builder = new Builder();
        builder.table(table).getAll((result)=>{
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
}

export interface IModel{
    save();
}