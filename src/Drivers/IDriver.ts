export interface IDriver
{
    setTable(table :string);
    getTable() :string;
    setElements(elements :Array<string>);
    getElementsString(): string;
    getElementsArray() :Array<string>; 
    beginTransaction() :string;
    commit(): string;
    rollBack(): string;
}