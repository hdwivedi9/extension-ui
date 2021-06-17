$(document).ready(function() {

  let statusColor = {
    'done': 'green',
    'pending': '#dec04a',
  }


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

function submitForm(e) {
  console.log(e)
}

})
