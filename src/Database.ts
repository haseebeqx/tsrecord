import { Config } from './Config';
import { DriverConfig } from './DriverConfig';
import { IDriver } from './Drivers/IDriver';

export class Database{
    private driver;
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

    sqlCommand(){
        
    }

    sqlQuery(){

    }
}