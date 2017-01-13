export function TableOverride(meta :TableMeta){
    return function(constructor:Function){
        constructor.prototype.tableName = meta.tableName;
        constructor.prototype.key = meta.key;
    }
}
interface TableMeta{
    tableName? :string;
    key? :string;
}