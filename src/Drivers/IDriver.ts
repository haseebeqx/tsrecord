export interface IDriver
{
    setTable(table :string);
    getTable() :string;
    getName();
    setElements(elements :Array<string>);
    // getElementsString(): string;
    getElementsArray() :Array<string>; 
    beginTransaction() :string;
    commit(): string;
    rollBack(): string;
    setConnection(options :any);
    select();
    execute(callback:(result :IQueryResult)=>void);
    where(first :string,operator :string,second:string)
   // getConnection(): string;
}

export interface IQueryResult{
    rows :any[];
    fields :any;
}