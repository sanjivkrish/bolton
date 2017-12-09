let scoreInfo = {};

scoreInfo.getScore = function () {
    return scoreInfo.curScore;
};

scoreInfo.setScore = function (num) {
    scoreInfo.curScore = num;
    scoreInfo.setView();
};

scoreInfo.incScore = function (num) {
    scoreInfo.curScore += num;
    scoreInfo.setView();
};

scoreInfo.decScore = function (num) {
    scoreInfo.curScore -= num;
    scoreInfo.setView();
};

scoreInfo.setView = function () {
    document.getElementById('score').innerHTML = scoreInfo.curScore;
};

scoreInfo.curScore = 0;

export default function getScoreInfo() {
    return scoreInfo;
}