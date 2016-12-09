
import {IDriver,IQueryResult} from "./IDriver";
import * as mysql from "mysql";
export class Mysql implements IDriver{

    private tableName :string;
    private elements :Array<string>;
    private elementPlaceHolder: Array<string>;
    private subExpression
    private connection :any;
    private operation: string;
    private wherePart :string;
    private whereArgs: any[];
    private args: any[];


    constructor(){
        this.elements = [];
        this.whereArgs = [];
        this.elementPlaceHolder=[];
        this.wherePart = "";
    }

    getName():string{
        return "MySql";
    }
    setTable(table :string){
        this.tableName = table;
    }

    getTable():string{
        return this.tableName;
    }

    setElements(elements :Array<string>){
        this.elements = elements;
        for(let i=0;i<elements.length;i++){
            elements.push("??");
        }
    }

    private getElementsString():string{
        if(this.elements.length==0){
            return "*";
        }
        return this.elementPlaceHolder.join(",");
    }

    getElementsArray() :Array<string>{
        return this.elements;
    }

    beginTransaction():string{
        return "START TRANSACTION";
    }
    commit(): string{
        return "COMMIT";
    }
    rollBack(){
        return "ROLLBACK";
    }

    setConnection(options :any){
        this.connection = mysql.createConnection(options);
    }

    select(){
        this.operation = "SELECT";
        
    }

    execute(callBack :(result :IQueryResult)=>void){
        if(this.operation==undefined){
            throw new Error("operation is undefined");
        }
        if(this.tableName == undefined){
            throw new Error("Table Name Not Set");
        }
        let statement = this.generateStatement();
        this.connection.connect();
        this.connection.query(statement,this.args, (err,rows,fields)=> {
            if(err){
                throw err;
            }
            let output :IQueryResult ={
                rows : rows,
                fields:fields
            };
            callBack(output);
        });
        this.connection.end();
    }

    where(property :string,operator:string,value:any){
        if(this.wherePart!=""){
            this.wherePart += " AND ";
        }
        this.wherePart  += "?? "+operator+" ?";
        this.whereArgs.push(property,value);
    }
    private generateStatement():string{
        if(this.operation=="SELECT"){
            return this.generateSelect();
        }
        throw new Error("UnSuported Operation");
    }

    private generateSelect():string{
        let select= this.operation+" "+this.getElementsString()+" FROM "+this.tableName+" WHERE "+this.wherePart;
        this.args = this.elements.concat(this.whereArgs);
        return select;
    }
}
