import {IDriver,IQueryResult} from "./Drivers/IDriver";
import {DriverConfig} from "./DriverConfig";
import {Config} from "./Config";

export class Builder{

    constructor(driver? :IDriver,connection? :any){
        if(driver == undefined){
            this.driver = DriverConfig.default();
        }else{
            this.driver = driver;
        }
        if(connection == undefined){
            let conn =this.driver.getName();
            this.driver.setConnection(Config[conn]);
        }
    }

    private driver :IDriver;

    setConnection(name :string){
        this.driver = Connection.getConnection(name);
    }

    table(table :string)    :Builder
    {
        this.driver.setTable(table);
        return this;
    }

    getAll(callback:(result :IQueryResult)=>void)
    {
        this.driver.select();
        this.driver.execute(callback);
    }


    where(first: string,second:any) :Builder;
    where(first:string,operator:string,second:any) : Builder;
    where(first:string,operator:string,second?:string): Builder{
        if(second==undefined){
            second = operator;
            operator = "=";
        }
        this.driver.where(first,operator,second);
        return this;
    }

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