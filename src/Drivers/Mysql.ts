
import {IDriver,IQueryResult,InnerWhere} from "./IDriver";
import * as mysql from "mysql";

/**
 * Driver For Mysql
 */
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
    private limitStatement :boolean;
    private limitOffset :number;
    private limitCount :number;
    private orderByString :string[];
    private orderByArgs :string[];

    constructor(){
        this.elements = [];
        this.whereArgs = [];
        this.elementPlaceHolder=[];
        this.wherePart = "";
        this.limitStatement = false;
        this.orderByString = [];
        this.orderByArgs =[];
    }

    clear(){
        this.elements = [];
        this.whereArgs = [];
        this.elementPlaceHolder=[];
        this.wherePart = "";
        this.limitStatement = false;
        this.orderByString = [];
        this.orderByArgs = [];
    }
    /**
     * Returns "MYSQL"
     */
    getName():string{
        return "MYSQL";
    }

    /**
     * Set Table name
     * @param {string} table - The Table Name
     */
    setTable(table :string){
        this.tableName = table;
    }

    /**
     * Get Table name
     * @return {string} The Table Name
     */
    getTable():string{
        return this.tableName;
    }

    /**
     * Set Column names to Select for select statement
     * @param {Array} elements -the list of elements as an array
     */
    setElements(elements :Array<string>){
        this.elements = elements;
        for(let i=0;i<elements.length;i++){
            this.elementPlaceHolder.push("??");
        }
    }

    /**
     * Get The Elemets PlaceHolder string
     * @return {string} -placeholder array converted to string
     */
    private getElementsString():string{
        if(this.elements.length==0){
            return "*";
        }
        return this.elementPlaceHolder.join(",");
    }

    /**
     * Get the Column names passed using setElements
     * @return {Array} 
     */
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

    /**
     * Set Mysql Connection Object
     */
    setConnection(options :any){
        this.connection = mysql.createConnection(options);
    }

    /**
     * Specify the operation is a Select
     */
    select(){
        this.operation = "SELECT";
        
    }

    /**
     * Execute a Mysql Query
     * @param {function} callback - callback function to run when execution is success
     */
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

    /**
     * Where Part of an Expression
     * @param {string} first - first parameter
     * @param {string} operator - Operator used in Where
     * @param {any} second - Second Parameter
     */
    where(property :string,operator:string,value:any){
        if(this.wherePart!=""){
            this.wherePart += " AND ";
        }
        this.wherePart  += "?? "+operator+" ?";
        this.whereArgs.push(property,value);
    }

    /**
     * Generates an Sql Statement.
     * @return {string} Sql Query
     */
    private generateStatement():string{
        if(this.operation=="SELECT"){
            return this.generateSelect();
        }
        throw new Error("UnSuported Operation");
    }

    /**
     * Generates a Select Statement.
     * @return {string} Sql Query
     */
    private generateSelect():string{
        let select= this.operation+" "+this.getElementsString()+" FROM "+this.tableName;
        if(this.wherePart.length>0){
            select+=" WHERE "+this.wherePart;
        }
        if(this.limitStatement){
            select += "LIMIT "+this.limitOffset+" , "+this.limitCount;
        }
        this.args = this.elements.concat(this.whereArgs);
        if(this.orderByString.length>0){
            select += " ORDER BY"+this.orderByString.join(",");
            this.args = this.args.concat(this.orderByArgs);
        }
        return select;
    }

    /**
     * Limit Statement in Mysql
     * @param {number} offset -offset
     * @param {number} count -Number Of rows to return
     */
    limit(from:number,to:number){
        this.limitStatement = true;
        this.limitOffset = from;
        this.limitCount = to;
    }

    /**
     * Where Part of an Expression joined by Or.
     * @param {string} column - first parameter
     * @param {string} operator - Operator used in Where
     * @param {any} value - Second Parameter
     */
    orWhere(column: string,operator:string,value :any){
        if(this.wherePart!=""){
            this.wherePart += " OR ";
        }
        this.wherePart  += "?? "+operator+" ?";
        this.whereArgs.push(column,value);
    }

    /**
     * Return WherePart
     */
    getWhere():InnerWhere{
        return <InnerWhere>{
            where:this.wherePart,
            args:this.whereArgs
        };
    }

    /**
     * Add InnerWhere Part 
     * @param {string} where - The Where Part.
     * @param {array} args - the arguments for where part
     */
    addInnerWhere(where :InnerWhere){
        if(this.wherePart!=""){
            this.wherePart += " AND ";
        }
        this.wherePart +=" ( " +where.where+" ) ";
        this.whereArgs = this.whereArgs.concat(where.args);
    }

    /**
     * Add InnerOrWhere Part 
     * @param {string} where - The Where Part.
     * @param {array} args - the arguments for where part
     */
    addInnerOrWhere(where :InnerWhere){
        if(this.wherePart!=""){
            this.wherePart += " OR ";
        }
        this.wherePart +=" ( " +where.where+" ) ";
        this.whereArgs = this.whereArgs.concat(where.args);
    }

    orderBy(column:string,order :string){
        this.orderByString.push(" ?? "+order);
        this.orderByArgs.push(column);
    }
}
