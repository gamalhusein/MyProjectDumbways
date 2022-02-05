let blogs = [] // <- menggunakan array kosong di function

let month = [
  'January',
  'Februari',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Desember'
]
function addBlog(event){
    

    //untuk mencegah reload web
    event.preventDefault()

    let title = document.getElementById('input-blog-title').value
    let content = document.getElementById('input-blog-content').value
    let image = document.getElementById('input-blog-image')

    image = URL.createObjectURL(image.files[0])

    let blog = {
        author : "Gamal Husein" , 
        title,
        content,
        image,
        postedAt : new Date()
    }
    let array = [title, content, image]
    blogs.push(blog)
    renderBlog()
    console.table(blog)
}
function renderBlog(){
    // console.log(blogs[0])

    let lengthData = blogs.length
    let blogContainer = document.getElementById('contents')
    blogContainer.innerHTML = firstBlogContent()    
    // console.log(lengthData)
    // blogs[data1,index1,index2,index3]
    let i = 0
    for (i; i < lengthData; i++){  // < - menambahkan data ketika dihapus itu tidak dari awal lagi
        //console.log(`nilai ${i}`) <- cek nilai i 
            blogContainer.innerHTML += `
            <div class="blog-list-item">
            <div class="blog-image">
              <img src="${blogs[i].image}" alt="" />
            </div>
            <div class="blog-content">
              <div class="btn-group">
                <button class="btn-edit">Edit Post</button>
                <button class="btn-post">Post Blog</button>
              </div>
              <h1>
                <a href="blog-detail.html?id=${blogs[i].title}" target="_blank"
                  >${blogs[i].title}</a
                >
              </h1>
              <div class="detail-blog-content">
              ${getfullTime(blogs[i].postedAt)} |${blogs[i].author}
              </div>
              <p>
              ${blogs[i].content}
              </p>
            <div style="text-align: right;">
              <span style="font-size: 15px; color: grey;">${getDistanceTime(blogs[i].postedAt)}</span>
            </div>
            </div>`
        console.table(blogs[i])
    }
}
function firstBlogContent(){
    return `     <div class="blog-list-item">
    <div class="blog-image">
      <img src="image/blog-img.png" alt="" />
    </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Post Blog</button>
      </div>
      <h1>
        <a href="blog-detail.html" target="_blank"
          >Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a
        >
      </h1>
      <div class="detail-blog-content">
        12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
      </div>
      <p>
        Ketimpangan sumber daya manusia (SDM) di sektor digital masih
        menjadi isu yang belum terpecahkan. Berdasarkan penelitian
        ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
        meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Quam, molestiae
        numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
        eligendi debitis?
      </p>
    <div style="text-align: right;">
      <span style="font-size: 15px; color: grey;">1 Hour Ago</span>
    </div>
    </div>
  </div>`
}
setInterval (function(){
  renderBlog()// <- function anonymous
}, 2000)

function getfullTime(time){

  let date = time.getDate()
  let monthIndex = time.getMonth()
  let year = time.getFullYear()

  let hours = time.getHours()
  let minutes = time.getMinutes()

  if (minutes < 10){
    minutes = '0'+minutes
  }

  return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB `


}

function getDistanceTime(time){
// waktu saat ini - waktu saat posting
const distance = new Date() - new Date(time)

//convert to day
const miliseconds = 3600 
const secondsInMinuete = 60
const minuteInHour = 60
const secondsInHour = secondsInMinuete * minuteInHour
const hoursInDay = 23 

let dayDistance = distance/ (miliseconds * secondsInHour * hoursInDay)
//dayDistance = 0.1

if (dayDistance >= 1){
  return Math.floor(dayDistance) + 'day ago' // math.floor membulatkan ke bawah  ex = 4,3 jadi 4 ; kalau math.ceil membulatkan keatas ex = 4,3 jadi 5
}else{
  //convert to minute
  const minuteDistance = Math.floor(distance / (miliseconds * secondsInMinuete))
  return minuteDistance + ' Minutes Ago'
}

console.log(dayDistance)
}