const db=require('./Db');
class User{
    async regist(users){
        let id =0;
        await db.exec('insert into users set ?', users)
        .then(rows => {
             console.log(rows);
             id=rows.insertId
        })
        .catch(e => {
            console.log(e)
        })
        return id;
    }
    async login(user){
        let r=null;
        await db.exec('select currentAuthority,username from users where mail=? and password=?',[user.userName,user.password])
            .then(rows =>{
                console.log(rows);
                if(rows[0]){
                    console.log("======="+rows[0])
                    r={};
                    r.currentAuthority=rows[0].currentAuthority;
                    r.username=rows[0].username;
                }
            })
            .catch(e =>{
                console.log(e);
            })
            return r;
    }
}
const user=new User()
module.exports =user;