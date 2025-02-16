    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }); 

    document.addEventListener("DOMContentLoaded", function() {
        const canvas = document.getElementById("matrix");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇ!@#$%^&*()".split("");
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(0);
        
        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff00";
            ctx.font = fontSize + "px monospace";
            
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 33);
        
        // Ensure matrix is background by moving it behind all elements
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-2";
        document.body.appendChild(canvas);

        // Intro Animation Logic
        const introScreen = document.getElementById("intro-screen");
        const hackerText = document.querySelector(".hacker-text");
        const accessText = document.querySelector(".access-text");
        const name = "Dvir Hamu ";
        let nameIndex = 0;
        let randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇ!@#$%^&*()";
        let finalName = "";

        function randomizeLetters() {
            if (nameIndex < name.length) {
                finalName = name.substring(0, nameIndex);
                let randomChar = randomLetters[Math.floor(Math.random() * randomLetters.length)];
                hackerText.textContent = finalName + randomChar;
                setTimeout(randomizeLetters, 100);
            } else {
                hackerText.textContent = finalName;
                revealAccess();
            }
            nameIndex++;
        }

        function revealAccess() {
            setTimeout(() => {
                accessText.style.opacity = "1";
                hackerText.style.opacity = "1";
                setTimeout(() => {
                    accessText.style.transition = "opacity 1s ease-in-out";
                    hackerText.style.transition = "opacity 1s ease-in-out";
                    introScreen.style.transition = "opacity 1s ease-in-out";
                    canvas.style.transition = "opacity 1s ease-in-out";
                    
                    accessText.style.opacity = "0";
                    hackerText.style.opacity = "0";
                    introScreen.style.opacity = "0";
                    canvas.style.opacity = "0";
                    
                    setTimeout(() => {
                        introScreen.style.display = "none";
                        canvas.style.display = "none";
                        document.getElementById("main-content").style.display = "block";
                    }, 1000);
                }, 1000);
            }, 250);
        }
        

        setTimeout(randomizeLetters, 1000);
    });