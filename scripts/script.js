
const videoGrid = document.querySelector('.video-grid');

function reload(arr) {
    videoGrid.innerHTML = '';
    for (let video of arr) {
        const videoItem = document.createElement('div');
        const img = document.createElement('img');
        const videoInfo = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const closeButton = document.createElement('button');
        const modifyButton = document.createElement('button');
        const closeDialog = document.createElement('button');
        const imgModify = document.createElement('img');
        const dialog = document.createElement('dialog');
        const box = document.createElement('div');
        const title = document.createElement('input');
        const channel = document.createElement('input');
        const save = document.createElement('button');

        img.setAttribute('src', video.thumbnail);
        img.setAttribute('alt', video.title);
        imgModify.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Edit-1287617.svg/640px-Edit-1287617.svg.png');

        h3.innerHTML = video.title;
        p.innerHTML = video.channel;
        closeButton.innerHTML = 'X';
        closeDialog.innerHTML = 'X';
        save.innerHTML = 'Save';

        videoInfo.classList.add('video-info');
        videoItem.classList.add('video-item');
        closeButton.classList.add('close-btn');
        modifyButton.classList.add('modify-btn');
        imgModify.classList.add('modify-img');
        closeDialog.classList.add('closeDialog');
        box.classList.add('box-dialog');

        closeButton.onclick = () => {
            const filteredArray = videos.filter((item) => item.id !== video.id);
            localStorage.setItem('videos', JSON.stringify(filteredArray));
            reload(filteredArray);
        };

        modifyButton.onclick = () => {
            title.value = video.title;
            channel.value = video.channel;
            dialog.showModal();
        };

        closeDialog.onclick = () => {
            dialog.close();
        };

        save.onclick = () => {
            video.title = title.value;
            video.channel = channel.value;
            localStorage.setItem('videos', JSON.stringify(videos));
            reload(videos);
            dialog.close();
        };

        videoInfo.append(h3, p);
        videoItem.append(img, videoInfo, closeButton, modifyButton, dialog);
        videoGrid.append(videoItem);
        modifyButton.append(imgModify);
        dialog.append(closeDialog, box);
        box.append(title, channel, save);
    }
}

const input = document.querySelector('input');

input.onsearch = () => {
    const value = input.value.toLowerCase();
    const filteredArray = videos.filter((item) => item.title.toLowerCase().includes(value));
    reload(filteredArray);
};
