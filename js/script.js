let getDataFlag = true;

const showPreloader = () => {
    let preloader = document.querySelector('img');
    preloader.style.display = 'block';
};

const hidePreloader = () => {
    let preloader = document.querySelector('img');
    preloader.style.display = 'none';
};

const getData = () => {
    fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(response => response.json())
        .then(data => {
            let line = document.createElement('hr');
            document.body.appendChild(line);

            for (let user of data) {
                let userId = document.createElement('p');
                let userName = document.createElement('p');
                let userWeb = document.createElement('p');

                userId.innerText = `User ID: ${user.id}`;
                userName.innerText = `User Name: ${user.name}`;
                userWeb.innerHTML = `<p>User URL: ${user.website}<br>--------</p>`;

                document.body.appendChild(userId);
                document.body.appendChild(userName);
                document.body.appendChild(userWeb);
            };

            hidePreloader();
            getDataFlag = true;
        })

        .catch(error => {
            console.error(error);
        });
};

const scrollToEndOfPage = () => {
    if (document.documentElement.clientHeight + Math.ceil(document.documentElement.scrollTop) >= document.documentElement.scrollHeight && getDataFlag) {
        getDataFlag = false;
        showPreloader();
        getData();
    };
};

window.addEventListener('scroll', scrollToEndOfPage);