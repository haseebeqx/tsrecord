
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
     * Get the count of results
     */
    count(callback:(result :IQueryResult)=>void);
    /**
     * Perform a delete operation.
     */
    delete();

    /**
     * Execute a Query
     * @param {function} callback - callback function to run when execution is success
     */
    execute(callback:(result :IQueryResult)=>void);

    /**
     * Where Part of an Expression
     * @param {string} column - first parameter
     * @param {string} operator - Operator used in Where
     * @param {any} value - Second Parameter
     */
    where(column :string,operator :string,value:any);

    /**
     * Where Part of an Expression joined by Or.
     * @param {string} column - first parameter
     * @param {string} operator - Operator used in Where
     * @param {any} value - Second Parameter
     */
    orWhere(column: string,operator:string,value :any);

    /**
     * Limit Number Of columns returned
     * @param {number} offset -offset
     * @param {number} count -Number Of rows to return
     */
    limit(offset:number,count:number);

    /**
     * Add InnerWhere Part 
     * @param {string} where - The Where Part.
     * @param {array} args - the arguments for where part
     */
    addInnerWhere(where :InnerWhere);

    /**
     * Add Inner OrWhere Part
     */
    addInnerOrWhere(where :InnerWhere);
    
    /**
     * Get Where Part only.
     * for using as innerwhere
     */
    getWhere():InnerWhere;
    
    /**
     * Clear Driver
     */
    clear();
    
    /**
     * Generate an OrderBy.
     * @param {string} column -the column name
     * @param {string} order -ASC or DESC
     */
    orderBy(column:string,order :string);

    /**
     * Insert statement
     */
    insert(obj :Object,...objs:Object[]);

    /**
     * Update a Record
     * @param {Object}
     */
    update(obj :Object);
}

/**
 * callback Result interface
 */
export interface IQueryResult{
    rows :any[];
    fields :any;
}

export interface InnerWhere{
    where :string;
    args :any[];
}