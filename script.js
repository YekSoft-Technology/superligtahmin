
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
    
    // Detaylı analiz ekle
    const detailedAnalysis = generateDetailedAnalysis(homeTeam, awayTeam, homeWinProb, drawProb, awayWinProb);
    document.getElementById('detailed-analysis').innerHTML = detailedAnalysis;
    
    // Sonucu göster
    resultDiv.style.display = 'block';
    
    // Sonuca kaydır
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function generateDetailedAnalysis(homeTeam, awayTeam, homeWinProb, drawProb, awayWinProb) {
    const homeStrength = teamStrengths[homeTeam];
    const awayStrength = teamStrengths[awayTeam];
    const strengthDiff = homeStrength - awayStrength;
    
    let analysis = '<div class="analysis-section">';
    analysis += '<h4>🔍 Detaylı Maç Analizi</h4>';
    
    // Takım güçleri analizi
    analysis += '<div class="strength-analysis">';
    analysis += '<h5>⚡ Takım Güçleri</h5>';
    analysis += `<p><strong>${getTeamDisplayName(homeTeam)}:</strong> ${homeStrength}/100 puan - `;
    analysis += getStrengthDescription(homeStrength);
    analysis += `</p>`;
    analysis += `<p><strong>${getTeamDisplayName(awayTeam)}:</strong> ${awayStrength}/100 puan - `;
    analysis += getStrengthDescription(awayStrength);
    analysis += `</p>`;
    analysis += '</div>';
    
    // Ev sahibi avantajı
    analysis += '<div class="home-advantage">';
    analysis += '<h5>🏠 Ev Sahibi Avantajı</h5>';
    analysis += `<p>${getTeamDisplayName(homeTeam)} kendi sahasında oynuyor ve bu %8-10 oranında avantaj sağlıyor. `;
    analysis += 'Taraftar desteği, sahaya aşinalık ve seyahat yorgunluğu olmaması gibi faktörler ev sahibi takımın performansını artırıyor.</p>';
    analysis += '</div>';
    
    // Takım performans karşılaştırması
    analysis += '<div class="performance-comparison">';
    analysis += '<h5>📊 Performans Karşılaştırması</h5>';
    if (strengthDiff > 15) {
        analysis += `<p>${getTeamDisplayName(homeTeam)} takımı ${getTeamDisplayName(awayTeam)} takımından ${strengthDiff} puan daha güçlü. `;
        analysis += 'Bu büyük güç farkı, ev sahibi takımın kadro kalitesi, teknik direktör başarısı ve son dönem performansının çok daha iyi olduğunu gösteriyor. ';
        analysis += 'Böyle maçlarda genellikle güçlü takım kontrolü ele alır ve net fırsatlar yaratır.</p>';
    } else if (strengthDiff > 5) {
        analysis += `<p>${getTeamDisplayName(homeTeam)} takımı ${strengthDiff} puan avantajla hafif favori durumda. `;
        analysis += 'Bu durum, ev sahibi takımın son haftalardaki formu, kadro derinliği veya deneyimli oyuncu sayısının daha fazla olmasından kaynaklanıyor. ';
        analysis += 'Ancak futbolda her şey olabileceği için dikkatli bir maç bekleniyor.</p>';
    } else if (strengthDiff > -5) {
        analysis += '<p>Her iki takım da çok yakın güçte ve maç tamamen dengeli görünüyor. ';
        analysis += 'Bu tip maçlarda genellikle küçük detaylar, bireysel performanslar ve taktiksel hamler belirleyici oluyor. ';
        analysis += 'Hem ev sahibi avantajı hem de misafir takımın motivasyonu sonucu etkileyebilir.</p>';
    } else if (strengthDiff > -15) {
        analysis += `<p>${getTeamDisplayName(awayTeam)} takımı kağıt üzerinde ${Math.abs(strengthDiff)} puan daha güçlü görünüyor. `;
        analysis += 'Ancak ev sahibi avantajı bu farkı kapatabilir. Deplasman takımının üstün gelmesi için sahada dominasyonu ele alması ';
        analysis += 've erken gol bulması önemli olacak.</p>';
    } else {
        analysis += `<p>${getTeamDisplayName(awayTeam)} takımı ${Math.abs(strengthDiff)} puanlık büyük avantajla net favori. `;
        analysis += 'Bu durum, deplasman takımının lig sıralamasındaki üstünlüğü, star oyuncu sayısı ve son dönemdeki istikrarlı ';
        analysis += 'performansından kaynaklanıyor. Ev sahibi avantajına rağmen deplasman takımı galibiyete daha yakın.</p>';
    }
    analysis += '</div>';
    
    // Taktiksel analiz
    analysis += '<div class="tactical-analysis">';
    analysis += '<h5>⚽ Taktiksel Beklentiler</h5>';
    analysis += getTacticalAnalysis(homeTeam, awayTeam, homeStrength, awayStrength);
    analysis += '</div>';
    
    // Sonuç tahmini gerekçesi
    analysis += '<div class="prediction-reasoning">';
    analysis += '<h5>🎯 Neden Bu Tahmin?</h5>';
    if (homeWinProb > drawProb && homeWinProb > awayWinProb) {
        analysis += `<p><strong>${getTeamDisplayName(homeTeam)} galibiyeti %${Math.round(homeWinProb)} ihtimalle en muhtemel sonuç çünkü:</strong></p>`;
        analysis += '<ul>';
        analysis += '<li>Ev sahibi avantajı önemli bir faktör</li>';
        if (strengthDiff > 0) analysis += '<li>Takım gücü açısından üstünlük var</li>';
        analysis += '<li>Kendi taraftarı önünde oynama motivasyonu</li>';
        analysis += '<li>Sahaya ve çim koşullarına aşinalık</li>';
        analysis += '<li>Seyahat yorgunluğu yaşamıyor</li>';
        analysis += '</ul>';
    } else if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
        analysis += `<p><strong>${getTeamDisplayName(awayTeam)} galibiyeti %${Math.round(awayWinProb)} ihtimalle en muhtemel sonuç çünkü:</strong></p>`;
        analysis += '<ul>';
        analysis += '<li>Takım kalitesi ev sahibi avantajını aşıyor</li>';
        analysis += '<li>Son dönem formu çok iyi</li>';
        analysis += '<li>Deplasmanda başarılı bir takım</li>';
        if (Math.abs(strengthDiff) > 10) analysis += '<li>Kadro derinliği ve star oyuncu sayısı fazla</li>';
        analysis += '<li>Taktiksel disiplin ve organizasyon üstün</li>';
        analysis += '</ul>';
    } else {
        analysis += `<p><strong>Beraberlik %${Math.round(drawProb)} ihtimalle en muhtemel sonuç çünkü:</strong></p>`;
        analysis += '<ul>';
        analysis += '<li>Takımlar çok yakın güçte</li>';
        analysis += '<li>Her iki takım da dikkatli oynayabilir</li>';
        analysis += '<li>Puan kaybetme korkusu baskın gelebilir</li>';
        analysis += '<li>Taktiksel mücadele ön planda olacak</li>';
        analysis += '<li>Küçük hatalar sonucu belirleyecek</li>';
        analysis += '</ul>';
    }
    analysis += '</div>';
    
    // Dikkat edilmesi gereken faktörler
    analysis += '<div class="key-factors">';
    analysis += '<h5>⚠️ Dikkat Edilmesi Gereken Faktörler</h5>';
    analysis += '<ul>';
    analysis += '<li><strong>Sakatlık Durumu:</strong> Anahtar oyuncuların sakatlık durumu maç öncesi değişebilir</li>';
    analysis += '<li><strong>Hava Koşulları:</strong> Yağmur, kar gibi hava koşulları oyunu etkileyebilir</li>';
    analysis += '<li><strong>Hakem Faktörü:</strong> Kritik kararlar maçın seyrini değiştirebilir</li>';
    analysis += '<li><strong>Psikolojik Durum:</strong> Takımların moral durumu ve son maç sonuçları etkili</li>';
    analysis += '<li><strong>Taktiksel Değişiklikler:</strong> Teknik direktörlerin maç anı kararları belirleyici olabilir</li>';
    analysis += '</ul>';
    analysis += '</div>';
    
    analysis += '</div>';
    return analysis;
}

function getStrengthDescription(strength) {
    if (strength >= 90) return 'Şampiyonluk adayı, çok güçlü kadro';
    if (strength >= 80) return 'Üst sıra takımı, kaliteli oyuncu kadrosu';
    if (strength >= 70) return 'Orta üst seviye, istikrarlı performans';
    if (strength >= 60) return 'Orta seviye, mücadeleci takım';
    if (strength >= 50) return 'Alt orta seviye, küme mücadelesi veren';
    return 'Küme düşme potansiyeli olan takım';
}

function getTacticalAnalysis(homeTeam, awayTeam, homeStrength, awayStrength) {
    let tactical = '<p>';
    
    // Güçlü takım taktikleri
    if (homeStrength > awayStrength + 10) {
        tactical += `${getTeamDisplayName(homeTeam)} muhtemelen topa sahip olmaya odaklanacak ve yüksek tempolu bir oyun sergilerken, `;
        tactical += `${getTeamDisplayName(awayTeam)} savunma odaklı oynayıp kontra atak fırsatlarını değerlendirmeye çalışacak. `;
        tactical += 'Ev sahibi takım erken gol bulursa maçı kontrol altında tutabilir.';
    } else if (awayStrength > homeStrength + 10) {
        tactical += `${getTeamDisplayName(awayTeam)} deplasmanda baskın oyun kurmaya çalışırken inisiyatifi ele alacak. `;
        tactical += `${getTeamDisplayName(homeTeam)} ise compact bir savunma yapısıyla oyuna başlayıp set piece ve `;
        tactical += 'hızlı çıkışlardan yararlanmaya odaklanacak.';
    } else {
        tactical += 'Her iki takım da dengeli bir yaklaşım sergileyecek. Orta sahada mücadele yoğun geçecek ve ';
        tactical += 'takımlar birbirlerinin zayıflıklarını bulma arayışında olacak. Maçın ilk yarısı genelde temkinli geçer, ';
        tactical += 'ikinci yarıda risk alma isteği artabilir.';
    }
    
    tactical += '</p>';
    return tactical;
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    console.log('Süper Lig Tahmin Robotu hazır! ⚽');
});
