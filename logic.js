document.getElementById("all").style.display="none";
document.getElementById("completed").style.display="none";    
document.getElementById("missed").style.display="none";
//import {getAuth} from 'firebase/auth';
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
const auth = firebase.auth();
let uid = "";
var alltasks = [];
var completedtasks = [];
var missedtasks = [];
//document.getElementById("all").innerHTML = `<h1>All Tasks Tab</h1><br>`+document.getElementById("all").innerHTML;
document.getElementById("test").style.display="none";
// getalltasks();
// getmissedtasks();
// getcompletedtasks();
document.getElementById("body").style.display="none";
function moveToComplete(id){
    obj = alltasks.find(x=>(x.id===id));
    document.getElementById("body").style.display="none";
    document.getElementById("loading").style.display="block";
    db.collection(`data/${uid}/completedtasks`).doc(`${id}`).set({
        desc:obj._delegate._document.data.value.mapValue.fields.desc.stringValue,
        due_date_time:obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue,
        completed_date_time: (new Date).toLocaleString()
    }).then(()=>{db.collection(`data/${uid}/alltasks`).doc(`${id}`).delete().then(()=>{document.getElementById("body").style.display="block";document.getElementById("loading").style.display="none";getalltasks();getcompletedtasks();alert("Task marked as complete successfully")}).catch((error)=>{alert("error");console.log(error);})}).catch((error)=>{alert("error");console.log(error);})
};

function moveToMissed(id){
    obj = alltasks.find(x=>(x.id===id));
    document.getElementById("body").style.display="none";
    document.getElementById("loading").style.display="block";
    db.collection(`data/${uid}/missedtasks`).doc(`${id}`).set({
        desc:obj._delegate._document.data.value.mapValue.fields.desc.stringValue,
        due_date_time:obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue,
    }).then(()=>{db.collection(`data/${uid}/alltasks`).doc(`${id}`).delete().then(()=>{document.getElementById("body").style.display="block";document.getElementById("loading").style.display="none";getalltasks();getmissedtasks();alert("Task marked as missed successfully");}).catch((error)=>{alert("error");console.log(error);})}).catch((error)=>{alert("error");console.log(error);})
};

function moveToAll(id){
    d = new Date(document.getElementById("reschedule_dt_input").value);
    if (isNaN(d.getTime())){
        console.log(1);
        alert("Error");
    }
    else if ((d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
        obj = missedtasks.find(x=>(x.id===id));
        document.getElementById("reschedule").close();
        document.getElementById("loading").style.display="block";
        db.collection("alltasks").doc(`${id}`).set({
            desc: obj._delegate._document.data.value.mapValue.fields.desc.stringValue,
            due_date_time: obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue 
        }).then(()=>{db.collection(`data/${uid}/missedtasks`).doc(`${id}`).delete().then(()=>{getalltasks();getmissedtasks();document.getElementById("loading").style.display="none";document.getElementById("body").style.display="block";alert("Task marked as pending successfully");return;})})  
    }
    else{alert("Enter valid date");
}
}

function reschedule(id){
    document.getElementById("body").style.display="none";
    document.getElementById("reschedule").show();
    obj = alltasks.find(x=>(x.id===id));
    document.getElementById("reschedule_task_desc").innerHTML=obj._delegate._document.data.value.mapValue.fields.desc.stringValue;
    document.getElementById("reschedule_dt").innerHTML=obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue;
    document.getElementById("reschedule_confirm_button").innerHTML=`<button onclick="reschedule_confirm('${id}')">Confirm</button>`;
}

function rescheduleToAll(id){
    document.getElementById("body").style.display="none";
    document.getElementById("reschedule").show();
    obj = missedtasks.find(x=>(x.id===id));
    document.getElementById("reschedule_task_desc").innerHTML=obj._delegate._document.data.value.mapValue.fields.desc.stringValue;
    document.getElementById("reschedule_dt").innerHTML=obj._delegate._document.data.value.mapValue.fields.due_date_time.stringValue;
    document.getElementById("reschedule_confirm_button").innerHTML=`<button onclick="moveToAll('${id}')">Confirm</button>`;
}

function reschedule_confirm(id){
    d = new Date(document.getElementById("reschedule_dt_input").value);
    if (isNaN(d.getTime())){
        console.log(1);
    }
    else if ((d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
        document.getElementById("reschedule").close();
        document.getElementById("loading").style.display="block";
        db.collection(`data/${uid}/alltasks`).doc(`${id}`).update({"due_date_time": d.toLocaleString()}).then(()=>{document.getElementById("loading").style.display="none";document.getElementById("body").style.display="block"}).catch((error)=>{alert("Error has occurred... Contact Mono")});
        getalltasks().then(()=>{document.getElementById("loading").style.display="none";document.getElementById("body").style.display="block";return;})
    }
    alert("Enter valid date");
}

function getalltasks(){
    if (uid == ""){
        alert("Error");
        return;
    }
    document.getElementById("body").style.display="none";        
    document.getElementById("loading").style.display="block";
    db.collection(`data/${uid}/alltasks`).get().then(function(querySnapshot) {
        alltasks = querySnapshot.docs;
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        if (alltasks.length == 0){
            document.getElementById("all_tasks").innerHTML = "You have no pending tasks!!";
        }
        else {
            document.getElementById("all_tasks").innerHTML="";
            alltasks.forEach((item)=>{document.getElementById("all_tasks").innerHTML+=(`<div id="${item.id}_div">${alltasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue}<div>due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue}</div><button onclick="reschedule('${item.id}')">Reschedule this task</button><button onclick="moveToComplete('${item.id}')">Mark as complete</button><button onclick="moveToMissed('${item.id}')">Mark as missed</button><br></div><br>`);});
        }
        document.getElementById("body").style.display="block";
        document.getElementById("loading").style.display="none";
    }).catch((error)=>{alert("Error has occurred.... Contact Mono");console.log(error);});
    

}

function getmissedtasks(){
    if (uid == ""){
        alert("Error");
        return;
    }
    db.collection(`data/${uid}/missedtasks`).get().then(function(querySnapshot) {
        missedtasks = querySnapshot.docs;
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        document.getElementById("missed_tasks").innerHTML="";
        if (missedtasks.length == 0){
            document.getElementById("missed_tasks").innerHTML="You have not missed any tasks yet. Keep it up!!";
        }
        else{
            missedtasks.forEach((item)=>{document.getElementById("missed").innerHTML+=(`<div id="${item.id}_div">${missedtasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue} was due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue}<br><button id="${item.id}_reschedule" onclick="rescheduleToAll('${item.id}')">Reschedule and move to pending</button><br></div>`);});
        }    
    });
}

function getcompletedtasks(){
    if (uid == ""){
        alert("Error");
        return;
    }
    db.collection(`data/${uid}/completedtasks`).get().then(function(querySnapshot) {
        completedtasks = querySnapshot.docs;
        document.getElementById("body").style.display="block";        
        document.getElementById("loading").style.display="none";
        document.getElementById("completed_tasks").innerHTML="";
        if (completedtasks.length == 0){
            document.getElementById("completed_tasks").innerHTML="Don't stare at this screen.. Go do some work!!"
        }
        completedtasks.forEach((item)=>{document.getElementById("completed").innerHTML+=(`<div id="${item.id}_div">${completedtasks.indexOf(item)+1}.&nbsp;${item._delegate._document.data.value.mapValue.fields.desc.stringValue} was due at ${item._delegate._document.data.value.mapValue.fields.due_date_time.stringValue} and&nbsp;finished&nbsp;at&nbsp;${item._delegate._document.data.value.mapValue.fields.completed_date_time.stringValue}<br><br></div>`);});
    });
}

function toggle(open){
    document.getElementById("all").style.display="none";
    document.getElementById("completed").style.display="none";
    document.getElementById("missed").style.display="none";
    document.getElementById(open).style.display="block";
}

function addTaskToDB(){
    d = new Date(document.getElementById("add").childNodes[1].value);
    if (isNaN(d.getTime())){
        console.log(1);
    }
    else{
        if (document.getElementById("task_input").value!="" && (d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){

            document.getElementById("add").close();
            document.getElementById("loading").style.display="block";        
            db.collection(`data/${uid}/alltasks`).doc(`${(new Date).toLocaleString().replaceAll("/","-")}`).set({
                desc: `${document.getElementById("task_input").value}`,
                due_date_time: `${d.toLocaleString()}`
            }).then((docRef)=>{
                document.getElementById("body").style.display="none";
                document.getElementById("loading").style.display="block";
                getalltasks();
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

//auth
function goToSignUp(){
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="block";
}

function goToLogin(){
    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="block";
}

function register(){
    const email = document.getElementById("email_signup").value;
    const password = document.getElementById("password_signup").value;
    const re_password = document.getElementById("confirm_password_signup").value;
    const name = document.getElementById("name").value;
    document.getElementById("loading").style.display="block";
    document.getElementById("auth").style.display="none";
    if (re_password != password){
        alert("Passwords don't match");
        document.getElementById("loading").style.display="none";
        document.getElementById("auth").style.display="block";
        return;
    }
    if (email == "" || password == "" || name == ""){
        alert("Enter valid data");
        document.getElementById("loading").style.display="none";
        document.getElementById("auth").style.display="block";
        return;
    }
    let l = email.length;
    let cat = 0;
    let cdot = 0;
    let c = 0;
    for (let i = 0; i < l - 1; i++) {
        c = email.charCodeAt(i);
        if (c == 46 && email.charCodeAt(i+1) != 46){
            cdot++;
        }
        else if(c == 64 && cat == 0 && email.charCodeAt(i+1) != 64){
            cat = 1;
        }
        else if(c >= 33 && c <= 126){
            continue;
        }
        else{
            alert("Invalid email-id");
            document.getElementById("auth").style.display="block";
            document.getElementById("loading").style.display="none";
            return;
        }
    }
    c = email.charCodeAt(l - 1);
    if (c >= 33 && c <= 126 && c != 46 && c != 64 && cat != 0){
        //create user
        auth.createUserWithEmailAndPassword(email, password)
        .then((res)=>{
            document.getElementById("email_signup").value = "";
            document.getElementById("password_signup").value = "";
            document.getElementById("confirm_password_signup").value = "";
            document.getElementById("name").value = "";
            alert("registered successfully");
            uid = res.user.uid;
            db.collection(`data`).doc(`${uid}`).set({Name: `${name}`}).then(()=>{
            getalltasks();
            getcompletedtasks();
            getmissedtasks();
            document.getElementById("test").innerHTML = `<div>${name}'s Dashboard</div>` + document.getElementById("test").innerHTML;
            document.getElementById("loading").style.display="none";
            document.getElementById("test").style.display="block";
        })
            .catch((error)=>{alert("Error");console.log(error);})
        })
        .catch((error)=>{
            if (error.toString().slice(0,83) == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)" ){
                alert("Invalid email id");
            }
            else if (error.toString().slice(0,86) == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)"){
                alert("Password should be of min length 6");
            }
            else if (error.toString().slice(0,108) == "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)"){
                alert("User already exists with same email");
            }
            else{alert("Error has occurred... Contact Mono");console.log(error);}
            document.getElementById("loading").style.display="none";
            document.getElementById("auth").style.display="block";
        })
    }
    else{
        alert("Invalid email-id");
        document.getElementById("loading").style.display="none";
        document.getElementById("auth").style.display="block";
    }
}

function login(){
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;
    if (password == "" || email == ""){
        alert("Please fill both fields");
        return;
    }
    document.getElementById("loading").style.display="block";
    document.getElementById("auth").style.display="none";
    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        document.getElementById("email_login").value = "";
        document.getElementById("password_login").value = "";
        alert("Logged in successfully");
        uid = res.user.uid;
        getalltasks();
        getcompletedtasks();
        getmissedtasks();
        db.collection(`data`).doc(`${uid}`).get()
        .then((querySnapshot)=>{document.getElementById("test").innerHTML = `<div>${querySnapshot._delegate._document.data.value.mapValue.fields.Name.stringValue}'s Dashboard</div>` + document.getElementById("test").innerHTML;})
        .catch((error)=>{alert("Error");console.log(error);});
        //
        document.getElementById("loading").style.display="none";
        document.getElementById("test").style.display="block";

    })
    .catch((error)=>{
        if (error.toString().slice(0,108) == "FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)"){
            alert("Wrong password");
        }
        else if (error.toString().slice(0,83) == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)"){
            alert("Invalid email id");
        }
        else if (error.toString().slice(0,136) == "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)"){
            alert("No user exists with given email id");
        }
        else{
            alert("Error");
            console.log(error);
        }
        document.getElementById("auth").style.display="block";
    })
}

function logout(){
    document.getElementById("loading").style.display="block";
    document.getElementById("test").style.display="none";
    auth.signOut()
    .then(()=>{
        alert("Logged out successfully");
        document.getElementById("loading").style.display="none";
        document.getElementById("auth").style.display="block";
    })
    .catch((error)=>{alert("Error");console.log(error);})
}

function forgot_password(){
    document.getElementById("login").style.display="none";
    document.getElementById("reset_password").style.display="block";
}

function reset_password(){
    const email = document.getElementById("email_reset_password").value;
    document.getElementById("loading").style.display="block";
    document.getElementById("reset_password").style.display="none";
    auth.sendPasswordResetEmail(email)
    .then(()=>{
        alert("Email sent successfully");
        document.getElementById("email_reset_password").value = "";
        document.getElementById("login").style.display="block";
    })
    .catch((error)=>{
        if (error.toString().slice(0,83) == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)" || 
        error.toString().slice(0,136) == "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)"){
            alert("Invalid email-id");
        }
        else{
            alert("Error");
            console.log(error);
        }
        document.getElementById("reset_password").style.display="block";
    })
    document.getElementById("loading").style.display="none";
    
}