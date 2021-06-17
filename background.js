// try {
// importScripts('jquery.min.js')
// } catch (e) { console.error(e); }

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ items: [] });
  // chrome.alarms.create('status', { periodInMinutes: 0.1 });
});

// chrome.alarms.onAlarm.addListener((alarm) => {
//   let ids = []

//   chrome.storage.sync.get(['ids'], obj => { 
//     ids = [...obj.ids]
//   })
//   ids.map(v => `ids[]=${v}`)

//     // $("#list-container > div").each((index, elem) => {
//     //   if($(elem).children('.status').text() == "Pending"){
//     //   ids.push("ids[]="+$(elem).attr("id"))}
//     // });

//   var url = 'http://localhost:8000/status?' + ids.join("&")
//   console.log(ids)

//   if(ids.length > 0){
//     $.ajax({
//        type: "GET",
//        url: url,
//        // crossDomain: false,
//        success: function(data)
//        {
//            // alert(data); // show response from the php script.
//            let status = data.data
//            Object.keys(status).forEach(id => {
//               if(status[id] == "done") {
//                 // chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
//                 $("#"+id + " > .status").text("Done");
//                 chrome.browserAction.setBadgeText({text: 'O'});
//               }
//            })
//        }
//      })
//   }
// });
