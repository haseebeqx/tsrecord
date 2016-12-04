
import {IDriver,IQueryResult} from "./IDriver";
import * as mysql from "mysql";
export class Mysql implements IDriver{

    private tableName :string;
    private elements :Array<string>;
    private subExpression
    private connection :any;
    private operation: string;
    private where :string;

    constructor(){
        this.elements = [];
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
    }

    getElementsString():string{
        if(this.elements.length==0){
            return "*";
        }
        return this.elements.join(", ")
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
        this.connection.query(statement, (err,rows,fields)=> {
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

    private generateStatement():string{
        if(this.operation=="SELECT"){
            return this.generateSelect();
        }
        throw new Error("UnSuported Operation");
    }

    private generateSelect():string{
        return this.operation+" "+this.getElementsString()+" FROM "+this.tableName;
    }
}
