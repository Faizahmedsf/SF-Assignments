console.log("Index.js");
// main class
// table class all table methods
// datasource class from where the data is coming

getallinstance = () => {
  let data = new dataSource();
  let table = new Tableclass(data);
};

class main {
  constructor() {
    let data = new dataSource();
    //  console.log(data.getdata())

    let table = new Tableclass(data);
    //  console.log(table.view())
    table.view();
  }
}

class dataSource {
  getdata() {
    // console.log('getdata')
    return [
      {
        id: 1,
        first_name: "faiz ",
        middle_name: "ahmed",
        last_name: "choudhary",
        email: "faiz@mail.com",
        phone_number: "8878-86876",
        role: "trainee",
        address: "Mumbai",
      },
      {
        id: 2,
        first_name: "Zain",
        middle_name: "New",
        last_name: "Malik",
        email: "malik@mail.com",
        phone_number: "12321-9887",
        role: "Band",
        address: "Delhi",
      },
      {
        id: 3,
        first_name: "React",
        middle_name: "JS",
        last_name: "Native",
        email: "react@mail.com",
        phone_number: "0987-564321",
        role: "Developer",
        address: "USA",
      },
    ];
  }
}

class Tableclass {
  constructor(data) {
    this.data = data;
    // const globaldata = data.getdata()
    // this.view()
  }

  view() {
    let data = new dataSource();
    let table = new Tableclass(data);

    loadtable = document.getElementById("loadtable");

    console.log("j");
    loadtable.innerHTML = "";
    // console.log('getdata')
    // console.log(data.getdata())
    const tableData = data.getdata();
    console.log(tableData);
    // now let create a table header
    var tableheader = [];
    for (let i = 0; i < tableData.length; i++) {
      for (const key in tableData[i]) {
        // console.log(tableData[i])
        if (tableheader.indexOf(key) === -1) {
          tableheader.push(key);
        }
        // console.log(tableheader)
      }
    }

    // creating a dynamic table
    let Createtable = document.createElement("table");
    Createtable.classList.add("table", "container");
    loadtable.append(Createtable);

    // creating a dynamic header for table
    let Createthead = document.createElement("thead");
    Createthead.classList.add("thead");

    // lets insert a row in header
    let theadtr = Createthead.insertRow(-1);
    for (let i = 0; i < tableheader.length; i++) {
      let theadrow = document.createElement("th");
      theadrow.setAttribute("id", "theadrow-" + i);
      theadrow.append(tableheader[i]);
      theadtr.append(theadrow);
      theadtr.setAttribute("id", "theadtr-" + i);
    }

    let actionbtn = theadtr.insertCell(-1);
    actionbtn.innerText = "Action";

    Createtable.append(Createthead);

    // creating a dynamic body for table
    let Createtbody = document.createElement("tbody");
    Createtbody.classList.add("tbody");
    Createtable.append(Createtbody);

    for (let i = 0; i < tableData.length; i++) {
      let tbodyrow = Createtbody.insertRow(0);
      Createtbody.append(tbodyrow);
      tbodyrow.setAttribute("id", "tbodyrow-" + i);

      for (let j = 0; j < tableheader.length; j++) {
        let tablecell = tbodyrow.insertCell(-1);
        //     // tbodyrow.append(tablecell)
        tablecell.innerText = tableData[i][tableheader[j]];
        // console.log(j)
        tablecell.classList.add("tcell");
      }

      // now lets create a edit button
      let editButton = document.createElement("button");
      editButton.classList.add("edit-btn", "btn-info");
      editButton.innerText = "Edit";
      let trid = "tbodyrow-" + i;
      editButton.addEventListener("click", table.edit(trid, tableheader));
      let editcell = tbodyrow.insertCell(-1);
      editcell.setAttribute("id", "savecleartd");
      editcell.append(editButton);
      tbodyrow.append(editcell);

      //  delete button
      let deletebtn = document.createElement("button");
      deletebtn.classList.add("btn-danger", "delete-btn", "ml-2");
      deletebtn.innerHTML = "Delete";
      deletebtn.addEventListener("click", table.delete(trid));
      deletebtn.setAttribute("id", "deletebtn" + i);
      editcell.append(deletebtn);

      // save button
      let savebutton = document.createElement("button");
      savebutton.setAttribute("id", "save-button-" + i);
      savebutton.innerText = "Save";
      savebutton.classList.add("btn-primary", "save");
      savebutton.addEventListener("click", table.save(trid, tableheader));
      savebutton.style.display = "none";

      // clear button
      let clearbutton = document.createElement("button");
      clearbutton.setAttribute("id", "clear-button-" + i);
      clearbutton.innerText = "Clear";
      clearbutton.classList.add("btn-info", "clear", "ml-2");
      clearbutton.addEventListener(
        "click",
        table.clear(trid, tableheader, tableData)
      );
      clearbutton.style.display = "none";

      // let tablelastcell = tbodyrow.insertCell(-1);
      editcell.append(savebutton);
      editcell.append(clearbutton);
    }
  }
  // edit
  edit(id, tableheader) {
    return function () {
      // console.log(id)
      let editelem = document.getElementById(id);
      editelem.style.backgroundColor = "#E2C4B8";

      for (let i = 0; i < tableheader.length; i++) {
        let getcell = editelem.querySelectorAll(".tcell")[i];
        getcell.setAttribute("contenteditable", "true");
        // console.log(getcell)
      }

      // lets toggle buttons
      for (
        let j = 0;
        j < editelem.querySelector("#savecleartd").children.length;
        j++
      ) {
        // console.log("editelem.querySelector('#savecleartd').children[i]")
        // console.log(j)
        console.log(editelem.querySelector("#savecleartd").children[j]);

        if (
          editelem.querySelector("#savecleartd").children[j].style.display ===
          "none"
        ) {
          editelem.querySelector("#savecleartd").children[j].style.display =
            "block";
        } else {
          editelem.querySelector("#savecleartd").children[j].style.display =
            "none";
        }
      }
    };
  }

  // delete
  delete(id) {
    return function () {
      console.log(id);
      let delelem = document.getElementById(id);
      delelem.remove();
    };
  }

  // clear
  clear(id, tableheader, tableData) {
    return function () {
      console.log("clear");
      let clearelem = document.getElementById(id);
      let clearelemindex = document.getElementById(id).rowIndex;
      console.log(clearelemindex);

      clearelem.style.backgroundColor = "#fff";

      for (let i = 0; i < tableData.length; i++) {
        for (let j = 0; j < tableheader.length; j++) {
          let content = tableData[clearelemindex - 1][tableheader[j]];
          clearelem.querySelectorAll(".tcell")[j].innerText = content;
        }
      }

      // lets toggle buttons
      for (
        let j = 0;
        j < clearelem.querySelector("#savecleartd").children.length;
        j++
      ) {
        // console.log("editelem.querySelector('#savecleartd').children[i]")
        // console.log(j)
        console.log(clearelem.querySelector("#savecleartd").children[j]);

        if (
          clearelem.querySelector("#savecleartd").children[j].style.display ===
          "none"
        ) {
          clearelem.querySelector("#savecleartd").children[j].style.display =
            "block";
        } else {
          clearelem.querySelector("#savecleartd").children[j].style.display =
            "none";
        }
      }
    };
  }

  // save
  save(id, tableheader) {
    return function () {
      // console.log(id)
      let saveelem = document.getElementById(id);
      saveelem.style.backgroundColor = "#fff";

      for (let i = 0; i < tableheader.length; i++) {
        let getcell = saveelem.querySelectorAll(".tcell")[i];
        getcell.setAttribute("contenteditable", "false");
        // console.log(getcell)
      }

      // lets toggle buttons
      for (
        let j = 0;
        j < saveelem.querySelector("#savecleartd").children.length;
        j++
      ) {
        // console.log("editelem.querySelector('#savecleartd').children[i]")
        // console.log(j)
        console.log(saveelem.querySelector("#savecleartd").children[j]);

        if (
          saveelem.querySelector("#savecleartd").children[j].style.display ===
          "none"
        ) {
          saveelem.querySelector("#savecleartd").children[j].style.display =
            "block";
        } else {
          saveelem.querySelector("#savecleartd").children[j].style.display =
            "none";
        }
      }
    };
  }
}

const jsonformdata = () => {
  loadtable = document.getElementById("loadtable");
  loadData = document.getElementById("loadData");

  loadData.innerText = "Refresh Data";
  console.log("json form data() clicked");

  let mainclass = new main();
};
