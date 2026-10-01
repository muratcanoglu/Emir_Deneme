# Dungeon Atlas

Minecraft Dungeons benzeri oyunlar için hazırlanmış, MapGenie tarzı etkileşimli Türkçe harita arayüzü. Zindan kapıları, gizli alanlar, kamp noktaları, eşsiz eşyalar ve sandıklar tek harita üzerinde filtrelenebilir.

## Özellikler

- Kategori bazlı konum filtreleri ve anlık arama
- Yakınlaştırma, uzaklaştırma ve haritayı merkezleme kontrolleri
- Zindan kapısı için açıklama, gerekli eşya, rota videosu alanı ve görsel galeri
- “Haritada gör” ve “keşfedildi” etkileşimleri
- Masaüstü ve mobil ekranlara uyumlu koyu, oyun temalı tasarım
- Türkçe karakterler için tam UTF-8 desteği

## Windows'ta çalıştırma

1. [Node.js LTS](https://nodejs.org/) sürümünü kurun.
2. Proje klasöründe PowerShell veya Komut İstemi açın.
3. Bağımlılıkları kurun:

   ```powershell
   npm install
   ```

4. Geliştirme sunucusunu başlatın:

   ```powershell
   npm run dev
   ```

5. Terminalde görünen yerel adresi (genellikle `http://localhost:5173`) tarayıcıda açın.

Üretime hazır çıktı almak için `npm run build` çalıştırın. Oluşan dosyalar `dist` klasörüne yazılır.

## İçerik ekleme

Harita işaretleri `index.html` içindeki `.map-marker` düğmeleridir. `data-type` filtre kategorisini, `left` ve `top` ise haritadaki konumu belirler. Gerçek ekran görüntülerinizi karttaki `.card-visual` ve `.shot` alanlarına CSS `background-image` olarak; YouTube videonuzu ise video modalına iframe olarak ekleyebilirsiniz.
