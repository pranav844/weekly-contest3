document.addEventListener('DOMContentLoaded', function() {
    getCurrentImageOfTheDay();
  
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchHistory = document.getElementById('search-history');
  
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const date = searchInput.value;
      getImageOfTheDay(date);
      saveSearch(date);
      addSearchToHistory();
    });
  });
  
  function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
  }
  
  function getImageOfTheDay(date) {
    fetchImage(date);
  }
  
  function fetchImage(date) {
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => displayImage(data))
      .catch(error => console.log(error));
  }
  
  function displayImage(data) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = `
      <img src="${data.url}" alt="${data.title}">
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
    `;
  }
  
  function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
  
  function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
  
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
      const listItem = document.createElement('li');
      listItem.textContent = date;
      listItem.addEventListener('click', function() {
        getImageOfTheDay(date);
      });
      searchHistory.appendChild(listItem);
    });
  }
  