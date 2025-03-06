<template lang="">
    <div class="container my-0 my-lg-5">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
            <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                    >
                    Kategori Lomba
                    </button>
                </h2>
                <div
                    id="panelsStayOpen-collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                >
                    <div class="accordion-body">
                        <ul class="list-group px-1">
                            <li class="list-group-item" v-for="kategori in kategoriLomba" :key="kategori.id">
                                <input 
                                    class="form-check-input me-2" 
                                    type="checkbox" 
                                    :value="kategori.nama" 
                                    v-model="filters.kategoriLomba"
                                />
                                <label class="form-check-label">{{ kategori.nama }}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                    >
                    Jenjang
                    </button>
                </h2>
                <div
                    id="panelsStayOpen-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                >
                    <div class="accordion-body">
                        <ul class="list-group px-1">
                            <li class="list-group-item" v-for="jenjangItem in jenjang" :key="jenjangItem.id">
                                <input 
                                    class="form-check-input me-2" 
                                    type="checkbox" 
                                    :value="jenjangItem.nama" 
                                    v-model="filters.jenjang"
                                />
                                <label class="form-check-label">{{ jenjangItem.nama }}</label>
                            </li>

                        </ul>
                    </div>
                </div>
                </div>
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                    <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                    >
                    Kota/Kab
                    </button>
                </h2>
                <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                >
                    <div class="accordion-body">
                        <ul class="list-group px-1">
                            <li class="list-group-item" v-for="kota in kota" :key="kota.id">
                                <input 
                                    class="form-check-input me-2" 
                                    type="checkbox" 
                                    :value="kota.nama" 
                                    v-model="filters.kota"
                                />
                                <label class="form-check-label">{{ kota.nama }}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                    <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFour"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFour"
                    >
                    Tingkat
                    </button>
                </h2>
                <div
                    id="panelsStayOpen-collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                >
                    <div class="accordion-body">
                        <ul class="list-group px-1">
                            <li class="list-group-item" v-for="tingkatItem in tingkatLomba" :key="tingkatItem.id">
                                <input 
                                    class="form-check-input me-2" 
                                    type="checkbox" 
                                    :value="tingkatItem.nama" 
                                    v-model="filters.tingkat"
                                />
                                <label class="form-check-label">{{ tingkatItem.nama }}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="col-12 col-md-6 col-lg-9">
                <div class="col-12 mt-3">
                    <input type="text" class="form-control" placeholder="Cari Event" v-model="searchQuery">
                </div>

                <!-- Filtered Events -->
                <div v-if="filteredEvents.length > 0" class="row">
                    <div class="col-12 col-md-6 col-lg-4 mt-3" v-for="event in filteredEvents" :key="event.id">
                        <div class="card h-100">
                            <img :src="event.gambar" class="card-img-top" alt="Event Image">
                            <span class="badge text-bg-warning position-absolute top-0 end-0">{{ event.kategori }}</span>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title mb-2 text-uppercase">{{ event.nama }}</h5>
                                <p class="card-text flex-grow-1">{{ event.deskripsiPendek }}</p>
                                <div class="row align-items-center">
                                    <div class="col-1">
                                        <i class="fa-solid fa-calendar-days me-2"></i>
                                    </div>
                                    <div class="col-10">
                                        {{ formatDate(event.tanggalPelaksanaan) }}
                                    </div>
                                </div>
                                <div class="row align-items-center mt-2">
                                    <div class="col-1">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div class="col-10">
                                        {{ event.kota }}
                                    </div>
                                </div>
                                <p class="fw-bold mt-2">{{ convertToRupiah(event.harga) }}</p>
                                <RouterLink :to="`/event/${event.id}`" class="btn gradient-btn mt-auto">Lihat Detail</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="col-12 mt-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="text-muted mb-0">Event tidak ditemukan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { db } from './../../../firebaseConfig.js';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const dataEvents = ref([]);
const kategoriLomba = ref([]);
const jenjang = ref([]);
const kota = ref([]);
const tingkatLomba = ref([]);

const filters = ref({
  kategoriLomba: [],
  jenjang: [],
  tingkat: [],
  kota: [],
  tanggalPelaksanaan: null,
});

const searchQuery = ref('');

const route = useRoute();

const convertToDateInputFormat = (timestamp) => {
  // Konversi dari Firestore Timestamp ke objek Date
  const date = new Date(timestamp);

  // Format menjadi 'DD-MM-YYYY'
  const day = String(date.getDate()).padStart(2, '0'); // Tambahkan leading zero
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan leading zero
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const fetchDataEvents = async () => {
    try {
        const q = query(collection(db, 'dataEvent'), orderBy('order'));
        const querySnapshot = await getDocs(q);
        dataEvents.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const fetchKategoriLomba = async () => {
    try {
        const q = query(collection(db, 'kategoriLomba'));
        const querySnapshot = await getDocs(q);
        kategoriLomba.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const fetchJenjang = async () => {
    try {
        const q = query(collection(db, 'jenjang'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        jenjang.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const fetchKota = async () => {
    try {
        const q = query(collection(db, 'kotaKabupaten'));
        const querySnapshot = await getDocs(q);
        kota.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const fetchTingkatLomba = async () => {
    try {
        const q = query(collection(db, 'tingkatLomba'), orderBy('order'));
        const querySnapshot = await getDocs(q);
        tingkatLomba.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const syncFiltersWithQuery = () => {
  // Sinkronkan query parameter ke filters
  if (route.query.kategori) {
    if (!filters.value.kategoriLomba.includes(route.query.kategori)) {
      filters.value.kategoriLomba.push(route.query.kategori);
    }
  }

  if (route.query.jenjang) {
    if (!filters.value.jenjang.includes(route.query.jenjang)) {
      filters.value.jenjang.push(route.query.jenjang);
    }
  }

  if (route.query.kota) {
    if (!filters.value.kota.includes(route.query.kota)) {
      filters.value.kota.push(route.query.kota);
    }
  }

  if (route.query.tingkat) {
    if (!filters.value.tingkat.includes(route.query.tingkat)) {
      filters.value.tingkat.push(route.query.tingkat);
    }
  }
};

const filteredEvents = computed(() => {
  return dataEvents.value.filter((event) => {
    // Filter kategori lomba
    if (
      filters.value.kategoriLomba.length > 0 &&
      !filters.value.kategoriLomba.includes(event.kategori)
    ) {
      return false;
    }

    // Filter jenjang (support nilai array)
    if (filters.value.jenjang.length > 0) {
      if (Array.isArray(event.jenjang)) {
        if (!event.jenjang.some((jenjang) => filters.value.jenjang.includes(jenjang))) {
          return false;
        }
      } else if (!filters.value.jenjang.includes(event.jenjang)) {
        return false;
      }
    }

    // Filter tingkat
    if (
      filters.value.tingkat.length > 0 &&
      !filters.value.tingkat.includes(event.tingkat)
    ) {
      return false;
    }

    // Filter kota
    if (
      filters.value.kota.length > 0 &&
      !filters.value.kota.includes(event.kota)
    ) {
      return false;
    }

    // Konversi tanggal dari database ke format input tanggal
    const formattedEventDate = convertToDateInputFormat(event.tanggalPelaksanaan);

    // Filter tanggal pelaksanaan
    if (
      filters.value.tanggalPelaksanaan &&
      formattedEventDate !== filters.value.tanggalPelaksanaan
    ) {
      return false;
    }

    // Pencarian
    if (
      searchQuery.value &&
      !event.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
});

const convertToRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

const formatDate = (timestamp) => {
  if (!timestamp) return "Invalid date";
  const date = timestamp.toDate(); // Konversi dari Firestore Timestamp ke Date
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
};

onMounted(() => {
    fetchDataEvents();
    fetchKategoriLomba();
    fetchJenjang();
    fetchKota();
    fetchTingkatLomba();
    syncFiltersWithQuery();
})
</script>

<style scoped>
.accordion-body {
    padding: 1rem 0;
}
</style>
  