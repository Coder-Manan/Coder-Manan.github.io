document.getElementById("all").style.display="none";
document.getElementById("completed").style.display="none";    
document.getElementById("missed").style.display="none";

var alltasks = [];
var completedtasks = [];
var missedtasks = [];
document.getElementById("all").innerHTML = `You have ${alltasks.length} pending task(s)<br>`+document.getElementById("all").innerHTML;

function moveToComplete(){

}

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}

function addFinal(){
    d = new Date(document.getElementById("dt_input").value);
    if (isNaN(d.getTime()) == false){
        console.log((new Date).toLocaleDateString())
        if (document.getElementById("task_input").value!="" && d>(new Date)){
            alltasks.push(new Task(document.getElementById("task_input").value, d));
            console.log(alltasks.length);        
            document.getElementById("add").close();
            document.getElementById("task_input").value="";
            document.getElementById("dt_input").value="";
            document.getElementById("dialog_error").innerHTML="";
            document.getElementById("body").style.display="block";
            return 0;
        }
    }
    document.getElementById("dialog_error").innerHTML="Invalid Data. Enter again";
}

function addTaskDialog(){
    document.getElementById("body").style.display='none';
    document.getElementById("dialog").style.display="block";
    document.getElementById("add").show();

}

class Task {
    constructor(desc, date_time) {
        this.desc = desc;
        this.due_date_time = date_time;
        document.getElementById("all_tasks").innerHTML += `<div>${this.desc} <br>due at ${this.due_date_time.toLocaleDateString()} ${this.due_date_time.toLocaleTimeString('en-IN')}<button type="button">Add to Completed</button></div>`;
        console.log(alltasks.length);        
    }
}