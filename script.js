/*const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
});
*/

const toggleButton = document.getElementById('toggleMode');
    const body = document.body;

    // Varsayılan mod
    body.classList.add('day');

    toggleButton.addEventListener('click', () => {
        // Modları değiştir
        if (body.classList.contains('day')) {
            body.classList.remove('day');
            body.classList.add('night');
            toggleButton.textContent = '🌜'; // Gece simgesi
        } else {
            body.classList.remove('night');
            body.classList.add('day');
            toggleButton.textContent = '🌞'; // Gündüz simgesi
        }
    });


       // OpenLayers Map Setup
       const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([32.8597, 39.9256]), // Ankara
            zoom: 13
        })
    });

    // Tooltip
    const tooltip = document.getElementById('tooltip');

    // Marker Positions for Memories
    const memoryPlaces = [
        { name: "Anıtkabir", coords: [32.8597, 39.9256], image: 'img/anitkabir.jpg' },
        { name: "Armada", coords: [32.8087, 39.9111], image: 'img/armada.jpg' },
        { name: "ODTÜ", coords: [32.7479, 39.8998], image: 'img/odtu.jpg' }
    ];

    // Add Markers for Memory places
    memoryPlaces.forEach(place => {
        const marker = new ol.Overlay({
            position: ol.proj.fromLonLat(place.coords),
            positioning: 'center-center',
            element: document.createElement('div'),
            stopEvent: false
        });

        const markerEl = marker.getElement();
        markerEl.className = 'marker';

        // Show tooltip on mouseover
        markerEl.addEventListener('mouseover', (e) => {
            tooltip.innerHTML = place.name;
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = e.pageY + 'px';
        });

        // Hide tooltip on mouseout
        markerEl.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        // Click on marker to show image
        markerEl.onclick = () => {
            showImage(place.image);
        };

        map.addOverlay(marker);
    });

    // Marker Positions for Jobs
    const jobPlaces = [
        { name: "Yunus Emre Termik Santrali", coords: [31.634016611952752, 39.98387482322555], image: 'img/job1.jpg' },
        { name: "Koni Mühendislik", coords: [32.82621958750053, 39.893179989282494], image: 'img/job2.jpg' },
        { name: "Kartallar Holding", coords: [32.80109689906386, 39.917060073973815], image: 'img/job3.jpg' }
    ];

    // Add Markers for Job places
    jobPlaces.forEach(place => {
        const marker = new ol.Overlay({
            position: ol.proj.fromLonLat(place.coords),
            positioning: 'center-center',
            element: document.createElement('div'),
            stopEvent: false
        });

        const markerEl = marker.getElement();
        markerEl.className = 'marker';

        // Show tooltip on mouseover
        markerEl.addEventListener('mouseover', (e) => {
            tooltip.innerHTML = place.name;
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = e.pageY + 'px';
        });

        // Hide tooltip on mouseout
        markerEl.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        // Click on marker to show image
        markerEl.onclick = () => {
            showImage(place.image);
        };

        map.addOverlay(marker);
    });

    // Memory Items Click Event
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const coords = JSON.parse(item.getAttribute('data-coords'));
            const view = map.getView();
            view.setCenter(ol.proj.fromLonLat(coords));
            view.setZoom(15);
            showImage(item.getAttribute('data-image'));
        });
    });

    // Job Items Click Event
    const jobItems = document.querySelectorAll('.job-item');
    jobItems.forEach(item => {
        item.addEventListener('click', () => {
            const coords = JSON.parse(item.getAttribute('data-coords'));
            const view = map.getView();
            view.setCenter(ol.proj.fromLonLat(coords));
            view.setZoom(15);
            showImage(item.getAttribute('data-image'));
        });
    });

    // Show Image Function
    function showImage(imageSrc) {
        document.getElementById('modalImage').src = imageSrc;
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    }

    // Close Modal Function
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
    });

    // Close Modal on Overlay Click
    document.querySelector('.overlay').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
    });