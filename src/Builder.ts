import {IDriver,IQueryResult} from "./Drivers/IDriver";
import {DriverConfig} from "./DriverConfig";
import {Config} from "./Config";

/**
 * Query Builder class
 */
export class Builder{

    private driver :IDriver;

    constructor(driver? :IDriver,connection? :any){
        if(driver == undefined){
            this.driver = DriverConfig.default();
        }else{
            this.driver = driver;
        }
        if(connection == undefined){
            let conn =this.driver.getName();
            this.driver.setConnection(Config[conn]);
        }else{
            this.driver.setConnection(connection);
        }
    }

    /**
     * Set The Driver by its Name
     * @param {string} name - Name of Connection
     */
    setConnection(name :string){
        this.driver = Connection.getConnection(name);
    }

    /**
     * Set Table Name.
     * @param {string} name -The Table to be used.
     */
    table(table :string)    :Builder
    {
        this.driver.setTable(table);
        return this;
    }

    /**
     * Set The Columns for select 
     * @param {string} column -First Column.
     * @param {string[]} columns -Rest of the columns
     */
    take(column :string,...columns :string[]){
        let elements :Array<string>= [column];
        if(columns!=undefined){
            this.driver.setElements(elements.concat(columns));
        }else{
            this.driver.setElements(elements);
        }
        return this;
    }

    /**
     * Get Results.
     *  with an option of Limiting number of results returned
     * 
     */
    get(callback:(result :IQueryResult)=>void);
    get(callback:(result :IQueryResult)=>void, count :number);
    get(callback:(result :IQueryResult)=>void,offset :number, count :number);
    get(callback:(result :IQueryResult)=>void,offset? :number, count? :number){
        this.driver.select();
        if(offset!=undefined&&count!=undefined){
            this.driver.limit(offset,count);
        }else if(offset!=undefined){
            this.driver.limit(0,offset);
        }
        this.driver.execute(callback);
    }

    /**
     * Get All Results
     */
    getAll(callback:(result :IQueryResult)=>void){
        this.driver.select();
        this.driver.execute(callback);
    }

    /**
     * Get One Result
     */
    getOne(callback:(result :IQueryResult)=>void){
        this.driver.select();
        this.driver.limit(0,1);
        this.driver.execute(callback);
    }

    /**
     * Where implementation for "="
     * @param {string} key - Column Name
     * @param {any} value - Value
     */
    where(key: string,value:any) :Builder;
    /**
     * Where implementation.
     * @param {string} key - Column Name
     * @param {string} operator - Operator 
     * @param {any} value - value
     */
    where(key:string,operator:string,value:any) : Builder;
    where(first:string,operator:string,second?:string): Builder{
        if(second==undefined){
            second = operator;
            operator = "=";
        }
        this.driver.where(first,operator,second);
        return this;
    }

    /**
     * Sets The Driver using Object
     * @return Builder
     */
    setDriver(driver ) :Builder
    {
        this.driver = driver;
        return this;
    }

    getDriver()
    {
        return this.driver;
    }
}