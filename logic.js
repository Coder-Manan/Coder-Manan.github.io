document.getElementById("all").style.display="none";
document.getElementById("completed").style.display="none";    
document.getElementById("missed").style.display="none";

const firebaseConfig = {
    apiKey: "AIzaSyDo-fp_VBZcxFu5yYJEKAS0AhA3vTxElqE",
    authDomain: "js-todo-b1146.firebaseapp.com",
    databaseURL: "https://js-todo-b1146-default-rtdb.firebaseio.com",
    projectId: "js-todo-b1146",
    storageBucket: "js-todo-b1146.appspot.com",
    messagingSenderId: "991444055494",
    appId: "1:991444055494:web:6192b2f6db828387fbaec7"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var alltasks = [];
var completedtasks = [];
var missedtasks = [];
let n = 0;
document.getElementById("all").innerHTML = `You have ${alltasks.length} pending task(s)<br>`+document.getElementById("all").innerHTML;

function moveToComplete(){

}

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}
function writeUserData(description, date_time) {
    db.collection(`alltasks/`).add({
        desc: description,
        due_date_time: date_time
    }).then((docRef)=>{
        console.log("written with id: ", docRef.id);
        n++;
        alltasks.concat([docRef.id]);
        document.getElementById("all").innerHTML = `You have ${n} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33);})
    .catch((error)=>{console.log("error while writing: ", error);});
  }
function addTaskToDB(){
    // d = new Date(document.getElementById("add").childNodes[1].value);
    // if (isNaN(d.getTime())){
    //     console.log(1);
    // }
    // else{
    //     console.log((new Date).toLocaleDateString())
    //     if (document.getElementById("task_input").value!="" && (d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
    //         alltasks.push(new Task(document.getElementById("task_input").value, d));
    //         console.log(alltasks.length);        
    //         writeUserData(`${(new Date).toUTCString()}`, `${document.getElementById("task_input").value}`, `${d}`);
    //         document.getElementById("add").close();
    //         document.getElementById("task_input").value="";
    //         document.getElementById("dt_input").value="";
    //         document.getElementById("dialog_error").innerHTML="";
    //         document.getElementById("body").style.display="block";
    //         document.getElementById("all").innerHTML = `You have ${alltasks.length} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33);
    //         return 0;
    //     }
    //     console.log(2);
    // }
    // document.getElementById("dialog_error").innerHTML="Invalid Data. Enter again";
    d = new Date(document.getElementById("add").childNodes[1].value);
    if (isNaN(d.getTime())){
        console.log(1);
    }
    else{
        console.log((new Date).toLocaleDateString())
        if (document.getElementById("task_input").value!="" && (d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
            //alltasks.push(new Task(document.getElementById("task_input").value, d));
            //console.log(alltasks.length);
            document.getElementById("add").close();
            document.getElementById("loading").style.display="block";        
            db.collection(`alltasks/`).add({
                desc: `${document.getElementById("task_input").value}`,
                due_date_time: `${d.toUTCString()}`
            }).then((docRef)=>{
                console.log("written with id: ", docRef.id);
                n++;
                alltasks = alltasks.concat(`${[docRef.id]}`);
                console.log(alltasks);
                document.getElementById
                document.getElementById("all").innerHTML = `You have ${n} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33);
                document.getElementById("task_input").value="";
                document.getElementById("dt_input").value="";
                document.getElementById("dialog_error").innerHTML="";
                document.getElementById("loading").style.display="none";        
                document.getElementById("body").style.display="block";})
            .catch((error)=>{console.log("error while writing: ", error);});
            return 0;
        }
        console.log(2);
    }
    document.getElementById("dialog_error").innerHTML="Invalid Data. Enter again";
}

function addTaskDialog(){
    document.getElementById("body").style.display='none';
    document.getElementById("dialog").style.display="block";
    document.getElementById("add").show();

}

function reschedule(x){
    //load dialog box, input date and update due_date_time of reqd object
    console.log('9');
}

class Task {
    constructor(desc, date_time) {
        this.desc = desc;
        this.due_date_time = date_time;
        this.category = "all";
        document.getElementById("all_tasks").innerHTML += `<div>${this.desc} <br>due at ${this.due_date_time.toLocaleDateString()} ${this.due_date_time.toLocaleTimeString('en-IN')}<button type="button">Add to Completed</button><button onclick=${this.reschedule()} >Reschedule</button></div>`;
        console.log(alltasks.length);        
    }

    reschedule(){
        console.log(1);
    }
    
    completed(){
        //remove task from alltasks array
        alltasks = alltasks.filter(function(ele){
            return ele != this;
        });
        completedtasks.push(this);
    }
    
}