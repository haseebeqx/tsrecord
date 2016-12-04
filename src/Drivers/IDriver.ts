export interface IDriver
{
    setTable(table :string);
    getTable() :string;
    getName();
    setElements(elements :Array<string>);
    getElementsString(): string;
    getElementsArray() :Array<string>; 
    beginTransaction() :string;
    commit(): string;
    rollBack(): string;
    setConnection(options :any);
    select();
    execute(callback:(result :IQueryResult)=>void);
   // getConnection(): string;
}

export interface IQueryResult{
    rows :any[];
    fields :any;
}