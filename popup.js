$(document).ready(function() {

  let statusColor = {
    'done': 'green',
    'pending': '#dec04a',
  }

  // load processes from storage when extension open after collapsing
  chrome.storage.sync.get(['items'], obj => { 
    let items = [...obj.items]
    if(items.length > 0){
      items.forEach(item => {
        $('#list-container').prepend($(`<div id=${item.id}><div class="text">${item.text}</div><div class="status" style="color:${statusColor[item.status]}">${item.status}</div></div>`));
      })
    }
   })

  // create new process
  $("#create-form").submit(function(e) {
    e.preventDefault();

    let form = $(this);
    let url = form.attr('action');
    let formValues = form.serialize();
    
    $.ajax({
      type: "POST",
      url: url,
      data: formValues,
      // crossDomain: false,
      success: function(data)
      {
        let id = data.data
        let text = formValues.split('=')[1]

        // add item in DOM
        $('#list-container').prepend($(`<div id=${data.data}><div class="text">${text}</div><div class="status" style="color:${statusColor['pending']}">pending</div></div>`));

        // add item in storage
        chrome.storage.sync.get(['items'], obj => { 
        let items = [...obj.items]
        items.push({id: id, text: text, status: 'pending'})
        chrome.storage.sync.set({items})
        })
      }
    });
  });

  // Long polling for status check of processes
  setInterval(() => {
    let ids = []
    $("#list-container > div").each((index, elem) => {
      if($(elem).children('.status').text() == "pending"){
      ids.push("ids[]="+$(elem).attr("id"))}
    });

    let url = 'http://localhost:8000/status?' + ids.join("&")
    console.log(ids)

    if(ids.length > 0){
        $.ajax({
          type: "GET",
          url: url,
          // crossDomain: false,
          success: function(data)
          {
            let status = data.data

            // update DOM if any process completed
            Object.keys(status).forEach(id => {
              if(status[id] == "done") {
                $("#"+id + " > .status").text("done");
                $("#"+id + " > .status").css("color", statusColor['done']);
                // addBadge();
              }
            })

            // update storage
            chrome.storage.sync.get(['items'], obj => { 
              let items = [...obj.items]
              items = items.map(item => {
                if(status[item.id])
                  return {...item, status: status[item.id]}
                return item
              })
              chrome.storage.sync.set({items})
            })
          }
        })
    }
  }, 5000)

})
