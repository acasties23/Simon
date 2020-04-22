let level = 0, sequence = [], playerSequence = [], simon = true, player = false, cpt = 0, tmp=1;

$(document).ready(function () {

    $('.level').html('Cliquez ici pour commencer');

    $('.circle').click(function () {
        if (simon === true){
            StartGame();
        }
    });
    $('.pad').click(function () {
        if (player === true) {
            Click($(this).attr("data-pad"));
            playerSequence.push($(this).attr("data-pad"));
            cpt --;

            if (cpt ===0 ){
                Verify();
                player = false;
            }
        }
    });

    function StartGame() {
        simon = false;
        level ++;
        $(".level").html("Level " + level);
        SimonSay();
    }

    function SimonSay() {
        for (let i = 0; i < level +1 ; i++) {
            let rand = 1+ Math.floor(Math.random() * 4);
            sequence.push(""+rand);
        }
        PlaySequence();
    }

    function PlaySequence() {
        setTimeout(function () {
            if (cpt < sequence.length) {
                Click(sequence[cpt]);
                cpt++;
                PlaySequence();
            } else {
                $(".level").html(" à toi !");
                player = true;
            }
        },500);
    }

    function Click(num) {
        $('.shape' + num).addClass("select");
        $('.sound'+ num).trigger('load').trigger('play');
        setTimeout(function () {
            $('.shape' + num).removeClass("select");
        }, 200);
    }

    function Verify() {
        let win = true;

        for (let i = 0; i < sequence.length ; i++) {
            if (sequence[i] !== playerSequence[i]){
                win = false;
            }
        }

        if (win === false){
            $(".level").html("Perdu");
            setTimeout(function () {
                $(".level").html("Cliquez pour recommencer ");
                level = 0;
                sequence = [];
                playerSequence = [];
                simon = true;
            }, 3000);
        }else{
            playerSequence = [];
            player = true;
            StartGame();
        }
    }

});