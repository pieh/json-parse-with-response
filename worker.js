onmessage = function(e) {
  console.log("Message received from main script", e);
  if (e.data.type === "FETCH_AND_PARSE") {
    var req = new XMLHttpRequest();
    req.open("GET", e.data.payload, true);
    req.onreadystatechange = function(aEvt) {
      if (req.readyState == 4) {
        if (req.status == 200)
          console.log("[worker-xhr-blocking] start parsing");
        var json = JSON.parse(req.responseText);
        console.log("[worker-xhr-blocking] finish parsing");
        postMessage({
          type: "FETCH_AND_PARSE_RESPONSE",
          payload: json
        });
      }
    };
    req.send(null);
  }
};
