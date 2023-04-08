$(document).ready(function(){
    $("#record").css("display","block");
    $("#achievement").css("display","none");
})

$(function(){
    $("#myTabs a").click(function(e){
        e.preventDefault();
        $("#tab-1").toggleClass("tab-underline");
        $("#tab-2").toggleClass("tab-underline");
    })
})

$("#tab-1").click(function(e){
    e.preventDefault();
    $("#record").css("display","block");
    $("#achievement").css("display","none");
})

$("#tab-2").click(function(e){
    e.preventDefault();
    $("#achievement").css("display","block");
    $("#record").css("display","none");
})
    

$(function(){
    $("#myTab button").click(function(e){
        e.preventDefault();
        $(this).tab1("show");
    })
})

//上传图片
window.addEventListener("load", () => {
    const $camera = document.querySelector("input");
    $camera.setAttribute("capture", "user");
    $camera.onchange = handleTakePhoto;
    //处理照片数据
    function handleTakePhoto(e) {
        // 读取照片
        if (this.files && this.files[0]) {
            const fileData = this.files[0],
                fileReader = new FileReader();
            fileReader.readAsDataURL(fileData);
            fileReader.onload = (e) => {
                changePhotoSize(fileReader.result).then(res => {
                    const $img = document.querySelector(".img-container img");
                    $img !== null && ($img.src = res);
                }).catch(e => { })
            };
        }
    }
    //调整照片大小
    function changePhotoSize(imgData) {
        const $canvas = document.querySelector(".used-for-changing-photo-size"),
            context = $canvas.getContext("2d"),
            image = new Image(),
            // 设置目标宽度（高度随原比例变化）
            targetWidth = 480;
        let aspectRatio = 1;
        image.src = imgData;
        return new Promise((resolve, reject) => {
            image.onload = function () {
                aspectRatio = (this.height / this.width).toFixed(3);
                this.height = aspectRatio * targetWidth;
                this.width = targetWidth;
                $canvas.setAttribute("width", this.width + "px");
                $canvas.setAttribute("height", this.height + "px");
                context.drawImage(this, 0, 0, this.width, this.height);
                resolve($canvas.toDataURL());
            };
            image.onerror = (e) => {
                reject(e);
            };
        });
    }
});

