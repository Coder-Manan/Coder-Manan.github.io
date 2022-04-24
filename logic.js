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
const ref = db.ref;
var alltasks = [];
var allids=[];
var completedtasks = [];
var missedtasks = [];
var justtasks = [];
let n = 0;
document.getElementById("all").innerHTML = `<h1>All Tasks Tab</h1><br>`+document.getElementById("all").innerHTML;
let taskstring = "";
getalltasks();
getmissedtasks();
getcompletedtasks();
//document.getElementById("all_tasks").innerHTML=getalltasks();
// firebase.onValue(ref(db, 'alltasks'), (snapshot) => {
//     snapshot.forEach((Childsnapshot) =>{ justtasks.push(Childsnapshot.val())});
//     setDisplay(justtasks);});



var docRef = db.collection("alltasks");

// docRef.get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
function moveToComplete(){

};

function reschedule(id){
    document.getElementById("body").style.display="none";
    document.getElementById("reschedule").show();
    obj = alltasks.find(x=>(x.id===id));
    //document.getElementById("reschedule_dt").innerHTML=obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue;
    document.getElementById("reschedule_task_desc").innerHTML=obj._delegate._document.data.value.mapValue.fields.desc.stringValue;
    document.getElementById("reschedule_confirm_button").innerHTML=`<button onclick="reschedule_confirm('${id}')">Confirm</button>`;
}

function reschedule_confirm(id){
    console.log("reacged reschedule confirm")
    d = new Date(document.getElementById("reschedule_dt_input").value);
    if (isNaN(d.getTime())){
        console.log(1);
    }
    else if ((d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
        document.getElementById("reschedule").close();
        document.getElementById("loading").style.display="block";
        db.collection("alltasks").doc(`${id}`).update({"due_date_time": d.toLocaleString()}).then(()=>{document.getElementById("loading").style.display="none";document.getElementById("body").style.display="block"}).catch((error)=>{alert("Error has occurred... Contact Mono")});
        getalltasks().then(()=>{document.getElementById("loading").style.display="none";document.getElementById("body").style.display="block"})
    }
}

function getalltasks(){
    document.getElementById("body").style.display="none";        
    document.getElementById("loading").style.display="block";
    let str = "";
    let x=[];
    console.log("started");
        console.log("milstone1");
    db.collection("alltasks").get().then(function(querySnapshot) {
        x = querySnapshot.docs;
        console.log(x);
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        x.forEach((it) => {docRef = db.collection("alltasks").doc(it.id).get().then((doc)=>{alltasks.concat[doc.data()];alltasks[x.indexOf(it)].id=it.id})});
        console.log(x);
        alltasks=x;
        console.log(alltasks);
        alltasks.forEach((item)=>{console.log(item.desc);})
        document.getElementById("all").childNodes[5].innerHTML="";
        alltasks.forEach((item)=>{document.getElementById("all").childNodes[5].innerHTML+=(`<div id="${item.id}_div">${alltasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue}<div>due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue}</div><button onclick="reschedule('${item.id}')">Reschedule this task</button><br></div><br>`);});
        //addToDivAll();
    }).catch((error)=>{alert("Error has occurred.... Contact Mono")});
    
    // 
    // db.collection("alltasks").get().then(function(querySnapshot) {      
    //     x = querySnapshot.docs;
    //     x.forEach((doc) => {    var docRef = db.collection("cities").doc();
    // })
    // });
    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
}

function getmissedtasks(){
    db.collection("missedtasks").get().then(function(querySnapshot) {
        x = querySnapshot.docs;
        console.log(x);
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        x.forEach((it) => {docRef = db.collection("missedtasks").doc(it.id).get().then((doc)=>{missedtasks[x.indexOf(it)]=doc.data();Object.defineProperty(x[x.indexOf(it)], "id", {value: it.id})})});
        console.log(x);
        missedtasks=x;
        console.log(missedtasks);
        missedtasks.forEach((item)=>{console.log(item.desc);})
        document.getElementById("missed").innerHTML="";
        missedtasks.forEach((item)=>{document.getElementById("missed").innerHTML+=(`<div id="${item.id}_div">${missedtasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue} was due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue}<br><button id="${item.id}_reschedule" onclick="reschedule(${item.id})">Reschedule this task</button><br></div>`);});
        //addToDivMissed();
    });
}

function getcompletedtasks(){
    db.collection("completedtasks").get().then(function(querySnapshot) {
        x = querySnapshot.docs;
        console.log(x);
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        x.forEach((it) => {docRef = db.collection("completedtasks").doc(it.id).get().then((doc)=>{completedtasks[x.indexOf(it)]=doc.data();Object.defineProperty(x[x.indexOf(it)], "id", {value: it.id})})});
        console.log(x);
        completedtasks=x;
        console.log(completedtasks);
        completedtasks.forEach((item)=>{console.log(item.desc);})
        document.getElementById("completed").innerHTML="";
        completedtasks.forEach((item)=>{document.getElementById("completed").innerHTML+=(`<div id="${item.id}_div">${completedtasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue} was due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue}<br><br></div>`);});
        //addToDivCompleted();
    });
}

function addToDivAll(){
    console.log(alltasks);
    let l = alltasks.length;
    for (let index = 0; index < l; index++) {
        console.log(alltasks[index]._delegate._document.data.value.mapValue.fields.desc.stringValue);
        
    }
    //alltasks.forEach((y)=>{console.log(y.desc);})
}

function addToDivMissed(){
    console.log(missedtasks);
    let l = missedtasks.length;
    for (let index = 0; index < l; index++) {
        console.log(missedtasks[index]._delegate._document.data.value.mapValue.fields.desc.stringValue);
        
    }
    //alltasks.forEach((y)=>{console.log(y.desc);})
}

function addToDivCompleted(){
    console.log(completedtasks);
    let l = completedtasks.length;
    for (let index = 0; index < l; index++) {
        console.log(completedtasks[index]._delegate._document.data.value.mapValue.fields.desc.stringValue);
        
    }
    //alltasks.forEach((y)=>{console.log(y.desc);})
}

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}
// function writeUserData(description, date_time) {
//     db.collection(`alltasks/`).add({
//         desc: description,
//         due_date_time: date_time
//     }).then((docRef)=>{
//         console.log("written with id: ", docRef.id);
//         n++;
//         alltasks.concat([docRef.id]);
//     })
//     .catch((error)=>{console.log("error while writing: ", error);});
//   }
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
    console.log(d);
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
                due_date_time: `${d.toLocaleString()}`
            }).then((docRef)=>{
                console.log("written with id: ", docRef.id);
                n++;
                alltasks = alltasks.concat(`${[docRef.id]}`);
                console.log(alltasks);
                console.log(document.getElementById("all").innerHTML);
                document.getElementById("body").style.display="none";
                document.getElementById("loading").style.display="block";
                getalltasks().then(() =>{document.getElementById("body").style.display="block";document.getElementById("loading").style.display="none";});
                //document.getElementById("all").innerHTML = `You have ${n} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33)+`<br><br><div id=${docRef.id}>${alltasks.findIndex(x => x===docRef.id) + 1}.&nbsp;${document.getElementById("task_input").value} due&nbsp;at&nbsp;${d.toUTCString()}</div>`;
                console.log(document.getElementById("all").innerHTML);
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
