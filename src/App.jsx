import { useState, useCallback } from "react";
import './App.css'

// ══════════════════════════════════════════════════════
// MATERI BELAJAR — 14 Topik Kisi-Kisi Resmi PHTC 2026
// ══════════════════════════════════════════════════════
const materiData = [
  {
    id: 1, topik: "Landasan Hukum", icon: "⚖️",
    ringkasan: "Dasar konstitusional, idiil, dan operasional koperasi di Indonesia.",
    poin: [
      { judul: "Landasan Idiil", isi: "Pancasila — nilai dasar yang menjiwai seluruh kegiatan koperasi Indonesia." },
      { judul: "Landasan Konstitusional", isi: "UUD 1945 Pasal 33 ayat (1): 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan.' Inilah dasar konstitusional koperasi." },
      { judul: "Landasan Operasional", isi: "UU No. 25 Tahun 1992 tentang Perkoperasian — mengatur prinsip, struktur, hak, kewajiban, dan pengelolaan koperasi. (Catatan: UU No. 17 Tahun 2012 pernah ada namun dibatalkan MK.)" },
      { judul: "Definisi Koperasi (UU 25/1992)", isi: "Badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi, melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasar atas asas kekeluargaan." },
      { judul: "AD/ART", isi: "Anggaran Dasar dan Anggaran Rumah Tangga adalah dokumen hukum internal yang mengatur tata kelola, hak, kewajiban, dan mekanisme operasional koperasi. Wajib dimiliki setiap koperasi." },
    ]
  },
  {
    id: 2, topik: "Regulasi KDKMP", icon: "📜",
    ringkasan: "Peraturan khusus yang mengatur pembentukan dan pengelolaan Koperasi Desa/Kelurahan Merah Putih.",
    poin: [
      { judul: "Inpres No. 9 Tahun 2025", isi: "Instruksi Presiden tentang Percepatan Pembentukan Koperasi Desa/Kelurahan Merah Putih — dasar hukum utama program KDKMP sebagai program prioritas Presiden." },
      { judul: "Inpres No. 17 Tahun 2025", isi: "Mengatur Percepatan Pembangunan Fisik Gerai dan Pergudangan KDKMP sebagai infrastruktur pendukung operasional koperasi desa." },
      { judul: "BUMN Induk: PT Agrinas Pangan Nusantara", isi: "KDKMP berada di bawah naungan PT Agrinas Pangan Nusantara sebagai induk BUMN yang bertanggung jawab atas pengelolaan SDM koperasi." },
      { judul: "Skema Kontrak SDM", isi: "Peserta yang lolos seleksi PHTC diikat dengan PKWT (Perjanjian Kerja Waktu Tertentu) selama 2 tahun di bawah PT Agrinas Pangan Nusantara." },
      { judul: "KDKMP vs BUMDes", isi: "KDKMP adalah badan usaha berbasis koperasi yang dimiliki dan dikelola anggota (asas kekeluargaan). BUMDes adalah badan usaha milik pemerintah desa. Berbeda secara hukum dan struktur kepemilikan." },
      { judul: "Penamaan Resmi", isi: "Format: 'Koperasi' + 'Desa/Kelurahan Merah Putih' + nama desa/kelurahan. Contoh: Koperasi Desa Merah Putih Sukamaju." },
    ]
  },
  {
    id: 3, topik: "Prinsip Koperasi", icon: "🤝",
    ringkasan: "7 Prinsip Koperasi Internasional (ICA) yang menjadi fondasi berjalannya koperasi.",
    poin: [
      { judul: "1. Keanggotaan Sukarela & Terbuka", isi: "Koperasi terbuka bagi semua orang tanpa diskriminasi gender, sosial, ras, atau politik. Anggota bebas masuk dan keluar sesuai ketentuan AD/ART." },
      { judul: "2. Pengendalian Demokratis oleh Anggota", isi: "Satu anggota satu suara (one member one vote). Keputusan strategis diambil secara demokratis dalam Rapat Anggota, terlepas dari besar modal yang disetor." },
      { judul: "3. Partisipasi Ekonomi Anggota", isi: "SHU dibagikan berdasarkan partisipasi/jasa usaha anggota (transaksi), bukan berdasarkan besarnya modal. Ini membedakan koperasi dari perusahaan biasa." },
      { judul: "4. Otonomi & Kemandirian", isi: "Koperasi adalah organisasi otonom yang dikendalikan oleh anggotanya. Jika bermitra dengan pihak luar, tetap menjaga kendali demokratis anggota." },
      { judul: "5. Pendidikan, Pelatihan & Informasi", isi: "Koperasi wajib menyelenggarakan pendidikan dan pelatihan bagi anggota, pengurus, dan karyawan. Sebagian SHU dialokasikan sebagai Dana Pendidikan." },
      { judul: "6. Kerja Sama Antar Koperasi", isi: "Koperasi memperkuat gerakan koperasi dengan bekerja sama antar koperasi, baik lokal, nasional, maupun internasional." },
      { judul: "7. Kepedulian terhadap Komunitas", isi: "Koperasi bekerja untuk pembangunan berkelanjutan masyarakat sekitar melalui kebijakan yang disetujui anggota, misal menyisihkan SHU untuk fasilitas umum desa." },
      { judul: "Tujuan Koperasi (UU 25/1992 Pasal 3)", isi: "Memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya, serta ikut membangun tatanan perekonomian nasional dalam rangka mewujudkan masyarakat yang maju, adil, dan makmur." },
    ]
  },
  {
    id: 4, topik: "Struktur Organisasi", icon: "🏛️",
    ringkasan: "Hierarki dan fungsi organ-organ dalam koperasi berdasarkan UU No. 25 Tahun 1992.",
    poin: [
      { judul: "Rapat Anggota — Pemegang Kekuasaan Tertinggi", isi: "Menetapkan kebijakan umum, mengesahkan RKAT dan laporan pertanggungjawaban, memilih/memberhentikan pengurus dan pengawas, serta memutuskan hal-hal strategis." },
      { judul: "Pengurus — Pelaksana Kebijakan", isi: "Mengelola organisasi dan usaha koperasi. Mewakili koperasi dalam dan luar pengadilan. Mengangkat/memberhentikan manajer. Masa jabatan maks. 5 tahun." },
      { judul: "Pengawas — Pengendali Internal", isi: "Mengawasi pelaksanaan kebijakan dan pengelolaan koperasi oleh pengurus. Melakukan audit pembukuan. Melaporkan hasil pengawasan kepada Rapat Anggota." },
      { judul: "Manajer — Pelaksana Operasional", isi: "Bertanggung jawab kepada Pengurus. Mengelola kegiatan harian koperasi. Memimpin tim operasional unit usaha. Wajib bertindak dalam batas kewenangan yang diberikan Pengurus." },
      { judul: "RAT (Rapat Anggota Tahunan)", isi: "Diselenggarakan minimal 1x setahun. Agenda: laporan pertanggungjawaban pengurus, pengesahan laporan keuangan, penetapan RKAT, dan pembagian SHU." },
      { judul: "RKAT (Rencana Kerja & Anggaran Tahunan)", isi: "Dokumen perencanaan strategis tahunan yang harus disusun pengurus dan disahkan Rapat Anggota sebelum dijalankan." },
    ]
  },
  {
    id: 5, topik: "Permodalan", icon: "💰",
    ringkasan: "Sumber-sumber modal koperasi dan fungsinya dalam operasional.",
    poin: [
      { judul: "Simpanan Pokok", isi: "Dibayar SATU KALI saat pertama masuk menjadi anggota. Besarnya sama untuk semua anggota. TIDAK dapat diambil selama masih menjadi anggota. Termasuk modal sendiri." },
      { judul: "Simpanan Wajib", isi: "Dibayar RUTIN setiap periode (bulanan/triwulan) sesuai AD/ART. Jumlahnya sama untuk semua anggota. Termasuk modal sendiri." },
      { judul: "Simpanan Sukarela", isi: "Besaran BEBAS ditentukan anggota. Dapat diambil SEWAKTU-WAKTU sesuai ketentuan. Bersifat fleksibel. Berfungsi seperti tabungan di koperasi." },
      { judul: "Dana Cadangan", isi: "Disisihkan dari SHU. Fungsi: memperkuat posisi keuangan dan menghadapi risiko/kerugian. TIDAK dibagikan kepada anggota. Besaran ditetapkan dalam AD/ART." },
      { judul: "Modal Pinjaman (Modal Luar)", isi: "Berasal dari bank, lembaga keuangan, atau obligasi. Harus diperhitungkan risikonya. Gunakan modal internal dulu sebelum mencari modal eksternal." },
      { judul: "Urutan Sumber Modal yang Tepat", isi: "1) Dana Cadangan → 2) Penambahan Simpanan Wajib → 3) Pinjaman bank/lembaga keuangan. Prinsip kemandirian koperasi mengutamakan modal internal." },
    ]
  },
  {
    id: 6, topik: "SHU", icon: "📈",
    ringkasan: "Sisa Hasil Usaha: cara menghitung, mengalokasikan, dan membaginya secara adil.",
    poin: [
      { judul: "Definisi SHU", isi: "SHU = Pendapatan − Biaya Operasional. Adalah keuntungan bersih koperasi dalam satu tahun buku. Berbeda dengan 'laba' perusahaan — SHU harus dibagi secara adil kepada anggota." },
      { judul: "Rumus SHU", isi: "SHU = Total Pendapatan − Total Biaya. Contoh: Pendapatan Rp600 juta − Biaya Rp380 juta = SHU Rp220 juta." },
      { judul: "Alokasi SHU (Komponen Pembagian)", isi: "• Dana Cadangan (min. 25%)\n• Jasa Usaha → dibagi berdasarkan TRANSAKSI anggota\n• Jasa Modal → dibagi berdasarkan SIMPANAN anggota\n• Dana Pendidikan\n• Dana Sosial\n• Dana Pengurus/Karyawan" },
      { judul: "Prinsip Pembagian SHU", isi: "Adil berdasarkan PARTISIPASI (jasa usaha/transaksi). Anggota yang lebih aktif bertransaksi mendapat lebih banyak SHU. Bukan berdasarkan modal, jabatan, atau lama keanggotaan." },
      { judul: "Jasa Usaha vs Jasa Modal", isi: "Jasa Usaha = bagian SHU berdasarkan volume transaksi anggota di koperasi. Jasa Modal = bagian SHU berdasarkan besarnya simpanan anggota. Keduanya adalah hak anggota." },
      { judul: "Contoh Perhitungan Proporsional", isi: "Anggota A transaksi Rp12 juta, Anggota B Rp4 juta. SHU untuk jasa usaha: A mendapat 3x lebih banyak dari B karena transaksinya 3x lebih besar (12÷4=3)." },
    ]
  },
  {
    id: 7, topik: "Laporan Keuangan", icon: "📊",
    ringkasan: "Memahami laporan keuangan sederhana koperasi untuk pengambilan keputusan manajerial.",
    poin: [
      { judul: "Neraca (Laporan Posisi Keuangan)", isi: "Menggambarkan kondisi finansial pada titik waktu tertentu. Terdiri dari: ASET (harta) = KEWAJIBAN (hutang) + MODAL (ekuitas). Rumus: Modal = Aset − Kewajiban." },
      { judul: "Aset Lancar vs Aset Tetap", isi: "Aset Lancar: bisa dicairkan <1 tahun — kas, piutang anggota, persediaan barang. Aset Tetap: jangka panjang — tanah, bangunan, kendaraan, mesin/peralatan." },
      { judul: "Laporan SHU (Laporan Laba Rugi)", isi: "Menunjukkan pendapatan, biaya, dan SHU dalam satu periode. Dasar untuk pembagian SHU kepada anggota setelah disetujui RAT." },
      { judul: "Laporan Arus Kas", isi: "Menunjukkan aliran uang masuk dan keluar dari aktivitas: Operasional (kegiatan usaha), Investasi (beli/jual aset), Pendanaan (pinjaman/pelunasan)." },
      { judul: "Contoh Soal Neraca", isi: "Aset total Rp800 juta, Kewajiban Rp300 juta → Modal = Rp800 juta − Rp300 juta = Rp500 juta." },
      { judul: "Kewajiban Pelaporan", isi: "Laporan keuangan tahunan WAJIB disampaikan kepada seluruh anggota dalam RAT. Transparansi laporan keuangan adalah fondasi kepercayaan anggota." },
      { judul: "Tanda Koperasi Tidak Sehat", isi: "Kredit macet (NPL) >5%, kas negatif, kewajiban >aset, SHU terus menurun, Dana Cadangan tidak ada. Ini sinyal manajer harus segera bertindak." },
    ]
  },
  {
    id: 8, topik: "Fungsi Manajemen", icon: "⚙️",
    ringkasan: "4 Fungsi Manajemen POAC yang wajib dikuasai setiap manajer KDKMP.",
    poin: [
      { judul: "P — Planning (Perencanaan)", isi: "Menetapkan tujuan, target, strategi, dan anggaran. Menyusun RKAT. Contoh: menetapkan target penjualan Rp200 juta/bulan untuk unit sembako." },
      { judul: "O — Organizing (Pengorganisasian)", isi: "Membagi tugas, menetapkan struktur tim, dan mendistribusikan tanggung jawab. Contoh: 2 orang keuangan, 3 gudang, 2 pelayanan pelanggan." },
      { judul: "A — Actuating (Penggerakan)", isi: "Memotivasi, mengarahkan, dan menggerakkan tim. Memberi penghargaan, coaching, dan arahan harian. Memastikan semua berjalan sesuai rencana." },
      { judul: "C — Controlling (Pengendalian)", isi: "Mengukur realisasi vs target, menganalisis penyimpangan, dan melakukan koreksi. Contoh: realisasi penjualan hanya 60% target → analisis penyebab → koreksi." },
      { judul: "Urutan POAC", isi: "Planning → Organizing → Actuating → Controlling. Siklus ini berulang terus-menerus untuk perbaikan berkelanjutan (continuous improvement)." },
      { judul: "Tips Identifikasi Soal", isi: "• Planning = menyusun/menetapkan target/anggaran\n• Organizing = membagi tugas/struktur\n• Actuating = menggerakkan/memotivasi tim\n• Controlling = mengawasi/mengevaluasi/koreksi" },
    ]
  },
  {
    id: 9, topik: "Kepemimpinan & Tim", icon: "👥",
    ringkasan: "Gaya kepemimpinan efektif dan pengelolaan tim dalam konteks koperasi desa.",
    poin: [
      { judul: "Task-Based vs Hour-Based", isi: "Task-based (berbasis hasil/target) lebih efektif dari hour-based (berbasis jam hadir). Tetapkan target kerja yang jelas dan terukur untuk setiap anggota tim." },
      { judul: "Gaya Kepemimpinan Situasional", isi: "• Tim baru/tidak berpengalaman → Direktif (instruksi jelas + awasi ketat)\n• Tim berkembang → Coaching (bimbing + beri ruang)\n• Tim kompeten → Delegatif (percayakan + pantau hasil)" },
      { judul: "Servant Leadership", isi: "Kepemimpinan melayani — sangat relevan untuk koperasi. Manajer mengutamakan kepentingan anggota dan tim di atas kepentingan pribadi. Memberdayakan, bukan mendominasi." },
      { judul: "Manajemen Konflik", isi: "Fasilitasi mediasi dan komunikasi terbuka. Cari solusi win-win. Jangan memihak atau mengabaikan. Selesaikan di level tim sebelum dibawa ke pengurus." },
      { judul: "Change Management", isi: "Saat menerapkan perubahan (digitalisasi, SOP baru): libatkan tim dalam perencanaan, sosialisasi manfaat, pelatihan bertahap, dampingi adaptasi. Jangan memaksakan tanpa diskusi." },
      { judul: "Pengembangan Kompetensi Tim", isi: "Ketika kinerja turun karena kurang pengetahuan/skill → pelatihan + pendampingan adalah solusi, bukan langsung mengganti personel. Investasi SDM lebih efektif jangka panjang." },
    ]
  },
  {
    id: 10, topik: "Model Bisnis", icon: "🏗️",
    ringkasan: "Strategi pengembangan unit usaha KDKMP yang berkelanjutan dan memberdayakan anggota.",
    poin: [
      { judul: "Urutan Membuka Unit Usaha Baru", isi: "1) Analisis kebutuhan anggota → 2) Riset pasar → 3) Studi kelayakan bisnis → 4) Ajukan ke Rapat Anggota → 5) Susun RKAT → 6) Eksekusi." },
      { judul: "Rantai Pasok Ideal Sembako", isi: "Petani/produsen lokal → Koperasi (gudang) → Anggota/konsumen. Memotong tengkulak = petani lebih sejahtera + harga konsumen lebih murah." },
      { judul: "Cold Storage", isi: "Strategi: simpan panen anggota saat panen raya (harga murah) → jual saat harga pasar tinggi. Petani tidak terpaksa jual murah ke tengkulak. Meningkatkan posisi tawar." },
      { judul: "Unit Simpan Pinjam", isi: "Kredit macet (NPL) tinggi → restrukturisasi kredit yang ada + perketat analisis pinjaman baru. Jangan hentikan seluruh kredit, analisis dulu akar masalahnya." },
      { judul: "Unit Apotek", isi: "WAJIB: tenaga apoteker berlisensi (SIPA) + izin operasional dari dinas kesehatan. Tanpa keduanya, apotek tidak legal beroperasi." },
      { judul: "Digitalisasi Prioritas", isi: "Prioritas utama: pencatatan transaksi dan simpanan digital (real-time, transparan, mengurangi kesalahan manual). Bukan website mewah atau media sosial dulu." },
      { judul: "Unit Usaha Nelayan", isi: "Strategi terbaik: unit pengolahan + pemasaran langsung ke konsumen/pasar. Meningkatkan nilai tambah, memangkas tengkulak, meningkatkan pendapatan nelayan." },
    ]
  },
  {
    id: 11, topik: "Pelayanan Anggota", icon: "🌟",
    ringkasan: "Standar pelayanan prima dan penguatan kelembagaan koperasi berbasis kepercayaan anggota.",
    poin: [
      { judul: "Standar Pelayanan Prima", isi: "Cepat, ramah, transparan, adil, dan non-diskriminatif. Semua anggota dilayani setara tanpa melihat besar simpanan, koneksi, atau jabatan." },
      { judul: "Strategi Meningkatkan Partisipasi Anggota", isi: "• Edukasi manfaat nyata koperasi\n• Libatkan anggota dalam pengambilan keputusan\n• Berikan insentif partisipasi (SHU lebih besar bagi yang aktif)\n• Buat program yang menjawab kebutuhan nyata" },
      { judul: "Orientasi Anggota Baru", isi: "Anggota baru wajib mendapat orientasi dan pendampingan tentang layanan, hak, dan kewajiban mereka. Anggota yang teredukasi = anggota yang lebih aktif dan loyal." },
      { judul: "Penanganan Keluhan", isi: "Keluhan = umpan balik berharga. Analisis bottleneck proses → cari penyederhanaan → tetap jaga prinsip kehati-hatian. Jangan abaikan atau menyalahkan anggota." },
      { judul: "Indikator Koperasi Sehat (Pelayanan)", isi: "Tingginya kepuasan anggota, partisipasi aktif dalam RAT, volume transaksi anggota meningkat, angka keluar-masuk anggota rendah (retensi tinggi)." },
      { judul: "Penguatan Kelembagaan", isi: "Fondasi: transparansi laporan keuangan + akuntabilitas pengurus + peningkatan kualitas layanan berkelanjutan. Bukan dari besarnya kantor atau banyaknya unit usaha." },
    ]
  },
  {
    id: 12, topik: "Pengawasan Internal", icon: "🔍",
    ringkasan: "Sistem pengendalian internal untuk mencegah penyimpangan dan menjaga kesehatan koperasi.",
    poin: [
      { judul: "Tujuan Pengawasan Internal", isi: "Memastikan kepatuhan terhadap aturan, mendeteksi dan mencegah penyimpangan sejak dini, serta meningkatkan efisiensi operasional koperasi." },
      { judul: "3 Pilar Internal Control", isi: "1) Segregation of Duties — yang mencatat berbeda dari yang memegang uang\n2) Stock Opname berkala — cek fisik vs catatan\n3) Rekonsiliasi kas harian — cocokkan uang fisik dengan pembukuan" },
      { judul: "Prosedur Temuan Penyimpangan", isi: "Investigasi menyeluruh → dokumentasikan bukti → laporkan ke Pengurus DAN Pengawas. Jangan diselesaikan diam-diam. Transparansi adalah kewajiban." },
      { judul: "Siapa Pengawas Koperasi?", isi: "Organ khusus yang dipilih Rapat Anggota. Bertugas audit pembukuan dan pelaksanaan kebijakan pengurus. Melaporkan hasil pengawasan di RAT. Berbeda dari manajer." },
      { judul: "Indikator Koperasi Tidak Sehat", isi: "• Kredit macet (NPL) >5%\n• Kas negatif atau sering defisit\n• Kewajiban melebihi aset\n• Tidak ada Dana Cadangan\n• RAT tidak pernah diselenggarakan" },
      { judul: "Pengawasan Eksternal", isi: "Laporan berkala ke pemerintah desa + audit independen pihak ketiga + musyawarah desa untuk evaluasi. Melengkapi pengawasan internal oleh Pengawas Koperasi." },
    ]
  },
  {
    id: 13, topik: "Tanggung Jawab Hukum", icon: "🔏",
    ringkasan: "Aspek hukum dalam pengelolaan koperasi: tanggung jawab, sanksi, dan penyelesaian sengketa.",
    poin: [
      { judul: "Tanggung Jawab Anggota (Terbatas)", isi: "Dalam koperasi tanggung jawab terbatas, anggota hanya bertanggung jawab sebatas simpanan pokok + simpanan wajib yang telah disetor. Tidak sampai ke harta pribadi." },
      { judul: "Tanggung Jawab Pengurus", isi: "Pengurus bertanggung jawab penuh atas pengelolaan koperasi. Penyelewengan dana oleh pengurus = tanggung jawab hukum pribadi dan dapat dipidana." },
      { judul: "Batas Kewenangan Manajer", isi: "Manajer hanya berwenang sesuai yang ditetapkan Pengurus dan AD/ART. Tindakan melebihi kewenangan (ultra vires) dapat dibatalkan secara hukum." },
      { judul: "Penyelesaian Sengketa", isi: "Urutan: 1) Musyawarah mufakat dalam Rapat Anggota → 2) Mediasi → 3) Arbitrase → 4) Pengadilan. Selalu utamakan musyawarah dahulu." },
      { judul: "Sanksi Tidak Aktif", isi: "Koperasi yang tidak menyelenggarakan RAT ≥2 tahun berturut-turut dapat dibekukan atau dibubarkan oleh pejabat berwenang berdasarkan UU No. 25/1992." },
      { judul: "Kerja Sama Pihak Ketiga", isi: "Kerja sama signifikan dengan pihak luar harus melalui keputusan Rapat Anggota dan didokumentasikan dalam perjanjian kerja sama yang sah secara hukum." },
    ]
  },
  {
    id: 14, topik: "Strategi Ekonomi Desa", icon: "🌾",
    ringkasan: "Peran KDKMP dalam memperkuat ekonomi desa dan meningkatkan kesejahteraan anggota.",
    poin: [
      { judul: "Misi Utama Unit Usaha Sembako", isi: "Menjamin ketersediaan dan stabilitas harga kebutuhan pokok, memotong rantai distribusi panjang, dan memberdayakan ekonomi masyarakat desa. Bukan semata mencari laba." },
      { judul: "Memutus Rantai Tengkulak", isi: "Strategi: beli hasil bumi petani dengan harga wajar → simpan di cold storage → jual saat harga tinggi. Petani lebih sejahtera, konsumen harga lebih stabil." },
      { judul: "Indikator Keberhasilan KDKMP", isi: "• Peningkatan pendapatan anggota nyata\n• Perputaran ekonomi lokal meningkat\n• Tingginya partisipasi aktif anggota\n• Anggota tidak lagi bergantung pada tengkulak" },
      { judul: "Ketahanan Pangan Desa", isi: "Ekosistem yang kuat: petani lokal → koperasi (cold storage + pengolahan) → konsumen. Bukan ketergantungan pada subsidi. Bukan menimbun barang." },
      { judul: "Hal yang BERTENTANGAN dengan Prinsip Koperasi", isi: "Memonopoli harga untuk keuntungan sendiri, mendiskriminasi anggota, keputusan tanpa RAT, pembagian SHU hanya ke pengurus, menutup keanggotaan tanpa alasan." },
      { judul: "Nilai Tambah Produk Lokal", isi: "Pengolahan (ikan → produk olahan, padi → beras premium) + pemasaran langsung = meningkatkan nilai jual produk anggota. Ini memaksimalkan manfaat koperasi bagi anggota." },
    ]
  },
];

// ══════════════════════════════════════════════
// BANK SOAL — 84 Soal (6 per topik)
// ══════════════════════════════════════════════
const bankSoal = [
  // 1. LANDASAN HUKUM
  { id:1, topik:"Landasan Hukum", soal:"Landasan konstitusional berdirinya koperasi di Indonesia adalah...", opsi:["A. UU No. 25 Tahun 1992","B. UUD 1945 Pasal 33 ayat (1)","C. Pancasila sila ke-5","D. Inpres No. 9 Tahun 2025"], jawaban:"B", pembahasan:"UUD 1945 Pasal 33 ayat (1): 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan.' Ini adalah landasan KONSTITUSIONAL koperasi. Pancasila adalah landasan idiil." },
  { id:2, topik:"Landasan Hukum", soal:"Undang-Undang Perkoperasian yang berlaku di Indonesia saat ini adalah...", opsi:["A. UU No. 17 Tahun 2012","B. UU No. 13 Tahun 2003","C. UU No. 25 Tahun 1992","D. UU No. 20 Tahun 2008"], jawaban:"C", pembahasan:"UU No. 25 Tahun 1992 adalah landasan hukum operasional koperasi. UU No. 17 Tahun 2012 pernah ada namun dibatalkan oleh Mahkamah Konstitusi." },
  { id:3, topik:"Landasan Hukum", soal:"Landasan idiil koperasi Indonesia adalah...", opsi:["A. UUD 1945","B. UU No. 25 Tahun 1992","C. Pancasila","D. Inpres No. 9 Tahun 2025"], jawaban:"C", pembahasan:"Pancasila adalah landasan idiil (nilai dasar) koperasi. UUD 1945 adalah landasan konstitusional, dan UU No. 25/1992 adalah landasan operasional." },
  { id:4, topik:"Landasan Hukum", soal:"Pasal berapa dalam UUD 1945 yang menyebutkan perekonomian berdasar asas kekeluargaan?", opsi:["A. Pasal 27 ayat (2)","B. Pasal 33 ayat (1)","C. Pasal 34 ayat (1)","D. Pasal 28 ayat (1)"], jawaban:"B", pembahasan:"Pasal 33 ayat (1) UUD 1945 berbunyi 'Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan.' Inilah fondasi konstitusional koperasi Indonesia." },
  { id:5, topik:"Landasan Hukum", soal:"Berdasarkan UU No. 25 Tahun 1992, koperasi didefinisikan sebagai...", opsi:["A. Perusahaan milik pemerintah yang bertujuan mencari laba","B. Badan usaha beranggotakan orang/badan hukum koperasi yang melandaskan kegiatan berdasarkan prinsip koperasi sebagai gerakan ekonomi rakyat","C. Lembaga sosial non-profit milik desa","D. Badan usaha swasta yang beroperasi di perdesaan"], jawaban:"B", pembahasan:"Definisi lengkap koperasi menurut UU 25/1992 menekankan: badan usaha, beranggotakan orang/badan hukum koperasi, berprinsip koperasi, gerakan ekonomi rakyat, asas kekeluargaan." },
  { id:6, topik:"Landasan Hukum", soal:"Dokumen hukum yang menjadi dasar tata kelola internal koperasi disebut...", opsi:["A. RKAT","B. Laporan RAT","C. Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART)","D. Surat Keputusan Kepala Desa"], jawaban:"C", pembahasan:"AD/ART adalah dokumen hukum utama yang mengatur tata kelola, hak, kewajiban, dan mekanisme operasional koperasi. Wajib dimiliki dan disahkan Rapat Anggota." },
  // 2. REGULASI KDKMP
  { id:7, topik:"Regulasi KDKMP", soal:"BUMN yang menaungi Koperasi Desa/Kelurahan Merah Putih (KDKMP) adalah...", opsi:["A. PT Agrinas Jaladri Nusantara","B. PT Perusahaan Listrik Negara","C. PT Agrinas Pangan Nusantara","D. PT Bank Rakyat Indonesia"], jawaban:"C", pembahasan:"Berdasarkan pedoman PHTC 2026, KDKMP berada di bawah naungan PT Agrinas Pangan Nusantara sebagai induk BUMN yang bertanggung jawab atas pengelolaan SDM koperasi desa." },
  { id:8, topik:"Regulasi KDKMP", soal:"Instruksi Presiden yang menjadi dasar hukum percepatan pembentukan KDKMP adalah...", opsi:["A. Inpres No. 14 Tahun 2025","B. Inpres No. 9 Tahun 2025","C. Inpres No. 17 Tahun 2025","D. Inpres No. 7 Tahun 2025"], jawaban:"B", pembahasan:"Inpres No. 9 Tahun 2025 tentang Percepatan Pembentukan Koperasi Desa/Kelurahan Merah Putih adalah dasar hukum utama dan program prioritas Presiden." },
  { id:9, topik:"Regulasi KDKMP", soal:"Inpres No. 17 Tahun 2025 mengatur tentang...", opsi:["A. Percepatan pembentukan Koperasi Desa Merah Putih","B. Percepatan Pembangunan Fisik Gerai dan Pergudangan KDKMP","C. Swasembada pangan nasional","D. Rekrutmen manajer koperasi"], jawaban:"B", pembahasan:"Inpres No. 17 Tahun 2025 mengatur percepatan pembangunan fisik gerai dan pergudangan KDKMP sebagai infrastruktur pendukung operasional koperasi desa." },
  { id:10, topik:"Regulasi KDKMP", soal:"SDM yang lolos seleksi PHTC akan diikat dengan skema...", opsi:["A. PKWTT selama 5 tahun","B. PKWT selama 2 tahun","C. Magang selama 6 bulan","D. Kontrak langsung PNS"], jawaban:"B", pembahasan:"Peserta yang lolos diikat dengan Perjanjian Kerja Waktu Tertentu (PKWT) selama 2 tahun di bawah PT Agrinas Pangan Nusantara." },
  { id:11, topik:"Regulasi KDKMP", soal:"Perbedaan mendasar KDKMP dengan BUMDes adalah...", opsi:["A. KDKMP lebih kecil dari BUMDes","B. KDKMP berasaskan kekeluargaan dan dimiliki anggota, BUMDes adalah badan usaha milik pemerintah desa","C. BUMDes tidak boleh mencari keuntungan","D. Keduanya sama saja"], jawaban:"B", pembahasan:"KDKMP berbasis koperasi (dimiliki anggota, asas kekeluargaan). BUMDes adalah badan usaha milik pemerintah desa. Berbeda secara hukum, kepemilikan, dan struktur pengambilan keputusan." },
  { id:12, topik:"Regulasi KDKMP", soal:"Format penamaan resmi Koperasi Desa Merah Putih adalah...", opsi:["A. Nama kepala desa + Koperasi","B. 'Koperasi Desa/Kelurahan Merah Putih' + nama wilayah","C. Nama BUMDes yang sudah ada","D. Nama bebas sesuai kesepakatan anggota"], jawaban:"B", pembahasan:"Pedoman PHTC mewajibkan format: 'Koperasi' + 'Desa/Kelurahan Merah Putih' + nama desa/kelurahan untuk standarisasi identitas nasional program." },
  // 3. PRINSIP KOPERASI
  { id:13, topik:"Prinsip Koperasi", soal:"Prinsip pengambilan keputusan yang membedakan koperasi dari perusahaan biasa adalah...", opsi:["A. Berdasarkan jumlah modal yang disetor","B. Hak suara sama setiap anggota (one member one vote)","C. Hanya pengurus yang berhak memutuskan","D. Berdasarkan jabatan dalam kepengurusan"], jawaban:"B", pembahasan:"Prinsip 'one member one vote' adalah ciri khas koperasi. Setiap anggota punya hak suara sama terlepas dari besar kecilnya modal — berbeda dari PT yang berdasarkan jumlah saham." },
  { id:14, topik:"Prinsip Koperasi", soal:"Manakah yang BUKAN termasuk 7 prinsip koperasi internasional (ICA)?", opsi:["A. Keanggotaan sukarela dan terbuka","B. Pengendalian oleh anggota secara demokratis","C. Keuntungan dibagi berdasarkan jumlah saham","D. Kepedulian terhadap komunitas"], jawaban:"C", pembahasan:"Pembagian keuntungan berdasarkan saham adalah prinsip perusahaan, bukan koperasi. Koperasi membagi SHU berdasarkan partisipasi transaksi anggota." },
  { id:15, topik:"Prinsip Koperasi", soal:"Tujuan koperasi berdasarkan UU No. 25 Tahun 1992 Pasal 3 adalah...", opsi:["A. Memaksimalkan keuntungan untuk investor","B. Memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya","C. Menjadi perusahaan terbesar di wilayah desa","D. Mengalahkan minimarket swasta"], jawaban:"B", pembahasan:"Pasal 3 UU 25/1992: tujuan koperasi adalah memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya, serta ikut membangun tatanan perekonomian nasional." },
  { id:16, topik:"Prinsip Koperasi", soal:"Koperasi desa A dan B bergabung membeli sembako agar lebih murah. Prinsip koperasi apa yang diterapkan?", opsi:["A. Kemandirian","B. Otonomi koperasi","C. Kerja sama antar koperasi","D. Pendidikan anggota"], jawaban:"C", pembahasan:"Kerja sama antar koperasi (prinsip ke-6 ICA) mendorong koperasi bersinergi demi memperkuat posisi tawar dan efisiensi operasional bersama." },
  { id:17, topik:"Prinsip Koperasi", soal:"Koperasi menyisihkan SHU untuk membangun fasilitas desa. Ini mencerminkan prinsip...", opsi:["A. Pengendalian demokratis","B. Otonomi dan kemandirian","C. Kepedulian terhadap komunitas","D. Kerja sama antar koperasi"], jawaban:"C", pembahasan:"Kepedulian terhadap komunitas (prinsip ke-7 ICA) mendorong koperasi berkontribusi pada pembangunan berkelanjutan di lingkungan sekitarnya." },
  { id:18, topik:"Prinsip Koperasi", soal:"Anggota yang ingin keluar dari koperasi, berdasarkan prinsip koperasi, berhak...", opsi:["A. Tidak boleh keluar selama punya simpanan","B. Keluar dengan membayar denda besar","C. Keluar sesuai ketentuan AD/ART tanpa paksaan","D. Keluar hanya setelah persetujuan pengurus"], jawaban:"C", pembahasan:"Prinsip keanggotaan sukarela: anggota bebas masuk dan keluar. Mekanismenya diatur AD/ART, namun tidak boleh ada pemaksaan untuk tetap bergabung." },
  // 4. STRUKTUR ORGANISASI
  { id:19, topik:"Struktur Organisasi", soal:"Pemegang kekuasaan tertinggi dalam koperasi adalah...", opsi:["A. Pengurus","B. Pengawas","C. Rapat Anggota","D. Manajer KDKMP"], jawaban:"C", pembahasan:"Rapat Anggota adalah forum pemegang kekuasaan tertinggi. Menetapkan kebijakan umum, mengesahkan laporan, memilih pengurus/pengawas, dan memutuskan hal strategis." },
  { id:20, topik:"Struktur Organisasi", soal:"Tugas utama Pengawas koperasi adalah...", opsi:["A. Mengelola operasional harian","B. Mengawasi pelaksanaan kebijakan dan pengelolaan oleh Pengurus","C. Menentukan besaran SHU","D. Mewakili koperasi dalam perjanjian bisnis"], jawaban:"B", pembahasan:"Pengawas bertugas mengawasi dan memeriksa pelaksanaan kebijakan serta pengelolaan koperasi oleh Pengurus, memastikan sesuai prinsip dan AD/ART." },
  { id:21, topik:"Struktur Organisasi", soal:"RKAT (Rencana Kerja dan Anggaran Tahunan) harus disahkan oleh...", opsi:["A. Manajer KDKMP","B. Pengawas Koperasi","C. Rapat Anggota","D. Dinas Koperasi Kabupaten"], jawaban:"C", pembahasan:"RKAT adalah dokumen perencanaan strategis tahunan yang WAJIB disahkan Rapat Anggota sebagai pemegang kekuasaan tertinggi sebelum dijalankan Pengurus." },
  { id:22, topik:"Struktur Organisasi", soal:"Masa jabatan maksimal Pengurus Koperasi dalam satu periode adalah...", opsi:["A. 2 tahun","B. 3 tahun","C. 5 tahun","D. Seumur hidup"], jawaban:"C", pembahasan:"Berdasarkan UU No. 25/1992, masa jabatan pengurus paling lama 5 tahun dan dapat dipilih kembali sesuai ketentuan AD/ART koperasi." },
  { id:23, topik:"Struktur Organisasi", soal:"Siapa yang berwenang mengangkat dan memberhentikan manajer operasional KDKMP?", opsi:["A. Kepala Desa","B. Rapat Anggota","C. Pengurus Koperasi","D. PT Agrinas Pangan Nusantara"], jawaban:"C", pembahasan:"Pengurus koperasi berwenang mengangkat dan memberhentikan manajer/karyawan dalam rangka menjalankan operasional harian sesuai keputusan Rapat Anggota." },
  { id:24, topik:"Struktur Organisasi", soal:"Hak anggota dalam RAT yang WAJIB dipenuhi adalah...", opsi:["A. Mendapat gaji bulanan dari koperasi","B. Memilih dan dipilih pengurus/pengawas serta mendapat informasi laporan keuangan","C. Menjadi direktur unit usaha tanpa seleksi","D. Mendapat pinjaman tanpa bunga seumur hidup"], jawaban:"B", pembahasan:"Hak anggota dalam RAT: memilih dan dipilih menjadi pengurus/pengawas, menyampaikan pendapat, dan mendapat informasi penuh tentang perkembangan keuangan koperasi." },
  // 5. PERMODALAN
  { id:25, topik:"Permodalan", soal:"Simpanan yang dibayar SATU KALI saat pertama masuk dan tidak bisa diambil selama aktif adalah...", opsi:["A. Simpanan Wajib","B. Simpanan Sukarela","C. Dana Cadangan","D. Simpanan Pokok"], jawaban:"D", pembahasan:"Simpanan Pokok: dibayar satu kali saat daftar, nilainya sama untuk semua anggota, tidak dapat diambil selama masih aktif menjadi anggota." },
  { id:26, topik:"Permodalan", soal:"Simpanan yang dibayar anggota secara RUTIN setiap periode sesuai AD/ART disebut...", opsi:["A. Simpanan Pokok","B. Simpanan Wajib","C. Simpanan Sukarela","D. Dana Hibah"], jawaban:"B", pembahasan:"Simpanan Wajib dibayar periodik (bulanan/triwulan), jumlahnya sama untuk semua anggota sesuai AD/ART. Berbeda dari Simpanan Sukarela yang fleksibel." },
  { id:27, topik:"Permodalan", soal:"Simpanan yang besarannya BEBAS dan dapat ditarik sewaktu-waktu disebut...", opsi:["A. Simpanan Pokok","B. Simpanan Wajib","C. Simpanan Sukarela","D. Dana Cadangan"], jawaban:"C", pembahasan:"Simpanan Sukarela: fleksibel, anggota bebas tentukan jumlah, dapat ditarik kapan saja sesuai ketentuan. Berfungsi seperti tabungan di koperasi." },
  { id:28, topik:"Permodalan", soal:"Dana yang disisihkan dari SHU untuk memperkuat modal dan tidak dibagikan disebut...", opsi:["A. Simpanan Wajib","B. Jasa Modal","C. Dana Cadangan","D. Dana Sosial"], jawaban:"C", pembahasan:"Dana Cadangan disisihkan dari SHU untuk memperkuat posisi keuangan dan menghadapi risiko koperasi di masa mendatang. Tidak dibagikan kepada anggota." },
  { id:29, topik:"Permodalan", soal:"Urutan sumber modal internal yang tepat sebelum mencari pinjaman luar adalah...", opsi:["A. Langsung pinjam ke bank","B. Dana Cadangan → penambahan Simpanan Wajib → pinjaman eksternal","C. Jual aset tetap terlebih dahulu","D. Minta suntikan dana pemerintah"], jawaban:"B", pembahasan:"Prinsip kemandirian koperasi: utamakan modal internal (Dana Cadangan, Simpanan Wajib) sebelum mencari modal eksternal dari bank atau lembaga keuangan." },
  { id:30, topik:"Permodalan", soal:"Modal koperasi yang berasal dari pinjaman bank atau obligasi disebut...", opsi:["A. Modal sendiri","B. Modal pinjaman","C. Dana cadangan","D. Simpanan sukarela"], jawaban:"B", pembahasan:"Modal pinjaman (modal luar) berasal dari pihak eksternal: bank, lembaga keuangan, atau obligasi. Berbeda dari modal sendiri yang bersumber dari simpanan dan SHU anggota." },
  // 6. SHU
  { id:31, topik:"SHU", soal:"Koperasi: pendapatan Rp600 juta, biaya Rp380 juta. Berapa SHU-nya?", opsi:["A. Rp600 juta","B. Rp380 juta","C. Rp220 juta","D. Rp980 juta"], jawaban:"C", pembahasan:"SHU = Pendapatan − Biaya = Rp600 juta − Rp380 juta = Rp220 juta. SHU adalah keuntungan bersih koperasi setelah seluruh biaya dikurangi." },
  { id:32, topik:"SHU", soal:"Dasar pembagian SHU yang paling sesuai prinsip koperasi adalah...", opsi:["A. Jumlah simpanan pokok","B. Lamanya menjadi anggota","C. Partisipasi/jasa usaha anggota dalam kegiatan koperasi","D. Jabatan dalam kepengurusan"], jawaban:"C", pembahasan:"Prinsip koperasi: SHU dibagi adil berdasarkan partisipasi/jasa usaha (volume transaksi) anggota. Anggota aktif bertransaksi mendapat lebih banyak." },
  { id:33, topik:"SHU", soal:"Bagian SHU yang diterima anggota berdasarkan besarnya simpanan disebut...", opsi:["A. Jasa Usaha","B. Jasa Modal","C. Dana Pendidikan","D. Dana Sosial"], jawaban:"B", pembahasan:"Jasa Modal adalah komponen SHU yang diberikan kepada anggota berdasarkan besarnya simpanan yang disetor, sebagai apresiasi kontribusi modal anggota." },
  { id:34, topik:"SHU", soal:"Anggota A transaksi Rp12 juta/tahun, Anggota B Rp4 juta/tahun. SHU anggota A dibanding B adalah...", opsi:["A. 2 kali","B. 3 kali","C. 4 kali","D. Sama saja"], jawaban:"B", pembahasan:"Rp12 juta ÷ Rp4 juta = 3. SHU anggota A adalah 3 kali lipat B berdasarkan partisipasi transaksinya. Ini mencerminkan prinsip keadilan koperasi." },
  { id:35, topik:"SHU", soal:"Alokasi SHU untuk membiayai pelatihan anggota dan pengurus disebut...", opsi:["A. Dana Cadangan","B. Dana Sosial","C. Dana Pendidikan","D. Jasa Modal"], jawaban:"C", pembahasan:"Dana Pendidikan adalah alokasi SHU khusus untuk membiayai pendidikan dan pelatihan anggota serta pengurus, mencerminkan prinsip ke-5 ICA." },
  { id:36, topik:"SHU", soal:"Ada perbedaan pendapat antara pengurus (mau perbesar Dana Cadangan) dan anggota (mau SHU lebih besar). Manajer harus...", opsi:["A. Ikuti pengurus karena berkewenangan","B. Ikuti keinginan anggota agar tidak konflik","C. Mengacu pada AD/ART dan keputusan RAT","D. Tunda pembagian tanpa batas waktu"], jawaban:"C", pembahasan:"Pembagian SHU harus mengacu pada AD/ART dan keputusan RAT. Dokumen ini mengikat semua pihak dan tidak boleh diubah sepihak oleh pengurus maupun manajer." },
  // 7. LAPORAN KEUANGAN
  { id:37, topik:"Laporan Keuangan", soal:"Laporan yang menggambarkan posisi aset, kewajiban, dan modal pada suatu tanggal tertentu adalah...", opsi:["A. Laporan Arus Kas","B. Laporan SHU","C. Neraca (Laporan Posisi Keuangan)","D. Laporan Perubahan Modal"], jawaban:"C", pembahasan:"Neraca menggambarkan kondisi finansial koperasi pada titik waktu tertentu. Rumus: Aset = Kewajiban + Modal. Wajib dilaporkan dalam RAT." },
  { id:38, topik:"Laporan Keuangan", soal:"Laporan yang menunjukkan aliran uang masuk dan keluar dari aktivitas koperasi disebut...", opsi:["A. Neraca","B. Laporan Arus Kas","C. Laporan SHU","D. RKAT"], jawaban:"B", pembahasan:"Laporan Arus Kas menunjukkan pergerakan uang dari aktivitas: operasional (usaha), investasi (beli/jual aset), dan pendanaan (pinjaman/pelunasan)." },
  { id:39, topik:"Laporan Keuangan", soal:"Total aset koperasi Rp800 juta, kewajiban Rp300 juta. Berapa modal koperasi?", opsi:["A. Rp1,1 miliar","B. Rp300 juta","C. Rp500 juta","D. Rp800 juta"], jawaban:"C", pembahasan:"Modal = Aset − Kewajiban = Rp800 juta − Rp300 juta = Rp500 juta. Persamaan dasar akuntansi ini selalu berlaku." },
  { id:40, topik:"Laporan Keuangan", soal:"Manajer menemukan selisih antara kas fisik dan catatan. Langkah pertama yang benar adalah...", opsi:["A. Langsung pecat kasir","B. Telusuri semua transaksi dan bukti pembayaran","C. Tutupi dengan dana pribadi","D. Biarkan saja jika selisihnya kecil"], jawaban:"B", pembahasan:"Prosedur audit yang benar: telusuri seluruh bukti transaksi untuk menemukan sumber selisih SEBELUM mengambil tindakan. Transparansi dan kehati-hatian adalah kunci." },
  { id:41, topik:"Laporan Keuangan", soal:"Yang termasuk ASET LANCAR koperasi adalah...", opsi:["A. Tanah dan bangunan kantor","B. Kendaraan operasional","C. Kas, piutang, dan persediaan barang","D. Mesin dan peralatan"], jawaban:"C", pembahasan:"Aset lancar = dapat dicairkan <1 tahun: kas, piutang anggota, persediaan barang. Aset tetap = jangka panjang: tanah, gedung, kendaraan, mesin." },
  { id:42, topik:"Laporan Keuangan", soal:"Laporan keuangan koperasi wajib dilaporkan kepada anggota dalam forum...", opsi:["A. Setiap bulan melalui papan pengumuman","B. Rapat Anggota Tahunan (RAT)","C. Langsung ke Dinas Koperasi saja","D. Hanya jika ada anggota yang meminta"], jawaban:"B", pembahasan:"UU No. 25/1992 mewajibkan laporan keuangan tahunan disampaikan dan dipertanggungjawabkan kepada seluruh anggota dalam RAT. Ini wujud transparansi dan akuntabilitas." },
  // 8. FUNGSI MANAJEMEN
  { id:43, topik:"Fungsi Manajemen", soal:"Manajer menetapkan target penjualan dan menyusun anggaran tahun depan. Fungsi manajemen yang dijalankan adalah...", opsi:["A. Organizing","B. Planning","C. Actuating","D. Controlling"], jawaban:"B", pembahasan:"Planning = menetapkan tujuan, target, strategi, dan anggaran. Ini adalah fungsi PERTAMA dan fondasi dari seluruh siklus manajemen." },
  { id:44, topik:"Fungsi Manajemen", soal:"Manajer membagi tugas: 2 orang keuangan, 3 gudang, 2 pelayanan. Fungsi yang dijalankan adalah...", opsi:["A. Planning","B. Organizing","C. Actuating","D. Controlling"], jawaban:"B", pembahasan:"Organizing = membagi tugas, menetapkan struktur, mendistribusikan tanggung jawab kepada anggota tim untuk mencapai tujuan." },
  { id:45, topik:"Fungsi Manajemen", soal:"Manajer menggerakkan tim, memberi motivasi, dan memastikan semua bekerja sesuai target. Fungsi yang dijalankan adalah...", opsi:["A. Planning","B. Organizing","C. Actuating","D. Controlling"], jawaban:"C", pembahasan:"Actuating = memotivasi, mengarahkan, dan menggerakkan tim agar bekerja optimal menuju tujuan yang telah ditetapkan." },
  { id:46, topik:"Fungsi Manajemen", soal:"Manajer membandingkan realisasi vs target, menemukan gap 40%, lalu melakukan koreksi. Fungsi yang dijalankan adalah...", opsi:["A. Planning","B. Organizing","C. Actuating","D. Controlling"], jawaban:"D", pembahasan:"Controlling = mengukur realisasi vs rencana, menganalisis penyimpangan, dan mengambil tindakan korektif agar tujuan tetap tercapai." },
  { id:47, topik:"Fungsi Manajemen", soal:"Manajer memberi penghargaan kepada karyawan berprestasi agar semangat meningkat. Ini bagian dari fungsi...", opsi:["A. Planning","B. Organizing","C. Actuating","D. Controlling"], jawaban:"C", pembahasan:"Pemberian penghargaan dan motivasi adalah bagian dari Actuating untuk mendorong semangat kerja dan kinerja optimal tim." },
  { id:48, topik:"Fungsi Manajemen", soal:"Urutan fungsi manajemen POAC yang BENAR adalah...", opsi:["A. Organizing → Planning → Controlling → Actuating","B. Planning → Organizing → Actuating → Controlling","C. Actuating → Planning → Organizing → Controlling","D. Controlling → Organizing → Planning → Actuating"], jawaban:"B", pembahasan:"Siklus manajemen: Planning (rencanakan) → Organizing (atur struktur) → Actuating (gerakkan tim) → Controlling (awasi & evaluasi). Siklus ini terus berulang." },
  // 9. KEPEMIMPINAN & TIM
  { id:49, topik:"Kepemimpinan & Tim", soal:"Tim sering datang tepat waktu tapi produktivitas rendah. Pendekatan manajemen terbaik adalah...", opsi:["A. Perketat aturan absensi","B. Tetapkan target kerja yang jelas dan terukur (task-based)","C. Kurangi jumlah anggota tim","D. Serahkan ke pengurus"], jawaban:"B", pembahasan:"Task-based (berbasis hasil/target) lebih efektif dari hour-based (berbasis jam hadir). Target jelas mendorong produktivitas dan tanggung jawab individu." },
  { id:50, topik:"Kepemimpinan & Tim", soal:"Ada konflik antara dua anggota tim. Gaya kepemimpinan terbaik manajer adalah...", opsi:["A. Biarkan mereka selesaikan sendiri","B. Langsung pecat salah satu","C. Fasilitasi mediasi dan komunikasi terbuka untuk solusi win-win","D. Laporkan ke pengurus untuk RAT"], jawaban:"C", pembahasan:"Kepemimpinan situasional dalam koperasi mengutamakan musyawarah. Manajer berperan sebagai fasilitator mediasi untuk mempertahankan keutuhan dan produktivitas tim." },
  { id:51, topik:"Kepemimpinan & Tim", soal:"Manajer baru menghadapi tim yang belum berpengalaman. Gaya kepemimpinan paling tepat adalah...", opsi:["A. Delegatif — serahkan semua ke tim","B. Direktif — instruksi jelas, bimbing langsung, awasi ketat","C. Laissez-faire — biarkan tim mandiri","D. Otoriter — hukum yang salah tanpa penjelasan"], jawaban:"B", pembahasan:"Untuk tim baru yang belum berpengalaman, gaya direktif paling efektif. Instruksi jelas + pelatihan + pengawasan ketat sampai tim cukup kompeten." },
  { id:52, topik:"Kepemimpinan & Tim", soal:"Unit simpan pinjam kinerja turun karena tim tidak paham prosedur analisis kredit. Solusi terbaik adalah...", opsi:["A. Tutup unit simpan pinjam","B. Ganti seluruh anggota tim","C. Berikan pelatihan teknis dan pendampingan intensif","D. Laporkan ke pengawas sebagai masalah struktural"], jawaban:"C", pembahasan:"Pelatihan dan pengembangan kompetensi adalah solusi tepat ketika masalah kinerja bersumber dari kurangnya pengetahuan. Investasi SDM lebih efektif dari pergantian personel." },
  { id:53, topik:"Kepemimpinan & Tim", soal:"Anggota tim senior menolak digitalisasi sistem keuangan. Pendekatan terbaik adalah...", opsi:["A. Langsung berhentikan yang menolak","B. Tunda digitalisasi selamanya","C. Libatkan dalam perencanaan dan berikan pelatihan bertahap","D. Paksa tanpa diskusi"], jawaban:"C", pembahasan:"Change management yang efektif: libatkan pemangku kepentingan dalam perencanaan dan sediakan pelatihan bertahap. Ini membangun rasa kepemilikan dan mengurangi resistensi." },
  { id:54, topik:"Kepemimpinan & Tim", soal:"Prinsip kepemimpinan efektif dalam konteks koperasi adalah...", opsi:["A. Pemimpin selalu lebih tahu dari anggota","B. Kepentingan pemimpin di atas kepentingan anggota","C. Servant leadership — melayani anggota dan memberdayakan tim","D. Keputusan dibuat sepihak tanpa melibatkan tim"], jawaban:"C", pembahasan:"Servant leadership sangat relevan untuk koperasi berasas kekeluargaan. Manajer efektif memberdayakan tim dan mengutamakan kepentingan anggota di atas kepentingan pribadi." },
  // 10. MODEL BISNIS
  { id:55, topik:"Model Bisnis", soal:"Sebelum membuka unit usaha baru, analisis PERTAMA yang harus dilakukan manajer adalah...", opsi:["A. Langsung beli peralatan dan sewa gedung","B. Analisis kebutuhan anggota, potensi pasar, dan kelayakan bisnis","C. Minta modal dari pemerintah desa dahulu","D. Tiru model bisnis koperasi lain persis sama"], jawaban:"B", pembahasan:"Studi kelayakan bisnis yang komprehensif (analisis kebutuhan, riset pasar, kelayakan finansial) adalah langkah pertama wajib sebelum membuka unit usaha baru." },
  { id:56, topik:"Model Bisnis", soal:"Rantai pasok ideal untuk unit usaha sembako KDKMP adalah...", opsi:["A. Beli dari tengkulak yang menentukan harga","B. Petani/produsen lokal → gudang koperasi → anggota/konsumen","C. Impor semua dari luar daerah","D. Tunggu anggota bawa barang sendiri"], jawaban:"B", pembahasan:"Rantai pasok pendek (petani lokal → koperasi → konsumen) memotong tengkulak: petani harga lebih baik, konsumen lebih murah, ekonomi lokal menguat." },
  { id:57, topik:"Model Bisnis", soal:"Unit simpan pinjam mengalami peningkatan kredit macet. Langkah strategis terbaik adalah...", opsi:["A. Hentikan seluruh pemberian kredit baru","B. Hapus semua kredit macet dari pembukuan","C. Restrukturisasi kredit macet + perketat analisis pinjaman baru","D. Tutup unit simpan pinjam permanen"], jawaban:"C", pembahasan:"Restrukturisasi (penjadwalan ulang, keringanan) untuk kredit macet + analisis kelayakan lebih ketat untuk pinjaman baru adalah standar manajemen risiko kredit." },
  { id:58, topik:"Model Bisnis", soal:"Prioritas digitalisasi layanan koperasi yang paling penting adalah...", opsi:["A. Website mewah yang belum bisa diakses anggota","B. Pencatatan transaksi dan simpanan digital (real-time dan transparan)","C. Media sosial koperasi","D. Komputer mahal untuk kantor"], jawaban:"B", pembahasan:"Digitalisasi pencatatan transaksi dan simpanan adalah prioritas karena meningkatkan transparansi, mengurangi kesalahan manual, dan mempercepat akses informasi anggota." },
  { id:59, topik:"Model Bisnis", soal:"KDKMP punya cold storage. Strategi penggunaan terbaik untuk petani anggota adalah...", opsi:["A. Sewakan ke pengusaha luar","B. Simpan panen anggota agar bisa dijual saat harga pasar tinggi","C. Hanya dipakai saat bencana","D. Jual karena biaya listrik mahal"], jawaban:"B", pembahasan:"Cold storage memungkinkan petani simpan panen lebih lama, tidak terpaksa jual murah saat panen raya. Ini strategi penguatan posisi tawar petani yang efektif." },
  { id:60, topik:"Model Bisnis", soal:"Unit apotek KDKMP wajib memenuhi persyaratan utama berupa...", opsi:["A. Persetujuan tengkulak dan pengurus saja","B. Tenaga apoteker berlisensi (SIPA) dan izin dari dinas kesehatan","C. Modal minimal Rp5 miliar","D. Rekomendasi kepala desa saja sudah cukup"], jawaban:"B", pembahasan:"Unit apotek wajib: apoteker berlisensi (Surat Izin Praktik Apoteker/SIPA) + izin operasional dari dinas kesehatan. Tanpa keduanya, apotek tidak legal beroperasi." },
  // 11. PELAYANAN ANGGOTA
  { id:61, topik:"Pelayanan Anggota", soal:"Standar pelayanan prima dalam koperasi yang paling penting adalah...", opsi:["A. Layani anggota bersimpanan besar lebih cepat","B. Cepat, ramah, transparan, dan sama untuk semua anggota","C. Prioritaskan anggota yang kenal pengurus","D. Layani hanya anggota aktif pembayar simpanan"], jawaban:"B", pembahasan:"Prinsip koperasi mengharuskan pelayanan adil, non-diskriminatif, dan berkualitas untuk SEMUA anggota. Transparansi membangun kepercayaan dan loyalitas jangka panjang." },
  { id:62, topik:"Pelayanan Anggota", soal:"Strategi terbaik meningkatkan partisipasi anggota adalah...", opsi:["A. Paksa hadir rapat dengan ancaman denda","B. Edukasi manfaat, libatkan dalam keputusan, berikan insentif partisipasi","C. Kurangi jumlah anggota","D. Alihkan keputusan ke pengurus saja"], jawaban:"B", pembahasan:"Partisipasi anggota meningkat saat mereka paham manfaat, dilibatkan dalam keputusan, dan mendapat insentif nyata. Edukasi dan keterlibatan = kunci loyalitas." },
  { id:63, topik:"Pelayanan Anggota", soal:"Anggota baru belum paham cara menggunakan simpan pinjam. Tindakan manajer yang tepat adalah...", opsi:["A. Suruh belajar sendiri","B. Tolak anggota baru sampai belajar sendiri","C. Berikan orientasi dan pendampingan tentang layanan koperasi","D. Jelaskan hanya saat ada masalah"], jawaban:"C", pembahasan:"Orientasi dan pendampingan anggota baru adalah bagian dari prinsip pendidikan koperasi. Anggota teredukasi lebih aktif berpartisipasi dan berkontribusi." },
  { id:64, topik:"Pelayanan Anggota", soal:"Langkah strategis PALING efektif memperkuat kelembagaan KDKMP adalah...", opsi:["A. Bangun kantor yang megah","B. Perbanyak unit usaha tanpa pertimbangkan kapasitas","C. Bangun kepercayaan melalui transparansi laporan keuangan dan peningkatan layanan berkelanjutan","D. Ganti seluruh pengurus setiap tahun"], jawaban:"C", pembahasan:"Kelembagaan kuat dibangun di atas kepercayaan anggota. Transparansi keuangan, akuntabilitas, dan peningkatan layanan berkelanjutan adalah fondasinya." },
  { id:65, topik:"Pelayanan Anggota", soal:"Indikator koperasi sehat dari aspek pelayanan anggota adalah...", opsi:["A. Pengurus bergaji tinggi","B. Kantor koperasi mewah","C. Tingginya kepuasan dan partisipasi aktif anggota","D. Banyak unit usaha meski merugi"], jawaban:"C", pembahasan:"Koperasi sehat dari aspek pelayanan: anggota aktif, puas dengan layanan, dan merasakan manfaat nyata. Ini cerminan keberhasilan misi koperasi." },
  { id:66, topik:"Pelayanan Anggota", soal:"Anggota mengeluh pencairan pinjaman terlalu lambat. Respon terbaik manajer adalah...", opsi:["A. Abaikan karena prosedur sudah benar","B. Salahkan anggota karena dokumen tidak lengkap","C. Analisis proses dan sederhanakan prosedur tanpa korbankan kehati-hatian","D. Hapus prosedur verifikasi agar lebih cepat"], jawaban:"C", pembahasan:"Keluhan adalah umpan balik berharga. Analisis bottleneck proses → cari efisiensi → tetap jaga kehati-hatian dalam pemberian pinjaman. Jangan ekstrem ke kiri atau kanan." },
  // 12. PENGAWASAN INTERNAL
  { id:67, topik:"Pengawasan Internal", soal:"Tujuan utama sistem pengawasan internal (audit internal) koperasi adalah...", opsi:["A. Mencari kesalahan karyawan untuk dipecat","B. Memastikan kegiatan sesuai aturan, mencegah penyimpangan, dan meningkatkan efisiensi","C. Membuat laporan untuk pemerintah saja","D. Mengawasi anggota agar tidak keluar"], jawaban:"B", pembahasan:"Pengawasan internal bertujuan: kepatuhan terhadap aturan, pencegahan/deteksi dini penyimpangan, dan peningkatan efisiensi operasional koperasi." },
  { id:68, topik:"Pengawasan Internal", soal:"Manajer menemukan indikasi penggelapan dana oleh staf. Langkah yang BENAR adalah...", opsi:["A. Selesaikan kekeluargaan tanpa dokumentasi","B. Langsung pecat tanpa investigasi","C. Investigasi menyeluruh, dokumentasikan bukti, laporkan ke Pengurus dan Pengawas","D. Minta staf ganti sendiri dan rahasiakan"], jawaban:"C", pembahasan:"Prosedur penanganan penyimpangan: investigasi terstruktur → dokumentasi bukti → laporan ke Pengurus dan Pengawas. Transparansi dan akuntabilitas tidak boleh dikompromikan." },
  { id:69, topik:"Pengawasan Internal", soal:"Mekanisme pengawasan terbaik untuk mencegah penyimpangan di unit usaha sembako adalah...", opsi:["A. Andalkan kejujuran karyawan saja","B. Pemisahan fungsi + stock opname berkala + rekonsiliasi kas harian","C. Pasang CCTV di semua sudut saja","D. Serahkan pengawasan ke kepala desa"], jawaban:"B", pembahasan:"Internal control yang kuat: segregation of duties (pisah fungsi pencatat vs pemegang uang), stock opname berkala, rekonsiliasi harian. Ini standar pengendalian internal efektif." },
  { id:70, topik:"Pengawasan Internal", soal:"Indikator koperasi TIDAK sehat dari aspek keuangan adalah...", opsi:["A. Rasio likuiditas di atas 100%","B. SHU terus meningkat setiap tahun","C. Kredit macet (NPL) lebih dari 5% dari total pinjaman","D. Dana cadangan terus bertumbuh"], jawaban:"C", pembahasan:"NPL >5% mengindikasikan koperasi tidak sehat: lemahnya analisis kredit, pengawasan, dan penagihan piutang. Perlu tindakan korektif segera." },
  { id:71, topik:"Pengawasan Internal", soal:"Yang bertanggung jawab melakukan audit pembukuan koperasi secara internal adalah...", opsi:["A. Manajer Operasional","B. Kepala Desa","C. Pengawas Koperasi","D. Anggota biasa"], jawaban:"C", pembahasan:"Pengawas Koperasi memiliki tugas dan kewenangan resmi untuk melakukan pemeriksaan/audit terhadap pembukuan dan pengelolaan keuangan oleh Pengurus." },
  { id:72, topik:"Pengawasan Internal", soal:"Mekanisme pengawasan eksternal koperasi yang efektif dilakukan melalui...", opsi:["A. Kepala desa ambil alih pengelolaan langsung","B. Laporan berkala + audit independen + musyawarah desa untuk evaluasi","C. Pemerintah desa tidak perlu mengawasi","D. Hanya inspeksi mendadak tanpa pemberitahuan"], jawaban:"B", pembahasan:"Pengawasan eksternal efektif: laporan berkala ke pemerintah desa, audit independen pihak ketiga, dan musyawarah desa sebagai forum evaluasi program." },
  // 13. TANGGUNG JAWAB HUKUM
  { id:73, topik:"Tanggung Jawab Hukum", soal:"Koperasi dilikuidasi, aset tidak cukup menutup hutang. Tanggung jawab anggota (sistem terbatas) adalah...", opsi:["A. Wajib jual aset pribadi","B. Pengurus menanggung seluruh hutang","C. Anggota bertanggung jawab sebatas simpanan pokok dan wajib yang disetor","D. Pemerintah desa wajib menutup kekurangan"], jawaban:"C", pembahasan:"Dalam sistem tanggung jawab terbatas, anggota hanya bertanggung jawab sebatas modal yang telah disetor (simpanan pokok + wajib). Tidak menyentuh harta pribadi anggota." },
  { id:74, topik:"Tanggung Jawab Hukum", soal:"Pengurus terbukti menyelewengkan dana tanpa sepengetahuan anggota. Siapa yang bertanggung jawab?", opsi:["A. Seluruh anggota menanggung bersama","B. Pengurus yang melakukan penyelewengan secara pribadi","C. Manajer operasional koperasi","D. Pemerintah desa"], jawaban:"B", pembahasan:"Pengurus bertanggung jawab penuh atas pengelolaan koperasi. Penyelewengan dana oleh pengurus = tanggung jawab hukum pribadi dan dapat dipidana sesuai hukum berlaku." },
  { id:75, topik:"Tanggung Jawab Hukum", soal:"Manajer menandatangani kontrak Rp500 juta tanpa persetujuan pengurus. Konsekuensinya adalah...", opsi:["A. Kontrak sah karena manajer pimpinan operasional","B. Kontrak dapat dibatalkan karena manajer melampaui kewenangannya","C. Seluruh anggota bertanggung jawab","D. Pengawas yang menanggung risiko"], jawaban:"B", pembahasan:"Manajer hanya berwenang dalam batas yang ditetapkan Pengurus dan AD/ART. Tindakan ultra vires (melebihi kewenangan) dapat dibatalkan secara hukum." },
  { id:76, topik:"Tanggung Jawab Hukum", soal:"Forum penyelesaian sengketa PERTAMA yang harus ditempuh dalam koperasi adalah...", opsi:["A. Langsung ke Pengadilan Negeri","B. Lapor ke Polisi","C. Musyawarah mufakat dalam Rapat Anggota","D. Arbitrase internasional"], jawaban:"C", pembahasan:"Prinsip koperasi mengutamakan musyawarah mufakat. Selesaikan internal dulu melalui Rapat Anggota sebelum dibawa ke jalur hukum formal." },
  { id:77, topik:"Tanggung Jawab Hukum", soal:"Koperasi yang tidak menyelenggarakan RAT selama 2 tahun berturut-turut dapat...", opsi:["A. Dikenai denda ringan saja","B. Dibekukan atau dibubarkan oleh pejabat berwenang","C. Pengurusnya dipenjara otomatis","D. Seluruh anggota didenda"], jawaban:"B", pembahasan:"Berdasarkan UU No. 25/1992, koperasi yang tidak memenuhi kewajiban hukum seperti penyelenggaraan RAT dapat dibekukan atau dibubarkan oleh pejabat yang berwenang." },
  { id:78, topik:"Tanggung Jawab Hukum", soal:"Kerja sama koperasi dengan pihak ketiga yang signifikan harus memastikan...", opsi:["A. Cukup persetujuan manajer saja","B. Diputuskan RAT dan dituangkan dalam perjanjian kerja sama yang sah","C. Izin kepala desa sudah cukup","D. Tidak perlu prosedur khusus asal menguntungkan"], jawaban:"B", pembahasan:"Kerja sama signifikan dengan pihak luar harus melalui keputusan RAT dan didokumentasikan dalam perjanjian sah. Ini melindungi kepentingan seluruh anggota." },
  // 14. STRATEGI EKONOMI DESA
  { id:79, topik:"Strategi Ekonomi Desa", soal:"Tujuan UTAMA unit usaha sembako KDKMP adalah...", opsi:["A. Kalahkan minimarket swasta","B. Percepat distribusi pangan dan stabilkan harga kebutuhan pokok masyarakat desa","C. Kumpulkan keuntungan sebesar-besarnya untuk pengurus","D. Jadi agen tunggal pemerintah untuk pangan"], jawaban:"B", pembahasan:"Unit sembako KDKMP: jamin ketersediaan dan stabilitas harga pokok, potong rantai distribusi panjang, berdayakan ekonomi masyarakat desa. Bukan semata profit." },
  { id:80, topik:"Strategi Ekonomi Desa", soal:"Petani selalu jual panen murah ke tengkulak. Inovasi bisnis KDKMP terbaik adalah...", opsi:["A. Beri pinjaman ke tengkulak agar beli lebih banyak","B. Buka unit pembelian hasil bumi dengan harga wajar + cold storage","C. Bangun kantor megah","D. Sarankan petani ganti komoditas"], jawaban:"B", pembahasan:"Unit pembelian hasil bumi + cold storage memotong rantai tengkulak. Petani dapat harga adil, koperasi mendapat margin, konsumen mendapat harga stabil. Solusi terbaik." },
  { id:81, topik:"Strategi Ekonomi Desa", soal:"Strategi KDKMP paling memberdayakan untuk nelayan anggota adalah...", opsi:["A. Beli tangkapan murah untuk dijual lebih mahal","B. Buka unit pengolahan dan pemasaran ikan langsung ke konsumen","C. Hanya sewakan kapal saja","D. Hanya sediakan bahan bakar kapal"], jawaban:"B", pembahasan:"Pengolahan + pemasaran langsung meningkatkan nilai tambah, memangkas tengkulak, dan meningkatkan pendapatan nelayan anggota secara signifikan." },
  { id:82, topik:"Strategi Ekonomi Desa", soal:"Program KDKMP mendukung ketahanan pangan desa melalui cara berikut, KECUALI...", opsi:["A. Memastikan ketersediaan stok pangan di desa","B. Membangun jaringan distribusi efisien","C. Memonopoli harga pangan untuk keuntungan maksimal koperasi","D. Memberdayakan petani lokal sebagai pemasok utama"], jawaban:"C", pembahasan:"Memonopoli harga untuk keuntungan sendiri BERTENTANGAN dengan prinsip koperasi yang berorientasi kesejahteraan anggota dan masyarakat. KDKMP harus pastikan harga yang adil." },
  { id:83, topik:"Strategi Ekonomi Desa", soal:"Indikator keberhasilan KDKMP dalam menggerakkan ekonomi desa yang paling tepat adalah...", opsi:["A. Banyaknya unit usaha tanpa lihat profitabilitas","B. Besarnya kantor dan aset tetap","C. Peningkatan pendapatan anggota, perputaran ekonomi lokal, dan partisipasi anggota","D. Seberapa besar pinjaman yang didapat dari bank"], jawaban:"C", pembahasan:"Keberhasilan KDKMP diukur dari dampak nyata: pendapatan anggota naik, ekonomi lokal bergairah, anggota aktif berpartisipasi. Bukan dari jumlah aset atau pinjaman." },
  { id:84, topik:"Strategi Ekonomi Desa", soal:"Strategi jangka panjang terbaik KDKMP untuk ketahanan ekonomi desa adalah...", opsi:["A. Timbun stok pangan sebanyak mungkin","B. Bangun ekosistem produksi lokal terintegrasi: petani → koperasi → konsumen, didukung cold storage dan distribusi efisien","C. Bergantung sepenuhnya pada subsidi pemerintah","D. Tutup semua unit usaha dan simpan modal di bank"], jawaban:"B", pembahasan:"Ketahanan ekonomi jangka panjang dibangun melalui ekosistem terintegrasi: penguatan produksi lokal, efisiensi rantai pasok, dan infrastruktur memadai. Bukan ketergantungan subsidi." },
];

const topikWarna = {
  "Landasan Hukum":"#6366f1","Regulasi KDKMP":"#0ea5e9","Prinsip Koperasi":"#8b5cf6",
  "Struktur Organisasi":"#3b82f6","Permodalan":"#10b981","SHU":"#ef4444",
  "Laporan Keuangan":"#f59e0b","Fungsi Manajemen":"#f97316","Kepemimpinan & Tim":"#ec4899",
  "Model Bisnis":"#14b8a6","Pelayanan Anggota":"#a855f7","Pengawasan Internal":"#84cc16",
  "Tanggung Jawab Hukum":"#fb923c","Strategi Ekonomi Desa":"#06b6d4",
};

function acakSoal(filter="Semua") {
  const pool = filter==="Semua" ? bankSoal : bankSoal.filter(s=>s.topik===filter);
  return [...pool].sort(()=>Math.random()-0.5).slice(0,Math.min(20,pool.length));
}

export default function App() {
  const [layar, setLayar] = useState("menu"); // menu | materi | detailMateri | latihan | review
  const [materiAktif, setMateriAktif] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [sesiSoal, setSesiSoal] = useState([]);
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState({});

  const mulaiLatihan = useCallback((f=filter) => {
    setSesiSoal(acakSoal(f)); setIdx(0); setJawaban({}); setLayar("latihan");
  }, [filter]);

  const soal = sesiSoal[idx];
  const totalBenar = Object.entries(jawaban).filter(([i,j])=>sesiSoal[Number(i)]?.jawaban===j).length;
  const totalPoin = totalBenar*5;

  function pilih(h){ if(!jawaban[idx]) setJawaban(p=>({...p,[idx]:h})); }
  function next(){ idx<sesiSoal.length-1?setIdx(i=>i+1):setLayar("review"); }

  const opsiStyle=(si,h)=>{const s=sesiSoal[si],u=jawaban[si];if(!s||!u)return{bg:"#1e293b",br:"#334155",tx:"#94a3b8"};if(h===s.jawaban)return{bg:"#064e3b",br:"#10b981",tx:"#6ee7b7"};if(h===u)return{bg:"#4c0519",br:"#ef4444",tx:"#fca5a5"};return{bg:"#0f172a",br:"#1e293b",tx:"#475569"};};

  const S={ff:"'Georgia',serif",bg:"#0f172a",card:"#1e293b",border:"#334155",muted:"#64748b",text:"#e2e8f0",sub:"#94a3b8"};

  // ──── MENU ────
  if(layar==="menu") return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${S.bg} 0%,#1a1040 50%,${S.bg} 100%)`,padding:"20px",fontFamily:S.ff}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        <div style={{textAlign:"center",padding:"28px 0 22px"}}>
          <div style={{fontSize:52,marginBottom:8}}>🏪</div>
          <h1 style={{color:"#f1f5f9",fontSize:22,fontWeight:"bold",margin:0}}>Persiapan CAT KDKMP</h1>
          <p style={{color:"#ef4444",fontWeight:"bold",fontSize:13,margin:"4px 0 2px"}}>Tes Manajemen Koperasi · PHTC 2026</p>
          <p style={{color:S.muted,fontSize:11,margin:0}}>Materi + Latihan Soal · 14 Topik Kisi-Kisi Resmi</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {/* MATERI */}
          <button onClick={()=>setLayar("materi")} style={{background:"linear-gradient(135deg,#1d4ed8,#4f46e5)",border:"none",borderRadius:16,padding:"20px 16px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 24px #3b82f633"}}>
            <div style={{fontSize:32,marginBottom:8}}>📚</div>
            <div style={{color:"#bfdbfe",fontWeight:"bold",fontSize:15}}>Belajar Materi</div>
            <div style={{color:"#93c5fd",fontSize:11,marginTop:4}}>14 topik · ringkasan lengkap</div>
          </button>
          {/* LATIHAN */}
          <button onClick={()=>setLayar("pilihLatihan")} style={{background:"linear-gradient(135deg,#b91c1c,#ef4444)",border:"none",borderRadius:16,padding:"20px 16px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 24px #ef444433"}}>
            <div style={{fontSize:32,marginBottom:8}}>🎯</div>
            <div style={{color:"#fee2e2",fontWeight:"bold",fontSize:15}}>Latihan Soal</div>
            <div style={{color:"#fca5a5",fontSize:11,marginTop:4}}>84 soal · diacak tiap sesi</div>
          </button>
        </div>

        <div style={{background:S.card,borderRadius:12,padding:"12px 16px",border:`1px solid ${S.border}`,display:"flex",justifyContent:"space-around"}}>
          {[["84","Bank Soal"],["14","Topik"],["20","Soal/Sesi"],["🔀","Diacak"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{color:"#f59e0b",fontSize:18,fontWeight:"bold"}}>{v}</div>
              <div style={{color:S.muted,fontSize:10,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ──── PILIH LATIHAN ────
  if(layar==="pilihLatihan") return (
    <div style={{minHeight:"100vh",background:S.bg,padding:"20px",fontFamily:S.ff}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <button onClick={()=>setLayar("menu")} style={{background:"none",border:"none",color:S.muted,cursor:"pointer",fontSize:13}}>← Menu</button>
          <span style={{color:S.sub,fontSize:14}}>Pilih Topik Latihan</span>
        </div>
        <button onClick={()=>{setFilter("Semua");mulaiLatihan("Semua");}}
          style={{background:"linear-gradient(135deg,#1d4ed8,#4f46e5)",border:"none",borderRadius:12,padding:"13px 16px",cursor:"pointer",width:"100%",textAlign:"left",color:"#bfdbfe",fontWeight:"bold",fontSize:14,marginBottom:10,fontFamily:S.ff}}>
          🎯 Semua Topik — 20 soal acak dari 84 soal
        </button>
        <p style={{color:S.sub,fontSize:11,marginBottom:10,letterSpacing:"1px",textTransform:"uppercase"}}>Atau pilih per topik:</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {materiData.map(m=>(
            <button key={m.id} onClick={()=>{setFilter(m.topik);mulaiLatihan(m.topik);}}
              style={{background:S.card,border:`1px solid ${S.border}`,borderLeft:`3px solid ${topikWarna[m.topik]}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",fontFamily:S.ff}}>
              <div style={{color:topikWarna[m.topik],fontSize:16}}>{m.icon}</div>
              <div style={{color:S.sub,fontSize:11,marginTop:3}}>{m.topik}</div>
              <div style={{color:topikWarna[m.topik],fontSize:10,fontWeight:"bold"}}>{bankSoal.filter(s=>s.topik===m.topik).length} soal</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ──── DAFTAR MATERI ────
  if(layar==="materi") return (
    <div style={{minHeight:"100vh",background:S.bg,padding:"20px",fontFamily:S.ff}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <button onClick={()=>setLayar("menu")} style={{background:"none",border:"none",color:S.muted,cursor:"pointer",fontSize:13}}>← Menu</button>
          <span style={{color:S.sub,fontSize:14}}>Pilih Topik Materi</span>
        </div>
        <div style={{background:S.card,borderRadius:12,padding:"10px 14px",marginBottom:16,border:`1px solid ${S.border}`}}>
          <p style={{color:S.muted,fontSize:12,margin:0}}>📖 14 topik kisi-kisi resmi PHTC 2026. Klik topik untuk baca ringkasan lengkap.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {materiData.map(m=>(
            <button key={m.id} onClick={()=>{setMateriAktif(m);setLayar("detailMateri");}}
              style={{background:S.card,border:`1px solid ${S.border}`,borderLeft:`4px solid ${topikWarna[m.topik]}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",textAlign:"left",fontFamily:S.ff,display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>{m.icon}</span>
              <div style={{flex:1}}>
                <div style={{color:"#f1f5f9",fontWeight:"bold",fontSize:13}}>{m.topik}</div>
                <div style={{color:S.muted,fontSize:11,marginTop:2}}>{m.ringkasan}</div>
              </div>
              <span style={{color:topikWarna[m.topik],fontSize:11,fontWeight:"bold"}}>{m.poin.length} poin →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ──── DETAIL MATERI ────
  if(layar==="detailMateri" && materiAktif) {
    const w = topikWarna[materiAktif.topik];
    return (
      <div style={{minHeight:"100vh",background:S.bg,padding:"20px",fontFamily:S.ff}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <button onClick={()=>setLayar("materi")} style={{background:"none",border:"none",color:S.muted,cursor:"pointer",fontSize:13}}>← Materi</button>
          </div>
          {/* Header materi */}
          <div style={{background:`linear-gradient(135deg,${w}22,${S.card})`,border:`1px solid ${w}44`,borderRadius:16,padding:20,marginBottom:16}}>
            <div style={{fontSize:40,marginBottom:8}}>{materiAktif.icon}</div>
            <h2 style={{color:"#f1f5f9",fontSize:20,fontWeight:"bold",margin:"0 0 6px"}}>{materiAktif.topik}</h2>
            <p style={{color:S.sub,fontSize:13,margin:0}}>{materiAktif.ringkasan}</p>
          </div>
          {/* Poin materi */}
          {materiAktif.poin.map((p,i)=>(
            <div key={i} style={{background:S.card,borderRadius:12,padding:16,marginBottom:10,border:`1px solid ${S.border}`,borderLeft:`3px solid ${w}`}}>
              <div style={{color:w,fontWeight:"bold",fontSize:13,marginBottom:6}}>📌 {p.judul}</div>
              <p style={{color:S.text,fontSize:13,lineHeight:1.7,margin:0,whiteSpace:"pre-line"}}>{p.isi}</p>
            </div>
          ))}
          {/* Tombol latihan topik ini */}
          <button onClick={()=>{setFilter(materiAktif.topik);mulaiLatihan(materiAktif.topik);}}
            style={{background:`linear-gradient(135deg,${w},${w}88)`,color:"white",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:"bold",cursor:"pointer",width:"100%",marginTop:8,fontFamily:S.ff}}>
            🎯 Latihan Soal Topik Ini ({bankSoal.filter(s=>s.topik===materiAktif.topik).length} soal)
          </button>
        </div>
      </div>
    );
  }

  // ──── LATIHAN ────
  if(layar==="latihan" && soal) {
    const u=jawaban[idx],done=!!u,prog=((idx+1)/sesiSoal.length)*100,w=topikWarna[soal.topik];
    return (
      <div style={{minHeight:"100vh",background:S.bg,padding:"20px",fontFamily:S.ff}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <button onClick={()=>setLayar("menu")} style={{background:"none",border:"none",color:S.muted,cursor:"pointer",fontSize:13}}>← Menu</button>
            <span style={{color:S.muted,fontSize:13}}>{idx+1} / {sesiSoal.length}</span>
            <span style={{color:"#f59e0b",fontWeight:"bold",fontSize:13}}>{totalPoin} poin</span>
          </div>
          <div style={{height:5,background:S.card,borderRadius:4,marginBottom:18,overflow:"hidden"}}>
            <div style={{height:"100%",background:`linear-gradient(90deg,${w},#f59e0b)`,borderRadius:4,width:`${prog}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{display:"inline-block",background:w+"22",border:`1px solid ${w}55`,borderRadius:20,padding:"4px 14px",marginBottom:14}}>
            <span style={{color:w,fontSize:12,fontWeight:"bold"}}>{soal.topik}</span>
          </div>
          <div style={{background:S.card,borderRadius:14,padding:20,marginBottom:14,border:`1px solid ${S.border}`}}>
            <p style={{color:S.text,fontSize:15,lineHeight:1.75,margin:0}}>{soal.soal}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:14}}>
            {soal.opsi.map(opsi=>{
              const h=opsi[0],st=opsiStyle(idx,h);
              return(<button key={h} onClick={()=>pilih(h)} disabled={done}
                style={{background:st.bg,border:`2px solid ${st.br}`,borderRadius:12,padding:"12px 16px",textAlign:"left",cursor:done?"default":"pointer",color:st.tx,fontSize:13,lineHeight:1.5,transition:"all 0.2s",fontFamily:S.ff}}>
                {opsi}</button>);
            })}
          </div>
          {done&&(
            <div style={{background:u===soal.jawaban?"#064e3b":"#1c1917",border:`1px solid ${u===soal.jawaban?"#10b981":"#f59e0b"}`,borderRadius:12,padding:16,marginBottom:14}}>
              <div style={{color:u===soal.jawaban?"#6ee7b7":"#fbbf24",fontWeight:"bold",fontSize:14,marginBottom:8}}>
                {u===soal.jawaban?"✅ Benar! +5 poin":`❌ Jawaban benar: ${soal.jawaban}`}
              </div>
              <p style={{color:S.sub,fontSize:13,lineHeight:1.65,margin:0}}>💡 {soal.pembahasan}</p>
            </div>
          )}
          {done&&(
            <button onClick={next} style={{background:`linear-gradient(135deg,${w},#b91c1c)`,color:"white",border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:"bold",cursor:"pointer",width:"100%",fontFamily:S.ff}}>
              {idx<sesiSoal.length-1?"Soal Berikutnya →":"Lihat Hasil 🏆"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ──── REVIEW ────
  if(layar==="review") {
    const byTopik={};
    sesiSoal.forEach((s,i)=>{if(!byTopik[s.topik])byTopik[s.topik]={b:0,t:0};byTopik[s.topik].t++;if(jawaban[i]===s.jawaban)byTopik[s.topik].b++;});
    return (
      <div style={{minHeight:"100vh",background:S.bg,padding:"20px",fontFamily:S.ff}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <div style={{background:`linear-gradient(135deg,${S.card},${S.bg})`,borderRadius:16,padding:24,marginBottom:16,textAlign:"center",border:`1px solid ${S.border}`}}>
            <div style={{fontSize:48,marginBottom:8}}>{totalPoin>=80?"🏆":totalPoin>=60?"💪":"📚"}</div>
            <div style={{color:"#f1f5f9",fontSize:30,fontWeight:"bold"}}>{totalPoin} / 100</div>
            <div style={{color:S.muted,fontSize:12}}>{totalBenar} dari {sesiSoal.length} soal benar</div>
            <div style={{marginTop:8,color:totalPoin>=80?"#10b981":totalPoin>=60?"#f59e0b":"#ef4444",fontSize:13,fontWeight:"bold"}}>
              {totalPoin>=80?"Luar biasa! Siap tempur 🔥":totalPoin>=60?"Bagus! Terus tingkatkan 💪":"Perlu lebih banyak latihan 📚"}
            </div>
          </div>
          <p style={{color:S.sub,fontSize:11,marginBottom:8,letterSpacing:"1px",textTransform:"uppercase"}}>Performa Per Topik</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {Object.entries(byTopik).map(([t,{b,n2}])=>{const total=byTopik[t].t,benar=byTopik[t].b,w=topikWarna[t];return(
              <div key={t} style={{background:S.card,borderRadius:10,padding:"10px 12px",borderLeft:`3px solid ${w}`}}>
                <div style={{color:S.text,fontSize:11,marginBottom:4}}>{t}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{flex:1,height:4,background:"#334155",borderRadius:2}}>
                    <div style={{height:"100%",background:w,borderRadius:2,width:`${(benar/total)*100}%`}}/>
                  </div>
                  <span style={{color:w,fontSize:11,fontWeight:"bold"}}>{benar}/{total}</span>
                </div>
              </div>
            );})}
          </div>
          <p style={{color:S.sub,fontSize:11,marginBottom:8,letterSpacing:"1px",textTransform:"uppercase"}}>Review Jawaban</p>
          {sesiSoal.map((s,i)=>{
            const benar=jawaban[i]===s.jawaban,w=topikWarna[s.topik];
            return(<div key={s.id} style={{background:S.card,borderRadius:12,padding:14,marginBottom:8,border:`1px solid ${benar?"#064e3b":"#4c0519"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:w,fontSize:11,fontWeight:"bold"}}>{s.topik}</span>
                <span style={{fontSize:12}}>{benar?"✅ +5":"❌ 0"}</span>
              </div>
              <p style={{color:S.text,fontSize:12,lineHeight:1.5,marginBottom:8}}>{s.soal}</p>
              <div style={{background:"#064e3b",borderRadius:8,padding:"6px 10px",marginBottom:4}}>
                <span style={{color:"#6ee7b7",fontSize:11}}>✓ {s.opsi.find(o=>o.startsWith(s.jawaban))}</span>
              </div>
              {!benar&&jawaban[i]&&<div style={{background:"#4c0519",borderRadius:8,padding:"6px 10px",marginBottom:4}}>
                <span style={{color:"#fca5a5",fontSize:11}}>✗ {s.opsi.find(o=>o.startsWith(jawaban[i]))}</span>
              </div>}
              <p style={{color:S.muted,fontSize:11,lineHeight:1.5,marginTop:6,fontStyle:"italic"}}>💡 {s.pembahasan}</p>
            </div>);
          })}
          <div style={{display:"flex",gap:10,marginTop:10}}>
            <button onClick={()=>setLayar("menu")} style={{background:S.card,color:S.sub,border:`1px solid ${S.border}`,borderRadius:12,padding:"13px",fontSize:13,cursor:"pointer",flex:1,fontFamily:S.ff}}>← Menu</button>
            <button onClick={()=>mulaiLatihan(filter)} style={{background:"linear-gradient(135deg,#ef4444,#b91c1c)",color:"white",border:"none",borderRadius:12,padding:"13px",fontSize:13,fontWeight:"bold",cursor:"pointer",flex:2,fontFamily:S.ff}}>🔀 Sesi Baru</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
