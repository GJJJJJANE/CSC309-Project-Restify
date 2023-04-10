$(function() {
    $(document).on("change",".uploadFile", function()
    {
            var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;
 
        if (/^image/.test( files[0].type)){ 
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
 
            reader.onloadend = function(){
uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
            };
        }
      
    });
});

//reference: https://codepen.io/MR_RooT/pen/RwPErrB