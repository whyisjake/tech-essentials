var glist = {
  // (A) SUPPORT FUNCTION - AJAX FETCH
  ajax : (data, onload) => {
    // (A1) FORM DATA
    var form = new FormData;
    for (let [k,v] of Object.entries(data)) {
      form.append(k, v);
    }

    // (A2) AJAX FETCH
    fetch("3-ajax-items.php", {
      method : "post",
      body : form
    })
    .then(res => res.text())
    .then(txt => {
      if (txt == "OK") { onload(); }
      else {
        try {
          var json = JSON.parse(txt);
          onload(json);
        } catch (err) {
          alert("AJAX fetch error");
          console.error(err, txt);
        }
      }
    })
    .catch(err => {
      alert("AJAX fetch error");
      console.error(err);
    });
  },

  // (B) INITIALIZE GROCERY LIST
  items : [], // current grocery list
  hqty : null, // html add quantity field
  hitem : null, // html add item field
  hlist : null, // html <div> grocery list
  init : () => {
    // (B1) GET HTML ELEMENTS
    glist.hqty = document.getElementById("gro-qty");
    glist.hitem = document.getElementById("gro-item");
    glist.hlist = document.getElementById("gro-list");

    // (B2) ENABLE FORM
    glist.hqty.disabled = false;
    glist.hitem.disabled = false;
    document.getElementById("gro-add").disabled = false;
    document.getElementById("gro-form").onsubmit = glist.add;

    // (B3) DRAW HTML GROCERY LIST
    glist.draw();
  },

  // (C) DRAW GROCERY LIST
  draw : () => {
    glist.ajax({ req : "get" }, (items) => {
      // (C1) NO ITEMS
      if (items.length == 0) {
        glist.hlist.innerHTML = "<div class='item-row item-name'>No items found.</div>";
      }

      // (C2) DRAW ITEMS
      else {
        glist.hlist.innerHTML = "";
        for (let i of items) {
          // (C2-1) ITEM ROW
          let row = document.createElement("div");
          row.className = i.got=="1" ? "item-row yes" : "item-row no";
          glist.hlist.appendChild(row);

          // (C2-2) DELETE BUTTON
          let del = document.createElement("button");
          del.className = "item-del material-icons";
          del.innerHTML = "delete";
          del.onclick = () => { glist.delete(i.id); };
          row.appendChild(del);

          // (C2-3) ITEM QUANTITY & NAME
          let name = document.createElement("div");
          name.innerHTML = `${i.qty} X ${i.name}`;
          name.className = "item-name";
          if (i.got=="1") { name.classList.add("item-got"); }
          row.appendChild(name);

          // (C2-4) ITEM ACCQUIRED
          let ok = document.createElement("button");
          ok.className = "item-ok material-icons";
          ok.innerHTML = i.got=="1" ? "done" : "clear";
          ok.onclick = () => {
            glist.toggle(i.got=="1" ? 0 : 1, i.id);
          };
          row.appendChild(ok);
        }
      }
    });
  },

  // (C) ADD NEW ITEM TO THE LIST
  add : () => {
    glist.ajax({
      req : "add",
      name : glist.hitem.value,
      qty : glist.hqty.value
    }, glist.draw);
    return false;
  },

  // (D) TOGGLE ITEM ACCQUIRED STATUS
  toggle : (got, id) => {
    glist.ajax({
      req : "update",
      got: got,
      id : id
    }, glist.draw);
  },

  // (E) DELETE SELECTED ITEM
  delete : (id) => { if (confirm("Remove this item?")) {
    glist.ajax({
      req : "delete",
      id : id
    }, glist.draw);
  }}
};
window.addEventListener("load", glist.init);
