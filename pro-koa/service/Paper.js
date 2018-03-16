const db = require('./Db');
class Paper {
    async addPaper(paper) {
        let paperList = null;
        await db.exec("insert into paper set ?", paper)
            .then(() => {
                return db.exec("select id,title from paper")
            })
            .then(rows => {
                paperList = rows;
            })
            .catch(e => {
                console.log(e)
            })
        return paperList;
    };
    async queryPaper(){
        let papers =null;
        await db.exec("select id,title from paper")
            .then(rows =>{
                papers =rows;
            })
            .catch(e =>{
                console.log(e)
            })
        return papers;
    }
}
const paper = new Paper()
module.exports = paper;