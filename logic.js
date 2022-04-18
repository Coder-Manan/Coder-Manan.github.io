/*
functions to toggle b/w tabs
*/

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
        if (document.getElementById("task_input").value!=""){
            alltasks.push(new Task(document.getElementById("task_input").value, d));
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
    no = 0;
    static coll = [];
    constructor(desc, date_time) {
        this.desc = desc;
        this.due_date_time = date_time;
        document.getElementById("all_tasks").innerHTML += `<button type="button" class="collapsible">${this.desc}    ${this.due_date} ${this.due_time}</button><div class="content">${this.desc}</div>`;
        no++;
        console.log(no);
        coll = document.getElementsByClassName("collapsible");
        coll[no - 1].addEventListener("click", function() {
            this.classlist.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display=="block"){
                content.style.display="none";
            }
            else{
                content.style.display="block";
            }
        })
    }
}