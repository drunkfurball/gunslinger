const MAX_AMMO = 6;
const NUM_OF_WINDOWS = 5;

let saloon = {

    windows: [],
    cylinder: 0,

    set_bandit: function() {
        while (saloon.windows.length < NUM_OF_WINDOWS) {
            saloon.windows.push(0);
        }
        saloon.windows[saloon.windows.indexOf(1)>0?saloon.windows.indexOf(1):0] = 0;
        saloon.windows[Math.floor(Math.random() * saloon.windows.length)] = 1;
    },

    move_bandit: function() {
        if (saloon.windows[0] == 1) {
            saloon.windows.unshift(saloon.windows.pop());
        }
        else if (saloon.windows[saloon.windows.length-1] == 1) {
            saloon.windows.push(saloon.windows.shift());
        }
        else {
            (
                Math.floor(Math.random()*2)?
                saloon.windows.unshift(saloon.windows.pop()):
                saloon.windows.push(saloon.windows.shift())
            );
        }
    },

    load_revolver: function() {
        while (saloon.cylinder < MAX_AMMO) {
            saloon.cylinder++;
        }
    },

    shoot_window: function(evt) {
        saloon.move_bandit();
        
        if (saloon.cylinder >= 1) {  
            if (saloon.windows[evt.target.attributes.id.nodeValue] != 0) {
                alert("I'm Hit! New game!");
                saloon.start();
            }
            else {
                alert("Missed! Try again!");
            }
            saloon.cylinder--;
            let ammo = document.getElementById("ammo");
            ammo.innerHTML = "[";
            for (let a = 0; a < saloon.cylinder; a++) {
                ammo.innerHTML += "&#9678;"
            }
            ammo.innerHTML += "]";
        }
        if (saloon.cylinder == 0) {
            alert("Out of Ammo! You lose. Play again.");
            saloon.start();
        }
        
    },

    start: function() {
        saloon.set_bandit();
        saloon.load_revolver();
        saloon.move_bandit();
    }

};
