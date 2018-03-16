const db = require('./Db');
class Question {
    async addQuestion(question) {
        console.log(question.type)
        let types = null;
        switch (question.type) {
            case ('选择题'):
                delete question.type;
                await db.exec("insert into question set ?", question)
                    .then(rows => {
                        //  console.log(rows);
                    })
                    .catch(e => {
                        console.log(e)
                    })
                break;
            case ('问答题'):
                delete question.type;
                await db.exec("insert into question_wenda set ?", question)
                    .then(rows => {
                        //  console.log(rows);
                    })
                    .catch(e => {
                        console.log(e)
                    })
                break;
            default:
                break;
        }
    };
    async queryQuestion(types){
        let map ={};
        await db.exec(`select id,title,types from question where locate('${types}',types) =1`)
            .then(rows =>{
                map.选择题=rows;
            })
            .then(() =>{
                return db.exec(`select id,title,types from question_wenda where locate('${types}',types) =1`)
            })
            .then(rows =>{
                map.问答题=rows;
            })
            .catch(e =>{
                console.log(e);
            })
            return map;
    }
}
const question = new Question()
module.exports = question;