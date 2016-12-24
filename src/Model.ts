import {Builder} from "./Builder";
import {Helper} from "./Helper";
export class Model{
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
}