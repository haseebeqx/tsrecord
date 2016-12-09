
/**
 * Sql Driver Interface
 */
export interface IDriver
{
    /**
     * Set Table name
     * @param {string} table - The Table Name
     */
    setTable(table :string);

    /**
     * Get Table name
     * @return {string} The Table Name
     */
    getTable() :string;

    /**
     * Get Name Of the Driver
     */
    getName():string;

    /**
     * Set Column names to Select for select statement
     * @param {Array} elements -the list of elements as an array
     */
    setElements(elements :Array<string>);

    /**
     * Get the Column names passed using setElements
     * @return {Array} 
     */
    getElementsArray() :Array<string>; 

    /**
     * Initialize a Database Transaction
     */
    beginTransaction() :string;

    /**
     * Commit A Database Transaction
     */
    commit(): string;

    /**
     * RollBack A Database Transaction
     */
    rollBack(): string;

    /**
     * Set Connection Options for Database
     * @param {any} options - Connection Object or String 
     */
    setConnection(options :any);

    /**
     * Set the Operation as Select
     */
    select();

    /**
     * Execute a Query
     * @param {function} callback - callback function to run when execution is success
     */
    execute(callback:(result :IQueryResult)=>void);

    /**
     * Where Part of an Expression
     * @param {string} first - first parameter
     * @param {string} operator - Operator used in Where
     * @param {any} second - Second Parameter
     */
    where(first :string,operator :string,second:any);

    /**
     * Limit Number Of columns from and to
     * @param {number} offset -offset
     * @param {number} count -Number Of rows to return
     */
    limit(offset:number,count:number);
}

/**
 * callback Result interface
 */
export interface IQueryResult{
    rows :any[];
    fields :any;
}