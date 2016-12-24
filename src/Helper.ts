export class Helper{
    private rules = {
        s:"es",
        x:"es",
        z:"es",
    }
    private rulesr = {
        y:"ies"
    }
    private rules2 = {
        ch:"es"
    }
    getParams(obj){
       return  Object.getOwnPropertyNames(obj);
    }
    getTableName(obj:any){
        let name = obj.constructor.toString().match(/\w+/g)[1];
        return this.singularize(name);
    }
    singularize(str :string){
        var snake =  str.replace(/[A-Z]([A-Z](?![a-z]))*/g, function (x)
            {
                return "_" + x.toLowerCase()
            }).replace(/^_/, "");
        var pass1 = this.rules[snake.charAt(snake.length-1)];
        var word = snake;
        if(pass1!=undefined){
            console.log(pass1)
            word+=pass1;
        }
        else{
          var  pass2 = this.rules2[snake.slice(snake.length-2,snake.length)];
          var pass3 = this.rulesr[snake.charAt(snake.length-1)]
          if(pass2!=undefined){
              word = word+pass2
          }else if(pass3!=undefined){
              word = word.slice(0,word.length-1)+pass3
          }else{
              word = word+"s"
          }
        }
        return word;
    }
}