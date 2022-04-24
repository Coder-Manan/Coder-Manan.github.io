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
var completedtasks = [];
var missedtasks = [];
var justtasks = [];
let n = 0;
document.getElementById("all").innerHTML = `You have ${n} pending task(s)<br>`+document.getElementById("all").innerHTML;
let taskstring = "";
getalltasks();
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

function getalltasks(){
    document.getElementById("body").style.display="none";        
    document.getElementById("loading").style.display="block";
    let str = "";

    console.log("started");
    let x = [];
        console.log("milstone1");
    db.collection("alltasks").get().then(function(querySnapshot) {
        x = querySnapshot.docs;
        console.log(x);
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        x.forEach((it) => {docRef = db.collection("alltasks").doc(it.id).get().then((doc)=>{x[x.indexOf(it)]=doc.data()})});
        console.log("reached");
        console.log(x);
        alltasks=x;
        console.log(alltasks);
        alltasks.forEach((item)=>{console.log(item.desc);})
        alltasks.forEach((item)=>{document.getElementById("all").childNodes[5].innerHTML+=(`${item.desc} due at ${item.due_date_time}<br>`);console.log(item.desc);});
        console.log("done");
        console.log(str);
        addToDiv();
    });
    
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

function addToDiv(){
    console.log(alltasks);
    console.log(alltasks[0].desc);
    alltasks.forEach((item)=>{console.log(typeof item);console.log(item);console.log(item.desc)})
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
                console.log(document.getElementById("all").innerHTML);
                document.getElementById("all").innerHTML = `You have ${n} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33)+`<br><br><div id="${docRef.id}">${alltasks.findIndex(x => x===docRef.id) + 1}.&nbsp;${document.getElementById("task_input").value} due&nbsp;at&nbsp;${d.toUTCString()}</div>`;
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
