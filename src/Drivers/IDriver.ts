namespace tsrecord.Drivers
{
    interface IDriver
    {
        setTable(table :string);
        getTable() :string;
        setElements(elements :Array<string>);
        getElements(): string;
        getElementsArray() :Array<string>; 
        subExpression(expression :IDriver);
        beginTransaction();
        commit();
        rollBack();
    }
}