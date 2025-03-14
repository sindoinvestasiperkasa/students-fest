<template lang="">
    <div class="container">
      <div class="d-flex flex-column align-items-center text-center">
        <h1>Detail Event</h1>
        <img :src="dataEvent.gambar" alt="" class="rounded">
        <h1>{{ dataEvent.nama }}</h1>
        <p>{{ dataEvent.deskripsi }}</p>
        <p> <i class="fa-solid fa-calendar-days"></i> &nbsp; {{ formatDate(dataEvent.tanggalPelaksanaan) }}</p>
        <p> <i class="fa-solid fa-location-dot"></i> &nbsp; {{ dataEvent.kota }}</p>
        <p> <i class="fa-solid fa-people-group"></i> &nbsp; {{ Array.isArray(dataEvent.jenjang) ? dataEvent.jenjang.join(', ') : dataEvent.jenjang }}</p>
 <!-- Menampilkan harga hanya jika ada -->
 <p v-if="dataEvent.harga && dataEvent.harga > 0" class="fw-bold fs-3">{{ formatPrice(dataEvent.harga) }}</p>
    
    <!-- Tombol Daftar yang Mengarahkan ke Halaman Register Sesuai Kategori -->
    <RouterLink v-if="dataEvent.kategori === 'Singing'" :to="`/register/singing/${dataEvent.id}`" class="btn gradient-btn mt-3">
      Daftar Singing Competition
    </RouterLink>

    <RouterLink v-else-if="dataEvent.kategori === 'E-Sports'" :to="`/register/e-sports/${dataEvent.id}`" class="btn gradient-btn mt-3">
      Daftar E-sport Tournament
    </RouterLink>

    <RouterLink v-else-if="dataEvent.kategori === 'SOC'" :to="`/register/soc/${dataEvent.id}`" class="btn gradient-btn mt-3">
      Daftar Student Online Competition
    </RouterLink>

    <RouterLink v-else-if="dataEvent.kategori === 'Mewarnai'" :to="`/register/mewarnai/${dataEvent.id}`" class="btn gradient-btn mt-3">
      Daftar Drawing Competition
    </RouterLink>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from './../../../../firebaseConfig.js';
  
  // Mengambil ID event dari route params
  const route = useRoute();
  const eventId = ref(route.params.id);
  
  // State untuk menyimpan detail event
  const dataEvent = ref({});
  
  // Fungsi untuk memformat tanggal
  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid date";
    const date = timestamp.toDate(); // Konversi dari Firestore Timestamp ke Date
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  
  // Fungsi untuk memformat harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };
  
  // Fungsi untuk mengambil data event berdasarkan ID
  const fetchDataEvent = async () => {
    try {
      const docRef = doc(db, "dataEvent", eventId.value); // Mengakses dokumen berdasarkan ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        dataEvent.value = { id: docSnap.id, ...docSnap.data() };
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  
  // Panggil fetchDataEvent saat komponen dimuat
  onMounted(() => {
    fetchDataEvent();
  });
  </script>
  
  <style lang="">
  /* Tambahkan gaya jika diperlukan */
  </style>
  