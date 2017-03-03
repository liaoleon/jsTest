jQuery(document).ready(function () {
	var Jcrop_api
	function setJcrop(){
		$("#jcrop_target").Jcrop({  
		  onChange: showCoords,  
		  onSelect: showCoords  
		},function(){
			Jcrop_api = this;
		});
	}

	function showCoords(c){
	    $('#x1').val(c.x);
	    $('#y1').val(c.y);
	    $('#x2').val(c.x2);
	    $('#y2').val(c.y2);
	    $('#w').val(c.w);
	    $('#h').val(c.h);
  	};

  	$("#imgUploadBtn").change(function(){
		if (this.files && this.files[0]) {
			var reader = new FileReader();	
			reader.onload = function (e) {
				//$("#jcrop_target").attr('src', e.target.result);
				setJcrop();
				Jcrop_api.setImage(e.target.result);
			}			
			reader.readAsDataURL(this.files[0]);
		}
	});
});