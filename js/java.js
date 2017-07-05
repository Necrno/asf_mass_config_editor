var os = require('os');
var fs = require('fs');
var path = require('path');

var gui = require('nw.gui');
var win = gui.Window.get();
win.x=0;
win.y=0;


var dev_mode = 1;


var accounts = {};
var exclude_list = [];

var config_dir = process.cwd()+"\\config_old";
var config_dir_new = process.cwd()+"\\config_new";
// console.log(config_dir);

// var test_json_file=config_dir+"\\g00.json"

// var testjson = require(test_json_file);
// console.log(testjson);



$(document).ready(function(){

fs.readdir(config_dir, function (err, files) { // '/' denotes the root folder
  if (err) throw err;

  

   files.forEach( function (file) {

if (file != undefined){
  
     fs.lstat(config_dir+'\\'+file, function(err, stats) {
      try {


       var n = file.indexOf('.');
       var just_name = file.substring(0, n != -1 ? n : n.length);
       var ext = file.split('.').pop();
       
       if (ext=='json' && file != "example.json" &&  file != "minimal.json" && file != "ASF.json"){
        $('div#content').append('<span class="file '+ ext +'" title="'+just_name+'">'+just_name+'</span>');
      // console.log(file);
      
      var temp_name = config_dir+"\\"+file;
      accounts[just_name] = require(temp_name);
      
    }

    } catch (e) {
   console.log(e);
 }




    });
   }

});
});



console.log(accounts);

$(document).on("click", "label", function() {

var my_value = '';
var contrl_itm = $(this).children(":first").attr('id');

var status = false;
status = document.getElementById(contrl_itm).checked;
//console.log(contrl_itm+" is before pressed: "+status);

if ( status === true && (contrl_itm === "Enabled" || contrl_itm === "Paused" || contrl_itm === "IsBotAccount" || contrl_itm === "SteamUserPermissions" || contrl_itm === "GamesPlayedWhileIdle" || contrl_itm === "SteamMasterClanID")){document.getElementById(contrl_itm+'_form').style.display = "none";}
else if ( status === false && (contrl_itm === "Enabled" || contrl_itm === "Paused" || contrl_itm === "IsBotAccount")) {document.getElementById(contrl_itm+'_form').style.display = "inline-block";}
else if ( status === false && (contrl_itm === "SteamUserPermissions" || contrl_itm === "GamesPlayedWhileIdle" || contrl_itm === "SteamMasterClanID")) {document.getElementById(contrl_itm+'_form').style.display = "block";}



// if(status){my_value=0;}
// else {my_value=1;}

//localStorage[contrl_itm]=my_value;

});


// $('.file').click(function() {
//     $(this).addClass("exclude"); 
// });



$(document).on("click", ".file", function() {
var contrl_itm = $(this).attr('title');

if ($( this ).hasClass( "exclude" )){

var index = exclude_list.indexOf(contrl_itm);
exclude_list.splice(index, 1);
$(this).removeClass("exclude");  

}else{

exclude_list.push(contrl_itm);
$(this).addClass("exclude");  
}








});

//END OF DOCUMENT READY
});



function save_btn_pressed(){

var to_do_Enabled = false;
var to_do_Paused = false;
var to_do_IsBotAccount = false;
var to_do_SteamUserPermissions = false;
var to_do_GamesPlayedWhileIdle = false;
var to_do_SteamMasterClanID = false;

var value_Enabled = false;
var value_Paused = false;
var value_IsBotAccount = false;





var value_SteamUserPermissions = [];
var value_SteamUserPermissions_final = {};

var value_GamesPlayedWhileIdle = "";

var value_SteamMasterClanID = 0;






if($("#Enabled").is(':checked')){ 
to_do_Enabled = true;
console.log("Enabled will be set!");
if($("#Enabled_true").is(':checked')){ value_Enabled = true; } else { value_Enabled = false; }
}

if($("#Paused").is(':checked')){
to_do_Paused = true;
console.log("Paused will be set!");
if($("#Paused_true").is(':checked')){ value_Paused = true; } else { value_Paused = false; }
}


if($("#IsBotAccount").is(':checked')){
to_do_IsBotAccount = true; 
console.log("IsBotAccount will be set!"); 
if($("#IsBotAccount_true").is(':checked')){ value_IsBotAccount = true;  } else { value_IsBotAccount = false; }
}


if($("#SteamUserPermissions").is(':checked')){
to_do_SteamUserPermissions = true;
console.log("SteamUserPermissions will be set!");
var supi_text = document.getElementById('SteamUserPermissions_input').value;
var supi_text = supi_text.replace(/\s/g,'')

if(supi_text.indexOf(";")>=0){
  var supi_arr = supi_text.split(';');

  var supi_arr_corrected = {};

    
    for (j = 0; j < supi_arr.length; j++) {
      var temp10 = supi_arr[j].split(':');

      var temp_name3 = temp10[0];
      var temp_value3 = temp10[1];
      var temp_arr3 = {};
      temp_arr3[temp_name3]=temp_value3;

      supi_arr_corrected[temp_name3]=Number(temp_value3);

      value_SteamUserPermissions_final=supi_arr_corrected;
    }

}

else{

  var supi_arr_corrected_one = supi_text.split(':');

  for (i = 0; i < supi_arr_corrected_one.length; i=i+2) {

    

      var temp_name2 = supi_arr_corrected_one[0];
      var temp_value2 = supi_arr_corrected_one[1];
      var temp_arr1 = {};
      temp_arr1[temp_name2] = Number(temp_value2);
      // console.log(temp_arr1);
      value_SteamUserPermissions.push(temp_arr1);
      value_SteamUserPermissions_final = value_SteamUserPermissions[0];
}
}


}







//TODO Not sure if output should be array or string?!
if($("#GamesPlayedWhileIdle").is(':checked')){
to_do_GamesPlayedWhileIdle = true;
console.log("GamesPlayedWhileIdle will be set!");
var value_GamesPlayedWhileIdle = document.getElementById('GamesPlayedWhileIdle_input').value;
}




if($("#SteamMasterClanID").is(':checked')){
	to_do_SteamMasterClanID = true;
	console.log("SteamMasterClanID will be set!");

var value_SteamMasterClanID = Number(document.getElementById('SteamMasterClanID_input').value);
// console.log(value_SteamMasterClanID);
}









for (var i = 0; i < exclude_list.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
    var temp_val = exclude_list[i];
    delete accounts[temp_val];
}





for (var k in accounts){
    if (accounts.hasOwnProperty(k)) {
      if (to_do_Enabled === true){ accounts[k].Enabled = value_Enabled;}
      if (to_do_Paused === true){ accounts[k].Paused = value_Paused;}
      if (to_do_IsBotAccount === true){ accounts[k].IsBotAccount = value_IsBotAccount;}
      if (to_do_SteamUserPermissions === true){ accounts[k].SteamUserPermissions = value_SteamUserPermissions_final;}
      if (to_do_GamesPlayedWhileIdle === true){ accounts[k].GamesPlayedWhileIdle = value_GamesPlayedWhileIdle;}
      if (to_do_SteamMasterClanID === true){ accounts[k].SteamMasterClanID = value_SteamMasterClanID;}
      // console.log("Key is " + k + ", value is" + k);

    var file = k+'.json';
    var filePath = path.join(config_dir_new, file);

    var temp_holder = JSON.stringify(accounts[k], null, "\t");
    fs.writeFile(filePath, temp_holder, function (err) {
        if (err) {
            console.info("There was an error attempting to save for "+k);
            console.warn(err.message);
            return;
        } else if (callback) {
            callback();
        }
    });













    }
}


}



// saveSettings(mySettings, function () {
//     console.log('Settings for '++' saved');
// });






function saveSettings (settings, file_name, callback) {
    var file = 'my-settings-file.json';
    var filePath = path.join(nw.App.dataPath, file);
    fs.writeFile(filePath, settings, function (err) {
        if (err) {
            console.info("There was an error attempting to save your data.");
            console.warn(err.message);
            return;
        } else if (callback) {
            callback();
        }
    });
}