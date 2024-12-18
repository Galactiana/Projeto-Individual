const kpiSpeedrunTime = document.getElementById("kpiSpeedrunTime");
const kpi100 = document.getElementById("kpi100");
const kpiS = document.getElementById("kpiS");

const questionErrorTbody = document.getElementById("questionErrorTbody");

const pieChart = document.getElementById("pieChart");
console.log(pieChart); // Deve exibir <canvas id="pieChart"></canvas>

let star1 = 0;
let star2 = 0;
let star3 = 0;
let star4 = 0;
let star5 = 0;

function twoDigits(question) {
    return question < 10 ? "0" + question : question;
}

function getKpisData() {
    fetch(`/score/count-score-100`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpi100.textContent = res[0].scoreCount;
                }
            });
        });

    fetch(`/score/count-speedrun-time`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpiSpeedrunTime.textContent = res[0].timeCount;
                }
            });
        });

    fetch(`/score/count-score-s`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    kpiS.textContent = res[0].scoreCount;
                }
            });
        });
}

function getRankingQuestionError() {
    fetch(`/question-error/list`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    questionErrorTbody.innerHTML = "";
                    for (let i = 0; i < Math.min(res.length, 5); i++) {
                        questionErrorTbody.innerHTML += `
                            <tr>
                            <td>${i + 1}º</td>
                            <td>Questão ${twoDigits(res[i].questionNumber)}</td>
                            <td>${res[i].questionCount}x</td>
                            </tr>
                        `;
                    }
                    
                }
            });
        });
}
let chartInstance = null; // Variável global para armazenar a instância do gráfico

function generatePieChart(star1, star2, star3, star4, star5) {
    if (chartInstance) {
        chartInstance.destroy(); // Destrói o gráfico anterior
    }

    const data = {
        labels: ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'],
        datasets: [{
            label: 'Porcentagem',
            data: [10, 20, 30, 40, 50],
            backgroundColor: ['#DA70D6', '#DA10C5', '#8B008B', '#67109C', '#7831A9'],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    };

    chartInstance = new Chart(pieChart, config); // Armazena a nova instância
}



function getFeedbackStarsCount() {
    
    fetch(`/feedback/list-by-stars`)
        .then(res => {
            res.json().then(res => {
                if (res.length > 0) {
                    let total = Number(res[0].star1) + Number(res[0].star2) + Number(res[0].star3) + Number(res[0].star4) + Number(res[0].star5);

                    let pctStar1 = ((res[0].star1 * 100) / total).toFixed(1);
                    let pctStar2 = ((res[0].star2 * 100) / total).toFixed(1);
                    let pctStar3 = ((res[0].star3 * 100) / total).toFixed(1);
                    let pctStar4 = ((res[0].star4 * 100) / total).toFixed(1);
                    let pctStar5 = ((res[0].star5 * 100) / total).toFixed(1);

                    generatePieChart(pctStar1, pctStar2, pctStar3, pctStar4, pctStar5);
                }
            });
        });
}

window.addEventListener("load", () => {
    getKpisData();
    getRankingQuestionError();
    getFeedbackStarsCount();
});

document.addEventListener("contextmenu", event => event.preventDefault());