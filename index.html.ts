<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bingo Caller</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap');
        
        body {
            font-family: 'Nunito', sans-serif;
            text-align: center;
            background-color: #f9f6f1;
            color: #2a3d45;
            padding: 20px;
        }
        h1 {
            color: #1f4e79;
        }
        .logo {
            max-width: 200px;
            margin: 20px auto;
        }
        .last-called {
            font-size: 24px;
            font-weight: bold;
            margin: 10px;
            color: #e63946;
        }
        .bingo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .bingo-header {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            width: 350px;
            font-size: 24px;
            font-weight: bold;
            color: #1f4e79;
            margin-bottom: 10px;
        }
        .bingo-board {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            width: 350px;
            margin: auto;
        }
        .cell {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            border: 2px solid #1f4e79;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 10px;
        }
        .called {
            background-color: #e63946;
            color: white;
        }
        .free-space {
            background-color: #ffb703;
            color: white;
            pointer-events: none;
        }
        .reset-btn {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            background-color: #1f4e79;
            color: white;
            border: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <img src="CORNERSTONE-TAG-white_3.5-1.png" alt="Cornerstone PCA Logo" class="logo">
    <h1>Bingo Caller</h1>
    <div class="last-called" id="lastCalled">Last Called: -</div>
    <div class="bingo-container">
        <div class="bingo-header">
            <div>B</div>
            <div>I</div>
            <div>N</div>
            <div>G</div>
            <div>O</div>
        </div>
        <div class="bingo-board" id="bingoBoard"></div>
    </div>
    <button class="reset-btn" onclick="resetBoard()">Reset Game</button>

    <script>
        const bingoBoard = document.getElementById('bingoBoard');
        const lastCalledDisplay = document.getElementById('lastCalled');
        const columns = {
            B: Array.from({length: 15}, (_, i) => i + 1),
            I: Array.from({length: 15}, (_, i) => i + 16),
            N: Array.from({length: 15}, (_, i) => i + 31),
            G: Array.from({length: 15}, (_, i) => i + 46),
            O: Array.from({length: 15}, (_, i) => i + 61)
        };
        
        function generateBingoBoard() {
            bingoBoard.innerHTML = '';
            let selectedNumbers = { B: [], I: [], N: [], G: [], O: [] };

            for (let letter in columns) {
                let shuffled = [...columns[letter]].sort(() => 0.5 - Math.random()).slice(0, 5);
                selectedNumbers[letter] = shuffled;
            }

            let finalBoard = [];
            for (let i = 0; i < 5; i++) {
                finalBoard.push({ letter: 'B', number: selectedNumbers.B[i] });
                finalBoard.push({ letter: 'I', number: selectedNumbers.I[i] });
                finalBoard.push({ letter: 'N', number: selectedNumbers.N[i] });
                finalBoard.push({ letter: 'G', number: selectedNumbers.G[i] });
                finalBoard.push({ letter: 'O', number: selectedNumbers.O[i] });
            }

            finalBoard.forEach((item, index) => {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.innerText = item.number;
                cell.onclick = () => {
                    cell.classList.toggle('called');
                    lastCalledDisplay.innerText = `Last Called: ${item.letter}${item.number}`;
                };
                
                if (index === 12) { 
                    cell.innerText = "FREE";
                    cell.classList.add('free-space');
                }
                bingoBoard.appendChild(cell);
            });
        }

        function resetBoard() {
            generateBingoBoard();
            lastCalledDisplay.innerText = "Last Called: -";
        }

        generateBingoBoard();
    </script>
</body>
</html>
