import {Mysql} from "./Drivers/Mysql";

export class DriverConfig {
    static mysql = ()=> new Mysql();
    static default = DriverConfig.mysql;
}