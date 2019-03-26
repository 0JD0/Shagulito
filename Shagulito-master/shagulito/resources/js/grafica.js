new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Pan Frances", "Pan Dulce", "Menudos", "Postres", "Bebidas"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [400,350,275,300,250]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Productos mas vendidos 01/03/2019'
      }
    }
});                            
  new Chart(document.getElementById("bar-chart1"), {
  type: 'bar',
  data: {
      labels: ["Guitarra", "Bajos", "Baterias", "Piano", "Amplicador"],
      datasets: [
      {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [225,130,120,350,300]
      }
      ]
  },
  options: {
      legend: { display: false },
      title: {
      display: true,
      text: 'Productos mas vendidos 01/02/2019'
      }
  }
  });
  new Chart(document.getElementById("bar-chart2"), {
  type: 'bar',
  data: {
      labels: ["Guitarra", "Bajos", "Baterias", "Piano", "Amplicador"],
      datasets: [
      {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [225,130,120,350,300]
      }
      ]
  },
  options: {
      legend: { display: false },
      title: {
      display: true,
      text: 'Productos mas vendidos 01/02/2019'
      }
  }
  });