import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase,set,ref,onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDo-fp_VBZcxFu5yYJEKAS0AhA3vTxElqE",
    authDomain: "js-todo-b1146.firebaseapp.com",
    projectId: "js-todo-b1146",
    storageBucket: "js-todo-b1146.appspot.com",
    messagingSenderId: "991444055494",
    appId: "1:991444055494:web:1fbb4cf0492d6c77fbaec7"
};

const app = initializeApp(firebaseConfig);
let db = getDatabase(app);
let n = 0;
export function addTaskToDB(){
    d = new Date(document.getElementById("add").childNodes[1].value);
    if (isNaN(d.getTime())){
        console.log(1);
    }
    else{
        console.log((new Date).toLocaleDateString())
        if (document.getElementById("task_input").value!="" && (d>(new Date) || d.getHours()>(new Date).getHours() || d.getMinutes()>(new Date).getMinutes())){
            alltasks.push(new Task(document.getElementById("task_input").value, d));
            console.log(alltasks.length);        
            writeUserData(`${n}`, `${document.getElementById("task_input").value}`, `${d.toUTCString()}`);
            n++;
            document.getElementById("add").close();
            document.getElementById("task_input").value="";
            document.getElementById("dt_input").value="";
            document.getElementById("dialog_error").innerHTML="";
            document.getElementById("body").style.display="block";
            document.getElementById("all").innerHTML = `You have ${alltasks.length} pending task(s)<br>`+document.getElementById("all").innerHTML.slice(33);
            return 0;
        }
        console.log(2);
    }
    document.getElementById("dialog_error").innerHTML="Invalid Data. Enter again";
}

function writeUserData(task_id, date_time, description) {
  set(ref(db, `alltasks/${task_id}`), {
    desc: description,
    due_date_time: date_time,
  });
}
// const alltasks = ref(db, 'altasks/');
// onValue(alltasks, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

