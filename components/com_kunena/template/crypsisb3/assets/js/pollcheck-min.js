jQuery(document).ready(function(c){var b=jQuery.parseJSON(Joomla.getOptions("com_kunena.pollcategoriesid"));if(typeof b!=="undefined"&&b!==null&&c("#poll_exist_edit").length===0){var a=c("#kcategory_poll").val();if(b[a]!==undefined){c(".pollbutton").show();}else{c(".pollbutton").hide();}}else{if(c("#poll_exist_edit").length>0){c(".pollbutton").show();}else{c(".pollbutton").hide();}}});