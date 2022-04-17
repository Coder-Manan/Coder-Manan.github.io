/*
functions to toggle b/w tabs
*/

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}


function addTask(){
    document.getElementById("add").show();    
}

class Task {
    static no = 0;
    static coll = [];
    constructor(desc, date, time) {
        this.desc = desc;
        this.due_date = date;
        this.due_time = time;
        document.getElementById("all_tasks").innerHTML += `<button type="button" class="collapsible">${this.desc}    ${this.due_date} ${this.due_time}</button><div class="content">${this.desc}</div>`;
        no++;
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