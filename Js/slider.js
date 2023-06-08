// Get Slider Items
var sliderImage = Array.from(document.querySelectorAll('.slider-container img'));
console.log(sliderImage);
// Number of slides
let slidesCount = sliderImage.length;
// Curent Slider
var currentSlide = 1;
var slideElementNumber = document.getElementById("slide-number");

// Next Button
var nextButton = document.getElementById("next");
nextButton.onclick = nextSlide;
// Prev Button
var prevButton = document.getElementById("prev");
prevButton.onclick = prevSlide;
// Slides 
function nextSlide(){
    if(nextButton.classList.contains('disabled')){
        return false;
    }else{
        currentSlide++;
        cheaker();
    }
}
function prevSlide(){
    if(prevButton.classList.contains('disabled')){
        return false;
    }else{
        currentSlide--;
        cheaker();
    }
}

var paginationUl = document.createElement("ul");
paginationUl.setAttribute('id','pagination-ul');
for(var i = 1 ;i <= slidesCount ;i++){
    var paginationItem = document.createElement("li");
    paginationItem.setAttribute('data-index',i);
    paginationItem.appendChild(document.createTextNode(i));
    paginationUl.appendChild(paginationItem);
}
document.getElementById('indicateurs').appendChild(paginationUl);
var paginationBullets = Array.from(document.querySelectorAll('#pagination-ul li'));
var createdPaginationEle = document.getElementById('pagination-ul');
// for(var i = 0 ; i < paginationBullets.length ; i++){
//     paginationBullets[i].onclick = function(){
//         currentSlide = parseInt(this.getAttribute('data-index'));
//         cheaker();
//     }
// }
let liPagination = document.querySelectorAll('#pagination-ul li');
liPagination.forEach((li)=>{
    li.addEventListener('click',(e)=>{
        console.log(e.target.dataset.index);
        currentSlide = e.target.dataset.index;
        cheaker();
    })
})
cheaker();









function cheaker(){
    slideElementNumber.textContent = 'Slide #' + (currentSlide) + ' of ' + (slidesCount);
    removeAllActive();
    sliderImage[currentSlide - 1].classList.add("active");
    createdPaginationEle.children[currentSlide - 1].classList.add('active');
    if(currentSlide == 1){
        prevButton.classList.add('disabled');
    }else{
        prevButton.classList.remove('disabled');
    }
    if(currentSlide == slidesCount){
        nextButton.classList.add('disabled');
    }else{
        nextButton.classList.remove('disabled');
    }
}
function removeAllActive(){
    sliderImage.forEach((img)=>{
        img.classList.remove('active');
    });
    paginationBullets.forEach((bullet)=>{
        bullet.classList.remove('active');
    })
}