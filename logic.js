/*
functions to toggle b/w tabs
*/
let today = new Date();
document.getElementById("all").style.display="none";
document.getElementById("completed").style.display="none";    
document.getElementById("missed").style.display="none";

function moveToComplete(){

}

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}
var alltasks = [];
function addFinal(){
    /*
    do some work
    */
   d = new Date(document.getElementById("dt_input").value);
	//if (Object.prototype.toString.call() === "[object Date]"){
    if (isNaN(d.getTime()) == false){
        //do some work and close dialog
        //compare with current date
        if (document.getElementById("task_input").value!="" && d<(new Date)){
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
    //}
    // else{
    //     console.log('1');
    // }
}

function addTaskDialog(){
    // const d = document.getElementById("body").style.display;
    // console.log(d);
    document.getElementById("body").style.display='none';
    document.getElementById("dialog").style.display="block";
    document.getElementById("add").show();

}

class Task {
    constructor(desc, date_time) {
        this.desc = desc;
        this.due_date_time = date_time;
        document.getElementById("all_tasks").innerHTML += `<div id="${gf}">${this.desc}    ${this.due_date_time.toUTCString()}<button type="button">Add to Completed</button></div>`;
        console.log(alltasks.length);        
    }
}