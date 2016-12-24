# tsrecord
ActiveRecord implementation using Typescript

# Conventions
### table name
1. table name is plural it's corresponding class name should be its singular. for example the class `Flight` is equivalent to the table `flights`
2. table name should be in lower case snake_case and its corresponding class name should be in CamelCase. example: `person_names` table will have equivalent class `PersonName`

# Example
### Basic Table Mapping
example for table `flights`

    ###  table structure  ###
    id int auto increment
    name varchar(50)
    route_from varchar(100)
    route_to varchar(100)

the equivalent model class in typescript will be

```typescript
class Flight extends Model{
    public id :number;
    public name :string;
    public route_from :string;
    public route_to :string;
}
```

or if you dont want the advatages of adding field names

```typescript
Class Flight {

}

```

now we can use this class for accessing the table

### Basic Create Operation

you can insert data to the `flights` table like this.

```typescript
var a = new Flight();
a.name = "Air india"
a.route_from = "india";
a.route_to = "Singapore";
a.save();
```

### Basic Read Operation

you can perform Database Read in the Following Format

```typescript
var a = new Flight();
a.all(
    (flight :Flight[])=>{
        console.log(flight);
    }
);
// or a.all(function(flight :Flight){...})
// but the former format will preserve 'this' from current class context
```

also if you don't want adavatages of adding `:Flight[]` you can use `:any`

here we get data to the callback function inside `all` method as an array of `Flight` object.

### Read One Record

```typescript
var a = new Flight();
a.all(
    (flight :Flight)=>{
        console.log(flight.name); //Air india
        console.log(flight.route_from) //india
        console.log(flight.route_to) //Singapore
    }
);
```