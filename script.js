document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        'Cozinha': document.getElementById('cozinhaContainer'),
        'Sala': document.getElementById('salaContainer'),
        'Banheiro': document.getElementById('banheiroContainer'),
        'Quarto': document.getElementById('quartoContainer'),
        'Lavanderia': document.getElementById('lavanderiaContainer')
    };

    const folders = ['Cozinha', 'Sala', 'Banheiro', 'Quarto', 'Lavanderia'];

    folders.forEach(folder => {
        fetchImagesFromFolder(folder);
    });

    function fetchImagesFromFolder(folder) {
        fetch(folder)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const folderDOM = parser.parseFromString(html, 'text/html');
                const images = folderDOM.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".jpeg"], a[href$=".webp"]');
                
                images.forEach(image => {
                    const imageUrl = image.getAttribute('href');
                    const fileName = imageUrl.split('/').pop(); // Pegar apenas o nome do arquivo
                    const imageName = decodeURIComponent(fileName.split('.')[0]); // Pegar apenas o nome sem a extensão e decodificar
                    createImageElement(imageUrl, imageName, folder);
                });
            })
            .catch(error => console.error('Erro ao carregar imagens:', error));
    }

    function createImageElement(url, title, folder) {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        const image = document.createElement('img');
        image.src = url;
        image.alt = title;

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        imageDiv.appendChild(image);
        imageDiv.appendChild(titleElement);

        sections[folder].appendChild(imageDiv); // Adiciona a imagem ao contêiner correto
    }
});
