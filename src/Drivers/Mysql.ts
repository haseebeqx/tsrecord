import {IDriver} from "./IDriver";

class Mysql implements IDriver{
    private tableName :string;
    private elemets :Array<string>;
    private subExpression
    setTable(table :string){
        this.tableName = table;
    }

    getTable():string{
        return this.tableName;
    }

    setElements(elements :Array<string>){
        this.elemets = elements;
    }

    getElementsString():string{
        return this.elemets.join(", ")
    }

    getElementsArray() :Array<string>{
        return this.elemets;
    }

    beginTransaction():string{
        return "START TRANSACTION";
    }
    commit(): string{
        return "COMMIT";
    }
    rollBack(){
        return "ROLLBACK";
    }
}