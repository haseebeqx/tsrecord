export function TableOverride(meta :TableMeta){
    return function(constructor:Function){

    }
}
interface TableMeta{
    tableName? :string;
    key? :string;
}