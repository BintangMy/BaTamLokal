function splitTransactions(array) {
  // Your code here
  let arr = []
  let result = []
  let str = ''


  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === '-') {
        arr.push(str);
        str = ''
      } else {
        str += array[i][j]
      }
    }
    arr.push(str)
    str = ''
    result.push(arr)
    arr = []

  }
  return result
}



function sortItemsByNumber(array) {
  // Your code here


  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j][0] > array[j + 1][0]) {
        let move = array[j]
        array[j] = array[j + 1]
        array[j + 1] = move
      }
    }
  }
  return array
}


function objectify(item) {
  // Your code here

  let tamp = {}
  let origin = item[0]
  let destination = item[1]
  let heavy = Number(item[2])
  let long = Number(item[3])
  let width = Number(item[4])
  let height = Number(item[5])


  tamp['origin'] = origin
  tamp['destination'] = destination
  tamp['heavy'] = heavy
  tamp[`long`] = long
  tamp['width'] = width
  tamp['height'] = height


  return tamp
}


function calculatePrice(items) {
  const distance = ['Bahagia', 'Kebalen', 'Babelan Kota', 'Buni bakti', 'Hurip jaya', 'Kedung jaya', 'Kedung pengawas', 'Muara bakti', 'Pantai Hurip', 'Jejalen jaya', 'Karang satria', 'Satria jaya', 'Satria mekar', 'Sriamur', 'Srijaya', 'Srimahi', 'Srimukti', 'Tridaya Sakti', 'Lambang jaya', 'Lambang sari', 'Mangun jaya', 'Mekarsari', 'Setia darma', 'Setia mekar', 'Sumber jaya', 'Jatimulya'];
  // Your code here
  
  let split = splitTransactions(items);
  let sorting = sortItemsByNumber(split);
  let list = []
  let massa = []
  for (let i = 0; i < sorting.length; i++) {
    list.push(objectify(sorting[i]))
  }

  for (let i = 0; i < list.length; i++) {
    let asal = 0
    let tujuan = 0
    for (let j = 0; j < distance.length; j++) {
      if (list[i][`origin`] === distance[j]) {
        asal = j

      }
      if (list[i][`destination`] === distance[j]) {
        tujuan = j

      }
    }
    let dimention = (list[i][`long`] * list[i][`width`] * list[i][`height`]) / 6000;
    let berat = dimention
    let massa = 0

    berat = Math.floor(berat)

    if (berat < 1) {
      berat = 1
    }

    dimention = dimention.toString()
    if (dimention.length > 4) {
      dimention = dimention[0] + dimention[1] + dimention[2] + dimention[3]
    }



    massa = `${dimention} KG`
    list[i][`dimention`] = massa


    let jarak = Math.abs(tujuan - asal)
    let reguler = 1000 * jarak * berat * (list[i][`heavy`] * (6 / 100))
    let instan = 1500 * jarak * berat * (list[i][`heavy`] * (6 / 100))

    reguler =  Math.floor(reguler);
    instan = Math.floor(instan);


    if (reguler < 15000) {
      reguler = 15000
    }
    if (instan < 20000) {
      instan = 20000
    }


    list[i][`reguler`] = reguler
    list[i][`instan`] = instan

    
    
  }

  return list;

}

let asal;
let tujuan;
let berat;
let panjang;
let lebar;
let tinggi;
let pengirim;


let arr = []
document.getElementById('submit').onclick = function () {
  asal = document.querySelector('#asal').value;
  tujuan = document.querySelector('#tujuan').value;
  berat = document.getElementById('berat').value;
  panjang = document.getElementById('panjang').value;
  tinggi = document.getElementById('tinggi').value;
  lebar = document.getElementById('lebar').value;
  arr.push(`${asal}-${tujuan}-${berat}-${panjang}-${tinggi}-${lebar}`)
  let data = calculatePrice(arr)


  arr = []

  let origins = data[0].origin
  let destinations = data[0].destination
  let dimensions = data[0].dimention
  let instans = data[0].instan
  let regulers = data[0].reguler
  document.getElementById('origin').innerHTML = origins;
  document.getElementById('detination').innerHTML = destinations;
  document.getElementById('dimension').innerHTML = dimensions;
  document.getElementById('instan').innerHTML = instans;
  document.getElementById('reguler').innerHTML = regulers;

  return data


}



