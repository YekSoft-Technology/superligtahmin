
// Takım güç skorları (1-100 arası)
const teamStrengths = {
    'galatasaray': 92,
    'fenerbahce': 90,
    'besiktas': 85,
    'trabzonspor': 82,
    'basaksehir': 78,
    'antalyaspor': 75,
    'alanyaspor': 73,
    'konyaspor': 72,
    'sivasspor': 70,
    'kayserispor': 68,
    'adanademirspor': 65,
    'rizespor': 63,
    'gaziantepfk': 62,
    'fatihkaragumruk': 60,
    'kasimpasa': 58,
    'ankaragucu': 55,
    'istanbulspor': 52,
    'pendikspor': 50,
    'hatayspor': 48,
    'umraniyespor': 45
};

// Takım isimlerini güzelleştiren fonksiyon
function getTeamDisplayName(teamKey) {
    const teamNames = {
        'galatasaray': 'Galatasaray',
        'fenerbahce': 'Fenerbahçe',
        'besiktas': 'Beşiktaş',
        'trabzonspor': 'Trabzonspor',
        'basaksehir': 'Başakşehir',
        'antalyaspor': 'Antalyaspor',
        'alanyaspor': 'Alanyaspor',
        'konyaspor': 'Konyaspor',
        'sivasspor': 'Sivasspor',
        'kayserispor': 'Kayserispor',
        'adanademirspor': 'Adana Demirspor',
        'rizespor': 'Rizespor',
        'gaziantepfk': 'Gaziantep FK',
        'fatihkaragumruk': 'Fatih Karagümrük',
        'kasimpasa': 'Kasımpaşa',
        'ankaragucu': 'Ankaragücü',
        'istanbulspor': 'İstanbulspor',
        'pendikspor': 'Pendikspor',
        'hatayspor': 'Hatayspor',
        'umraniyespor': 'Ümraniyespor'
    };
    return teamNames[teamKey] || teamKey;
}

function predictMatch() {
    const homeTeam = document.getElementById('home-team').value;
    const awayTeam = document.getElementById('away-team').value;
    
    if (!homeTeam || !awayTeam) {
        alert('Lütfen her iki takımı da seçiniz!');
        return;
    }
    
    if (homeTeam === awayTeam) {
        alert('Aynı takımı iki kez seçemezsiniz!');
        return;
    }
    
    // Takım güçlerini al
    const homeStrength = teamStrengths[homeTeam];
    const awayStrength = teamStrengths[awayTeam];
    
    // Ev sahibi avantajı (genelde %5-10 avantaj)
    const homeAdvantage = 8;
    const adjustedHomeStrength = homeStrength + homeAdvantage;
    
    // Güç farkını hesapla
    const strengthDifference = adjustedHomeStrength - awayStrength;
    
    // Temel olasılıkları hesapla
    let homeWinProb, drawProb, awayWinProb;
    
    if (strengthDifference > 20) {
        // Ev sahibi çok güçlü
        homeWinProb = 65 + Math.random() * 15; // 65-80%
        drawProb = 15 + Math.random() * 10;    // 15-25%
        awayWinProb = 100 - homeWinProb - drawProb;
    } else if (strengthDifference > 10) {
        // Ev sahibi güçlü
        homeWinProb = 50 + Math.random() * 15; // 50-65%
        drawProb = 20 + Math.random() * 10;    // 20-30%
        awayWinProb = 100 - homeWinProb - drawProb;
    } else if (strengthDifference > -10) {
        // Dengeli maç
        homeWinProb = 35 + Math.random() * 15; // 35-50%
        drawProb = 25 + Math.random() * 15;    // 25-40%
        awayWinProb = 100 - homeWinProb - drawProb;
    } else if (strengthDifference > -20) {
        // Deplasman takımı güçlü
        awayWinProb = 45 + Math.random() * 15; // 45-60%
        drawProb = 20 + Math.random() * 10;    // 20-30%
        homeWinProb = 100 - awayWinProb - drawProb;
    } else {
        // Deplasman takımı çok güçlü
        awayWinProb = 55 + Math.random() * 20; // 55-75%
        drawProb = 15 + Math.random() * 10;    // 15-25%
        homeWinProb = 100 - awayWinProb - drawProb;
    }
    
    // Olasılıkları normalize et
    const total = homeWinProb + drawProb + awayWinProb;
    homeWinProb = (homeWinProb / total) * 100;
    drawProb = (drawProb / total) * 100;
    awayWinProb = (awayWinProb / total) * 100;
    
    // Sonuçları göster
    displayPrediction(homeTeam, awayTeam, homeWinProb, drawProb, awayWinProb);
}

function displayPrediction(homeTeam, awayTeam, homeWinProb, drawProb, awayWinProb) {
    const resultDiv = document.getElementById('prediction-result');
    
    // Takım isimlerini güncelle
    document.getElementById('home-win-team').textContent = getTeamDisplayName(homeTeam);
    document.getElementById('away-win-team').textContent = getTeamDisplayName(awayTeam);
    
    // Yüzdeleri güncelle
    document.getElementById('home-win-percent').textContent = Math.round(homeWinProb) + '%';
    document.getElementById('draw-percent').textContent = Math.round(drawProb) + '%';
    document.getElementById('away-win-percent').textContent = Math.round(awayWinProb) + '%';
    
    // Progress barları güncelle
    document.getElementById('home-win-bar').style.width = homeWinProb + '%';
    document.getElementById('draw-bar').style.width = drawProb + '%';
    document.getElementById('away-win-bar').style.width = awayWinProb + '%';
    
    // En muhtemel sonucu belirle
    let finalResult;
    if (homeWinProb > drawProb && homeWinProb > awayWinProb) {
        finalResult = `${getTeamDisplayName(homeTeam)} Galibiyeti (${Math.round(homeWinProb)}%)`;
    } else if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
        finalResult = `${getTeamDisplayName(awayTeam)} Galibiyeti (${Math.round(awayWinProb)}%)`;
    } else {
        finalResult = `Beraberlik (${Math.round(drawProb)}%)`;
    }
    
    document.getElementById('final-result').textContent = finalResult;
    
    // Sonucu göster
    resultDiv.style.display = 'block';
    
    // Sonuca kaydır
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    console.log('Süper Lig Tahmin Robotu hazır! ⚽');
});
