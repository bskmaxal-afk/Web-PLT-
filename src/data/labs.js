export const labs = [
<<<<<<< HEAD
  { 
    id: 1, 
    name: "Lab Biologi Agraria", 
    description: "Laboratorium untuk praktikum biokimia klinis, kultur mikroba, isolasi enzim, dan analisis biomolekul.", 
    capacity: 30, 
    status: "available", 
    prodi: "Biologi", 
    rumpun: "biologi",
    spek: "Mikroskop Binokuler Olympus, Autoklaf, Laminar Air Flow, Inkubator Shaker", 
    software: "Geneious, BLAST, SPSS, ImageJ" 
  },
  { 
    id: 2, 
    name: "Lab Fisika Dasar & Material", 
    description: "Laboratorium untuk praktikum fisika dasar, eksperimen mekanika, termodinamika, dan analisis material.", 
    capacity: 36, 
    status: "available", 
    prodi: "Fisika", 
    rumpun: "fisika",
    spek: "Set Percobaan Mekanika, Osiloskop Digital, Laser Helium-Neon, Spektrofotometer", 
    software: "Logger Pro, Matlab, OriginPro, LabVIEW" 
  },
  { 
    id: 3, 
    name: "Lab Kimia Analitik & Lingkungan", 
    description: "Laboratorium untuk pengujian kimia instrumen, analisis kuantitatif, dan pemantauan polutan lingkungan.", 
    capacity: 30, 
    status: "available", 
    prodi: "Kimia", 
    rumpun: "kimia",
    spek: "Spektrofotometer UV-Vis, Kromatografi Gas (GC), pH Meter Digital, Rotary Evaporator", 
    software: "ChemDraw, SPSS, R-Studio" 
  },
  { 
    id: 5, 
    name: "Lab Komputasi Sains & Pemodelan", 
    description: "Laboratorium untuk komputasi numerik, pemodelan matematika, dan simulasi sistem fisika/kimia rumit.", 
    capacity: 40, 
    status: "available", 
    prodi: "Matematika", 
    rumpun: "tisimat",
    spek: "Workstation Intel Xeon, 32GB RAM, GPU Nvidia RTX 4070", 
    software: "MATLAB, Python (Jupyter), Maple, Wolfram Mathematica" 
  },
  { 
    id: 8, 
    name: "Lab Elektronika & Robotika", 
    description: "Laboratorium untuk perancangan rangkaian elektronik, mikrokontroler, IoT, dan sistem kontrol robotika.", 
    capacity: 32, 
    status: "available", 
    prodi: "Teknik Elektro", 
    rumpun: "tisimat",
    spek: "Solder Station, Osciloskop Rigol, 3D Printer, Kit Arduino & Raspberry Pi", 
    software: "Arduino IDE, Proteus, STM32CubeIDE, KiCad" 
  },
  { 
    id: 9, 
    name: "Lab Biokimia & Mikrobiologi", 
    description: "Laboratorium untuk praktikum biokimia klinis, kultur mikroba, isolasi enzim, dan analisis biomolekul.", 
    capacity: 25, 
    status: "available", 
    prodi: "Biologi", 
    rumpun: "biologi",
    spek: "Sentrifuse Dingin, Spektrofotometer Mikroplate, Gel Doc, PCR Thermal Cycler", 
    software: "MEGA, SnapGene, PyMOL" 
  },
  { 
    id: 11, 
    name: "Lab Geologi & Geofisika", 
    description: "Laboratorium untuk analisis mineralogi, petrografi, pemetaan geologi, dan survei seismik.", 
    capacity: 36, 
    status: "available", 
    prodi: "Teknik Geologi", 
    rumpun: "tambang",
    spek: "Mikroskop Polarisasi, GPS Geodetik, Set Seismograf Portable", 
    software: "ArcGIS, Surfer, Petrel, QGIS" 
  },
  { 
    id: 12, 
    name: "Lab Jaringan Komputer & Siber", 
    description: "Laboratorium untuk simulasi jaringan skala luas, uji penetrasi sistem, dan pertahanan siber.", 
    capacity: 36, 
    status: "available", 
    prodi: "Teknik Informatika", 
    rumpun: "tisimat",
    spek: "Rack Server Dell PowerEdge, Cisco Router & Switch Catalyst", 
    software: "Wireshark, Kali Linux, Cisco Packet Tracer, GNS3" 
  },
  {
    id: 13,
    name: "Lab Rekayasa Perangkat Lunak & Data",
    description: "Laboratorium untuk perancangan aplikasi enterprise, analisis data besar, dan rekayasa perangkat lunak.",
    capacity: 35,
    status: "available",
    prodi: "Sistem Informasi",
    rumpun: "tisimat",
    spek: "Workstation Intel Core i7, 16GB RAM, SSD 512GB",
    software: "VS Code, Docker, MySQL, IntelliJ IDEA, Tableau"
  },
  {
    id: 14,
    name: "Lab Kimia Organik & Biokimia",
    description: "Laboratorium untuk sintesis senyawa organik, ekstraksi bahan alam, dan uji metabolit sekunder.",
    capacity: 30,
    status: "available",
    prodi: "Kimia",
    rumpun: "kimia",
    spek: "Rotary Evaporator, Heating Mantle, Lemari Asam, Gas Chromatography",
    software: "ChemDraw, SPSS, OriginPro"
  },
  {
    id: 15,
    name: "Lab Genetika & Bioteknologi",
    description: "Laboratorium untuk rekayasa genetika, kultur jaringan, ekstraksi DNA, dan analisis elektroforesis.",
    capacity: 28,
    status: "available",
    prodi: "Biologi",
    rumpun: "biologi",
    spek: "Thermal Cycler PCR, Gel Electrophoresis, Laminar Air Flow, Mikropipet set",
    software: "MEGA, PyMOL, Blast"
  },
  {
    id: 16,
    name: "Lab Instrumentasi & Fisika Medis",
    description: "Laboratorium untuk kalibrasi alat ukur, analisis radiasi, pemodelan dosimetri, dan fisika medikal dasar.",
    capacity: 30,
    status: "available",
    prodi: "Fisika",
    rumpun: "fisika",
    spek: "Geiger-Muller Counter, X-Ray Diffraction Kit, Digital Oscilloscope, Spektrofotometer",
    software: "LabVIEW, OriginPro, MATLAB"
  },
  {
    id: 17,
    name: "Lab Analisis Bisnis & Sosial Ekonomi Pertanian",
    description: "Laboratorium untuk simulasi kelayakan bisnis pertanian, analisis ekonometrika, dan pengolahan data survei.",
    capacity: 40,
    status: "available",
    prodi: "Agribisnis",
    rumpun: "agribisnis",
    spek: "PC Desktop Intel i5, Proyektor, pendingin udara ruangan",
    software: "SPSS, EViews, AMOS, LISREL, Microsoft Office"
  },
  {
    id: 18,
    name: "Lab Kewirausahaan & Simulasi Bisnis",
    description: "Laboratorium inkubasi bisnis pertanian, perancangan rencana pemasaran, dan simulasi transaksi pasar.",
    capacity: 35,
    status: "available",
    prodi: "Agribisnis",
    rumpun: "agribisnis",
    spek: "Co-working space layout, Smart TV, Whiteboard interaktif",
    software: "Canva Pro, Trello, Microsoft Office"
  },
  {
    id: 19,
    name: "Lab Geomekanika & Pengolahan Bahan Galian",
    description: "Laboratorium untuk analisis mekanika batuan, pengujian kuat tekan, dan preparasi mineral tambang.",
    capacity: 30,
    status: "available",
    prodi: "Teknik Pertambangan",
    rumpun: "tambang",
    spek: "Jaw Crusher, Sieve Shaker, Compression Testing Machine, Oven Pengering",
    software: "Surpac, Slide, AutoCAD"
  },
  {
    id: 20,
    name: "Lab Sensoris & Evaluasi Gizi Pangan",
    description: "Laboratorium untuk pengujian organoleptik produk makanan baru dan analisis kandungan nilai gizi pangan.",
    capacity: 25,
    status: "available",
    prodi: "Teknologi Pangan",
    rumpun: "pangan",
    spek: "Individual Sensory Booths, Spektrofotometer, Timbangan Analitis, Oven",
    software: "SPSS, R-Studio"
  },
  {
    id: 21,
    name: "Lab Pengolahan & Pengemasan Pangan",
    description: "Laboratorium untuk simulasi pengolahan produk pangan skala kecil, pasteurisasi, dan rekayasa kemasan pangan.",
    capacity: 30,
    status: "available",
    prodi: "Teknologi Pangan",
    rumpun: "pangan",
    spek: "Double Seamer, Vacuum Packager, Cabinet Dryer, Batch Pasteurizer",
    software: "SolidWorks, AutoCAD"
  },
  {
    id: 22,
    name: "Lab Rekayasa Lingkungan & Pengolahan Limbah",
    description: "Laboratorium untuk eksperimen pemurnian air, pengolahan limbah cair/padat, dan pengujian kualitas udara.",
    capacity: 30,
    status: "available",
    prodi: "Teknik Lingkungan",
    rumpun: "lingkungan",
    spek: "Atomic Absorption Spectroscopy (AAS), COD Reactor, DO/TDS Meter, Jar Test Apparatus",
    software: "SewerGEMS, WaterGEMS, ArcGIS"
  },
  {
    id: 23,
    name: "Lab Mitigasi Bencana & Sistem Informasi Lingkungan",
    description: "Laboratorium untuk pemodelan sebaran limpasan banjir, pemetaan risiko bencana, dan sistem informasi geografis.",
    capacity: 35,
    status: "available",
    prodi: "Teknik Lingkungan",
    rumpun: "lingkungan",
    spek: "High-spec Workstation PC, GPS Garmin Map, Drone DJI Phantom untuk pemetaan",
    software: "ArcGIS Desktop, QGIS, HEC-RAS, Google Earth Pro"
=======
  {
    id: 1,
    name: "Laboratorium Penelitian Katalis dan Polimer",
    description: "Laboratorium untuk sintesis polimer, karakterisasi katalis, penelitian reaksi kimia, dan pengembangan material baru.",
    capacity: 25,
    status: "available",
    prodi: "Kimia",
    spek: "Reaktor Kaca Berjaket, Autoclave Tekanan Tinggi, Spektrofotometer FT-IR, GPC (Gel Permeation Chromatography)",
    software: "OriginPro, ChemDraw, MestReNova"
  },
  {
    id: 2,
    name: "Laboratorium Penelitian Lingkungan",
    description: "Laboratorium untuk pengujian kualitas air, udara, dan tanah, analisis polutan, serta pengembangan teknologi pengolahan limbah.",
    capacity: 30,
    status: "available",
    prodi: "Kimia",
    spek: "Atomic Absorption Spectrophotometer (AAS), Gas Chromatography (GC), pH & DO Meter Digital, COD Reactor",
    software: "SPSS, R-Studio, ChemDraw"
  },
  {
    id: 3,
    name: "Ruang Analisis Makanan",
    description: "Laboratorium untuk analisis zat gizi makro dan mikro, pengujian keamanan pangan, dan pengawasan mutu produk pangan.",
    capacity: 20,
    status: "available",
    prodi: "Kimia",
    spek: "Soxhlet Extractor, Kjeldahl Digestor, Oven Pengering Vakum, Refraktometer Digital",
    software: "SPSS, Nutrisurvey, ChemDraw"
  },
  {
    id: 5,
    name: "Ruang Administrasi",
    description: "Pusat layanan administrasi, pengelolaan persuratan, penjadwalan praktikum, dan koordinasi operasional seluruh laboratorium PLT.",
    capacity: 15,
    status: "available",
    prodi: "Umum",
    spek: "PC Desktop Intel i5, Printer & Scanner High-Speed, Lemari Arsip Tahan Api",
    software: "Microsoft Office 365, Google Workspace, Sistem Informasi PLT"
  },
  {
    id: 8,
    name: "Pusat Inkubator Bisnis",
    description: "Fasilitas kolaboratif untuk inkubasi bisnis mahasiswa, pengembangan startup, mentoring usaha, dan komersialisasi produk riset sains.",
    capacity: 40,
    status: "available",
    prodi: "Umum",
    spek: "Smart Projector, Interactive Whiteboard, Co-working Desk, High-Speed Wi-Fi",
    software: "Trello, Slack, Canva Pro, Microsoft Project"
  },
  {
    id: 9,
    name: "Laboratorium Uji Material",
    description: "Laboratorium untuk pengujian mekanis material, uji tarik, uji keras, karakterisasi fisik logam, polimer, dan komposit.",
    capacity: 25,
    status: "available",
    prodi: "Fisika",
    spek: "Universal Testing Machine (UTM), Hardness Tester Vickers, Furnace Peleburan 1200C, Mikroskop Metalurgi",
    software: "Matlab, OriginPro, ANSYS"
  },
  {
    id: 11,
    name: "Laboratorium Geofisika",
    description: "Laboratorium untuk pemodelan data seismik, analisis medan gravitasi, geomagnetik, dan metode geolistrik untuk eksplorasi bumi.",
    capacity: 30,
    status: "available",
    prodi: "Teknik Geologi",
    spek: "Workstation Intel Xeon, Seismograf Portable, Resistivity Meter, Magnetometer",
    software: "Oasis Montaj, Res2Dinv, Surfer, ArcGIS"
  },
  {
    id: 12,
    name: "Laboratorium Fisika Instrumentasi",
    description: "Laboratorium untuk perancangan sistem sensor, akuisisi data, pemrograman mikrokontroler, serta kalibrasi alat ukur elektronik.",
    capacity: 30,
    status: "available",
    prodi: "Fisika",
    spek: "Osiloskop Digital Rigol, Function Generator, Solder Station Temperature-Controlled, Kit Arduino & ESP32",
    software: "LabVIEW, Proteus, Arduino IDE, Keil uVision"
  },
  {
    id: 13,
    name: "Laboratorium Fisika Material & Komputasi",
    description: "Fasilitas riset pemodelan struktur atom, simulasi sifat mekanis/listrik material baru, dan perhitungan fisika zat padat.",
    capacity: 25,
    status: "available",
    prodi: "Fisika",
    spek: "Workstation Core i9 64GB RAM, Dual GPU Nvidia RTX 4070, Server Komputasi Lokal",
    software: "Quantum ESPRESSO, VASP, LAMMPS, Matlab, Python"
  },
  {
    id: 14,
    name: "Laboratorium Fisika Dasar",
    description: "Laboratorium untuk praktikum fisika dasar mahasiswa TPB, eksperimen mekanika klasik, kalor, optik, dan listrik magnet.",
    capacity: 40,
    status: "available",
    prodi: "Fisika",
    spek: "Set Percobaan Rel Udara, Set Optik Laser, Jembatan Wheatstone, Kalorimeter Digital",
    software: "Logger Pro, Microsoft Excel, Origin"
  },
  {
    id: 15,
    name: "Laboratorium Fisika Lanjut",
    description: "Laboratorium untuk eksperimen fisika modern, fisika nuklir tingkat dasar, optika koheren, dan efek fotoelektrik.",
    capacity: 20,
    status: "available",
    prodi: "Fisika",
    spek: "Frank-Hertz Experiment Kit, e/m Apparatus, Spektrometer Gamma, Laser He-Ne Eksperimental",
    software: "Maestro MCA, OriginPro, Matlab"
  },
  {
    id: 16,
    name: "Laboratorium Kimia Analitik",
    description: "Laboratorium untuk pengujian kimia instrumen, analisis kuantitatif kation-anion, dan spektroskopi.",
    capacity: 30,
    status: "available",
    prodi: "Kimia",
    spek: "Spektrofotometer UV-Vis, HPLC (High-Performance Liquid Chromatography), Timbangan Analitis Presisi",
    software: "ChemStation, Chromeleon, ChemDraw"
  },
  {
    id: 17,
    name: "Laboratorium Kimia Anorganik",
    description: "Laboratorium untuk praktikum sintesis senyawa koordinasi kompleks logam transisi, karakterisasi padatan, dan kristalografi.",
    capacity: 25,
    status: "available",
    prodi: "Kimia",
    spek: "Muffle Furnace 1000C, Magnetic Stirrer Hotplate, Neraca Analitis Sartorius, Desikator Vakum",
    software: "Mercury, Diamond Crystallography, ChemDraw"
  },
  {
    id: 18,
    name: "Laboratorium Penelitian Kimia Komputasi",
    description: "Fasilitas riset pemodelan molekul organik/anorganik, simulasi docking obat-reseptor, dan perhitungan mekanika kuantum.",
    capacity: 20,
    status: "available",
    prodi: "Kimia",
    spek: "Workstation Intel Xeon Gold, GPU RTX 3080 Ti, High-Performance Computing Cluster Access",
    software: "Gaussian, Autodock Vina, ORCA, Avogadro, GROMACS"
  },
  {
    id: 19,
    name: "Laboratorium Biokimia",
    description: "Laboratorium untuk analisis biomolekul, fraksionasi protein, uji aktivitas enzim, dan analisis karbohidrat, lipid, & asam nukleat.",
    capacity: 25,
    status: "available",
    prodi: "Kimia",
    spek: "Sentrifuse Refrigerated, Elektroforesis Gel Agarosa & PAGE, Spectrophotometer Microplate Reader",
    software: "ImageJ, SnapGene, ChemDraw"
  },
  {
    id: 20,
    name: "Laboratorium Kimia Organik",
    description: "Laboratorium untuk praktikum sintesis senyawa organik, distilasi fraksionasi, ekstraksi cair-cair, dan analisis gugus fungsi.",
    capacity: 30,
    status: "available",
    prodi: "Kimia",
    spek: "Rotary Evaporator Buchi, Mantle Heater, Melting Point Apparatus, Alat Uji Refraksi Abbe",
    software: "ChemDraw, MestReNova, Origin"
  },
  {
    id: 21,
    name: "Laboratorium Ekologi",
    description: "Laboratorium untuk analisis sampel lapangan bio-lingkungan, keanekaragaman hayati flora-fauna, dan pemetaan ekosistem darat/perairan.",
    capacity: 30,
    status: "available",
    prodi: "Biologi",
    spek: "GPS Garmin Montana, Soil Tester, Water Quality Analyzer, Stereo Zoom Microscope",
    software: "ArcGIS, QGIS, PAST (Paleontological Statistics), R"
  },
  {
    id: 22,
    name: "Laboratorium Biologi Dasar",
    description: "Laboratorium praktikum biologi dasar untuk pengenalan mikroskopi sel tumbuhan/hewan, pengenalan jaringan hidup, dan genetika mendel.",
    capacity: 40,
    status: "available",
    prodi: "Biologi",
    spek: "Mikroskop Binokuler Olympus CX23, Preparat Biologi Lengkap, Laminar Air Flow Cabinet",
    software: "ImageJ, BLAST, SPSS"
  },
  {
    id: 23,
    name: "Laboratorium Fisiologi",
    description: "Laboratorium untuk studi fisiologi hewan dan tumbuhan, pengukuran laju fotosintesis, respirasi hewan, dan uji hormon tanaman.",
    capacity: 25,
    status: "available",
    prodi: "Biologi",
    spek: "Respirometer Ganong, Fotosintometer, Kymograph System, Spektrofotometer Klorofil",
    software: "LabChart, OriginPro, SPSS"
  },
  {
    id: 24,
    name: "Laboratorium Mikrobiologi",
    description: "Laboratorium steril untuk pembiakan bakteri/jamur, sterilisasi media, pewarnaan gram mikroba, dan uji efikasi antibiotik.",
    capacity: 25,
    status: "available",
    prodi: "Biologi",
    spek: "Autoklaf Vertikal, Inkubator Shaker Memmert, Laminar Air Flow (LAF) Class II, Colony Counter",
    software: "MEGA11, BLAST, ClustalW"
>>>>>>> 33889bb2b62db77fb5eb29fd006ebc5431867846
  }
];
