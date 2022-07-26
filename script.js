function save(){
    booklist = JSON.parse(localStorage.getItem('listItem')) ?? []
    var id 
    var unique = new Date()
    booklist.length != 0 ? booklist.findLast((item) => id = item.id) : id = 0
        var item = {
            id : unique.getTime(),
            title : document.getElementById('title').value,
            author : document.getElementById('author').value,
            year : document.getElementById('year').value,
            isComplete : document.getElementById('isComplete').checked
        }
        if(item.title == '' || item.title == '' || item.author == '' || item.year == ''){
            alert('data mungkin masih kosong')
        }else{
            alert('data berhasil ditambah',window.location.assign(""))
            booklist.push(item)
        }
    localStorage.setItem('listItem',JSON.stringify(booklist))
    getdata()
    document.getElementById('form').reset()
}
function getdata(){
    let array = JSON.parse(localStorage.getItem('listItem'));
    if (array!=null) {
        let html = '';
        let data = '';
    for (let k in array) {
        if(array[k].isComplete == false){
            html = html+
        `<div class='belumselesai'>
        <h2 class='judul'>${array[k].title}</h2>
        <p class='author'>Penulis : ${array[k].author}</p>
        <p class='year'>Tahun : ${array[k].year}</p>
        <div class='bagian-button'>
        <button class='hijau' onclick='changenofinish(${array[k].id})'>selesai dibaca</button>
        <button class='merah' onclick='removebook(${k})'>hapus buku</button>
        </div>
        </div>`;
            // console.log('belum selesai dibaca')
        }else{
            data = data+
        `<div class='belumselesai'>
        <h2 class='judul'>${array[k].title}</h2>
        <p class='author'>Penulis : ${array[k].author}</p>
        <p class='year'>Tahun : ${array[k].year}</p>
        <div class='bagian-button'>
        <button class='hijau'onclick='changefinish(${array[k].id})'>belum selesai dibaca</button>
        <button class='merah' onclick='removebook(${k})'>hapus buku</button>
        </div>
        </div>`;
            // console.log('sudah selesai dibaca')
        }
    }
    document.getElementById('cardselesai').innerHTML=data;
    document.getElementById('cardbelum').innerHTML=html;
    }
}
getdata()
function removebook(rid) {
    let array = getCrudData()
    let konfirmasi = confirm('apakah yakin ingin menghapus data ini')
    if (konfirmasi == true) {
        array.splice(rid,1)
        alert('data berhasil di hapus')
        localStorage.setItem('listItem',JSON.stringify(array))
    }else{
        alert('data safe')
    }
    getdata()
}
function changenofinish(rid) {
    let changebook = JSON.parse(localStorage.getItem('listItem'));
    console.log(changebook);
    changebook.forEach(value => {
        if (value.id == rid) {
            console.log(value)
            value.isComplete = true
            localStorage.setItem('listItem',JSON.stringify(changebook))
            getdata()
        }
    });
}
function changefinish(rid){
    let changebook = JSON.parse(localStorage.getItem('listItem'));
    console.log(changebook);
    changebook.forEach(value => {
        if (value.id == rid) {
            console.log(value)
            value.isComplete = false
            localStorage.setItem('listItem',JSON.stringify(changebook))
            getdata()
        }
    });
}
function getCrudData() {
    let arr = JSON.parse(localStorage.getItem('listItem'))
    return arr
}
function cari(){
    let input = document.getElementById("search").value
    input = input.toLowerCase();
    let x = document.getElementsByClassName("belumselesai");
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";              
        }
    }
}
cari()