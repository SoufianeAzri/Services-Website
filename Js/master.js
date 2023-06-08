let landing = document.querySelector(".landing-page");
let images = ["01.jpg","02.jpg","03.webp","04.jfif","05.jpg"];
//landing.style.backgroundImage = 'url("Images/05.jpg")';
landing.style.transition = "0.8s"
let randomNum = Math.floor(Math.random()*images.length);
let randomizeImg = true;
let backgroundInterval;
function radomImg(){
    if(randomizeImg === true){
        backgroundInterval = setInterval(()=>{
            let randomNum = Math.floor(Math.random()*images.length);
            landing.style.backgroundImage = 'url("Images/'+images[randomNum]+'")';
        },1000);
    }
}
document.querySelector(".setting-box .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}
let Local = localStorage.getItem('option_color');
if(Local !== null){
    console.log("locale Storage Not Empty");
    document.documentElement.style.setProperty('--main-color',Local);
    document.querySelectorAll(".color-list li").forEach((ele)=>{
        ele.classList.remove("active");
        if(ele.dataset.color === Local){
            ele.classList.add("active");
        }
    })
}
let colorList = document.querySelectorAll(".color-list li");
colorList.forEach((li)=>{
    li.addEventListener("click",(e)=>{
        console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem("option_color",e.target.dataset.color);
        handle(e);
    })
});
let backLocal = localStorage.getItem("background_option");
if(backLocal !== null){
    console.log("Option is Not Null You can Change Background");
    if(backLocal === "true"){
        randomizeImg === true;
        radomImg();
    }else{
        randomizeImg === false;
    }
    console.log(backLocal);
    document.querySelectorAll(".random-background span").forEach((span)=>{
        span.classList.remove("active");
    });
    if(backLocal === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    }
}
let randBack = document.querySelectorAll(".random-background span");
randBack.forEach((span)=>{
    span.addEventListener("click",(sp)=>{
        sp.target.parentElement.querySelectorAll(".active").forEach((s)=>{
            s.classList.remove("active");
        });
        sp.target.classList.add("active");
        if(sp.target.dataset.background === "yes"){
            randomizeImg = true;
            radomImg();
            localStorage.setItem("background_option", true);
        }else{
            randomizeImg = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
let ourSkills = document.querySelector(".skills");
ourSkills.style.transition = "all 1s"
window.onscroll = function(){
    // skill ofsset top
    let skillOffssetTop = ourSkills.offsetTop;

    // skills Outer Heigt
    let skillOuterHeight = ourSkills.offsetHeight;


    // window Height
    let windowHeight = this.innerHeight;



    // window Scroll Top
    let windowScrollTop = this.pageYOffset;
    windowScrollTop = windowScrollTop + 100;

    console.log(windowScrollTop);
    console.log(skillOffssetTop + skillOuterHeight - windowHeight);

    if( windowScrollTop > (skillOffssetTop + skillOuterHeight - windowHeight)){
        console.log("here");
        let allSkills = document.querySelectorAll(".skills .skill-progress span");
        allSkills.forEach((span)=>{
            span.style.width = span.dataset.progress;
        })
    }
};


let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img)=>{
    img.addEventListener('click',(i)=>{
        let overly = document.createElement("div");
        overly.className = "popup-overly";
        document.body.appendChild(overly);

        let popupBox = document.createElement("div");
        popupBox.className = "popupBox";
        if(img.alt !== null){
            let imageHeading = document.createElement("h3");
            imageHeading.className = "image-heading"
            let heading = document.createTextNode(img.alt);
            imageHeading.appendChild(heading);
            popupBox.appendChild(imageHeading);
        }
        let image = document.createElement("img");
        image.src = img.src;
        popupBox.appendChild(image);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        closeButton.className = "closeButton";
        let closeTxt = document.createTextNode("X");
        closeButton.appendChild(closeTxt);
        popupBox.appendChild(closeButton);
    });
});
document.addEventListener('click',function(e){
    if(e.target.classList == 'closeButton'){
        e.target.parentNode.remove();
        document.querySelector(".popup-overly").remove();
    }
});
    const allBullets = document.querySelectorAll(".nav-bullets .bullet");
    /*allBullets.forEach(bullet =>{
        bullet.addEventListener('click',(e)=>{
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });*/

let allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elemet){
    elemet.forEach(bullet =>{
        bullet.addEventListener('click',(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    }); 
}
function handle(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach((ele)=>{
        ele.classList.remove("active");
    });
    ev.target.classList.add("active");
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
let localBulletItem = localStorage.getItem("bullet_option");
let showBullets = document.querySelectorAll(".show-bullets span");
let bulletContainer = document.querySelector(".nav-bullets");
if(localBulletItem !== null){
    showBullets.forEach(span=>{
        span.classList.remove("active");
    });
    if(localBulletItem === "show"){
        bulletContainer.style.display = "block";
        document.querySelector(".show-bullets .yes").classList.add("active");
    }else{
        bulletContainer.style.display = "none";
        document.querySelector(".show-bullets .no").classList.add("active");
    }
}
showBullets.forEach(span =>{
    span.addEventListener("click",(e)=>{
        if(e.target.dataset.display === "show"){
            bulletContainer.style.display = "block";
            localStorage.setItem("bullet_option",'show');
        }else{
            bulletContainer.style.display = "none";
            localStorage.setItem("bullet_option",'hide');
        }
        handle(e);
    });
})
document.querySelector(".reset-option").onclick = function(){
    //localStorage.clear();
    localStorage.removeItem("bullet_option");
    localStorage.removeItem("option_color");
   // localStorage.removeItem("background_option");
    window.location.reload();
}
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");
toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
}
document.addEventListener("click",(e)=>{
    if(e.target !== toggleBtn && e.target !== tlinks){
        console.log("this is not button");
        if(tlinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }

    }
})
tlinks.onclick = function(e){
    e.stopPropagation();
}