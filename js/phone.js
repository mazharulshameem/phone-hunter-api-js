const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";
  // display 10 phone
  const seeAll = document.getElementById("see-all");
  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);
    seeAll.classList.remove("d-none");
  } else {
    seeAll.classList.add("d-none");
  }
  // display not found
  const noPhones = document.getElementById("not-found");

  if (phones.length === 0) {
    noPhones.classList.remove("d-none");
  } else {
    noPhones.classList.add("d-none");
  }

  // display found all phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
           <div class="col">
              <div class="card h-50 ">
                <img src="${phone.image}" class="card-img-top h-25" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Name: ${phone.phone_name}</h5>
                  <p class="card-text">A mobile phone, cellular phone, cell phone, cellphone, handphone, hand phone or pocket phone.</p>
                </div>
                <div class="card-footer">
                  <button onclick="loadPhoneDetails ('${phone.slug}')"class="btn btn-outline-primary"data-bs-toggle="modal" data-bs-target="#loadDetailsModal">Details</button>
                </div>
              </div>
            </div>
    
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  //  loader stop
  loaderSpinner(false);
};

const processSearch = (dataLimit) => {
  loaderSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  processSearch(6);
});
// search enter field key press 
document.getElementById('search-field').addEventListener('keypress',function(e){
  
if (e.key === 'Enter'){
processSearch(6);
}
})

const loaderSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
// sell all phone
document.getElementById("btn-see-all").addEventListener("click", function () {
  processSearch();
});
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};

// loadPhones();
