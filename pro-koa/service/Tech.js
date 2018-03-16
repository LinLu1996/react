var jsondb = require('lo-jsondb');
var pokemons = jsondb('pokemons', {pretty: true});
class Tech {
    async addTech(tech) {
        if(tech.id){
            console.log(tech.id);
            let zu =tech.id.substr(0,1);
            let zuxian = pokemons.findOne(zu);
            let ids =tech.id.split('-');
            let parent =getParent(ids);
            if(parent.children){
                tech.child.id =parent.children.length+1;
            }else{
                tech.child.id=1;
                parent.children =[];
            }
            parent.children.push(tech.child);
            await pokemons.save(zuxian);
   
        }else{
            await pokemons.save(tech);
        }
        return await pokemons.find();
    };
    async init(){
        return await pokemons.find()
    }
}
function getParent(ids,idx,parent){
    if(!parent){
        idx =0;
        parent =pokemons.findOne(+ids[idx])
    }else{
        let arr =parent.children.filter(item=>{
            return item.id ==ids[idx]
        });
        parent =arr[0];
    }
    if(idx ==ids.length-1){
        return parent;
    }else{
        idx++;
        return getParent(ids,idx,parent);
    }
}
module.exports = new Tech();