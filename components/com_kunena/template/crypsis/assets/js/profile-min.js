jQuery(document).ready(function(){if(jQuery.fn.datepicker!==undefined){jQuery("#birthdate .input-append.date").datepicker({orientation:"top auto"});}var a=jQuery.parseJSON(Joomla.getOptions("com_kunena.avatartab"));if(a){jQuery(".nav-tabs a[href=#editavatar]").tab("show");}});