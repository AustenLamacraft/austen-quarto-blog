let svgDocument;

function on_load(evt){
   O=evt.target;
   svgDocument=O.ownerDocument;
   svgDocument.getElementById("g960").onclick = user_clicked_my_button;
}

function turn_on(id){
   svgDocument.getElementById(id).setAttribute("visibility","visible");
}

function turn_off(id){
   svgDocument.getElementById(id).setAttribute("visibility","hidden");
}

function user_clicked_my_button(){
    turn_off("g1162");
    console.log('boo')
}