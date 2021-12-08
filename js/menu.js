document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('pizza1').addEventListener('mouseover', function () {
        document.getElementById('pizza1').classList.add('hovercss');
    })

    document.getElementById('pizza1').addEventListener('mouseout', function () {
        document.getElementById('pizza1').classList.remove('hovercss');
    });

    document.getElementById('pizza2').addEventListener('mouseover', function () {
        document.getElementById('pizza2').classList.add('hovercss');
    })

    document.getElementById('pizza2').addEventListener('mouseout', function () {
        document.getElementById('pizza2').classList.remove('hovercss');
    });

    document.getElementById('pizza3').addEventListener('mouseover', function () {
        document.getElementById('pizza3').classList.add('hovercss');
    })

    document.getElementById('pizza3').addEventListener('mouseout', function () {
        document.getElementById('pizza3').classList.remove('hovercss');
    });

    document.getElementById('pizza4').addEventListener('mouseover', function () {
        document.getElementById('pizza4').classList.add('hovercss');
    })

    document.getElementById('pizza4').addEventListener('mouseout', function () {
        document.getElementById('pizza4').classList.remove('hovercss');
    });


});