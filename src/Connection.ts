class Connection{

    private static conn :any;

    static addConnection(connecton:any,name:string = "default"){
        this.conn[name] = connecton;
    }

    static getConnection(name:string="default"){
        return this.conn[name];
    }
}