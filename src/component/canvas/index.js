import EasyCanvas from 'easycanvas';

function main() {
    const data = {
        imgSize: 50,
    };

    const changeSize = function () {
        data.imgSize += 20;
    };

    const $app = new EasyCanvas.Painter({
        el: '#canvas',
        width: 400,
        height: 400
    });

    const $letterG = new EasyCanvas.Sprite({
        content: {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606942377750&di=701c9c3b7816ce5029f5be0a0131dfb7&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201209%2F12%2F0858331k9zk29u26f2mzqn.jpg',
        },
        style: {
            left: EasyCanvas.Transition.pendulum(50, 150, 3000).loop(),
            top: 100,
            width: function () {
                // 这里是类似“数据绑定”的写法，类似Vue应用中的computed
                return data.imgSize;
            },
            height: function () {
                return data.imgSize;
            },
        },
        events: {
            click: changeSize
        }
    });

    $app.add($letterG);
    $app.start();
}

window.addEventListener('load', () => {
    main();
})