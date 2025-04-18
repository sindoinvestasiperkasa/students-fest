<template>
    <div>
        <HeaderComponent />

        <!-- {{ dataPeserta }} -->

        <div class="container">
            <!-- filter -->
            <div class="row mt-5 mb-3">
                <div class="col-6">
                    <input type="text" class="form-control shadow-sm" placeholder="Cari Peserta" v-model="searchQuery">
                </div>
                <div class="col-6">
                    <select class="form-select" aria-label="Default select example" v-model="filters.kategoriLomba">
                        <option selected value="">-Pilih Kategori-</option>
                        <option v-for="data in kategori" :key="data.id" :value="data.nama">{{ data.nama }}</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <label>Mulai Pembayaran</label>
                    <input type="date" class="form-control shadow-sm" v-model="filters.startDate">
                </div>
                <div class="col-6">
                    <label>Akhir Pembayaran</label>
                    <input type="date" class="form-control shadow-sm" v-model="filters.endDate">
                </div>
            </div>

            <!-- total peserta -->
            <div class="row mb-3">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-center">Total Peserta: <span class="fw-bold text-primary">{{ filteredPeserta.length }}</span></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">No. Telpon</th>
                            <th scope="col">Nama Lomba</th>
                            <th scope="col">Kategori Lomba</th>
                            <th scope="col">Waktu Pembayaran</th>
                            <th scope="col">Status Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in filteredPeserta" :key="data.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ data.pembayaran.firstName }} {{ data.pembayaran.lastName }}</td>
                            <td>{{ data.pembayaran.email }}</td>
                            <td>{{ data.pembayaran.phone }}</td>
                            <td>{{ data.pembayaran.eventName }}</td>
                            <td>{{ data.kategoriLomba.kategoriLomba }}</td>
                            <td>{{ new Date(data.pembayaran.transactionTime).toLocaleString() }}</td>
                            <td class="text-success">{{ data.pembayaran.transactionStatus }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../../firebaseConfig.js';
import { 
    collection, 
    getDocs, 
    query, 
    where,
    getDoc,
    doc,
    orderBy
} from 'firebase/firestore';

const dataPeserta = ref([]);
const searchQuery = ref('');
const filters = ref({
  kategoriLomba: '',
  startDate: '',
  endDate: ''
});

const kategori = ref('');

const fetchKategori = async () => {
    const kategoryiQuery = query(collection(db, 'kategoriLomba'));
    const kategoriSnapshot = await getDocs(kategoryiQuery);

    kategori.value = kategoriSnapshot.docs.map((kategori) => ({
        id: kategori.id,
        ...kategori.data()
    }));
}

const pembayarans = ref([]);
const pembayaran = async () => {
    const pembayaranQuery = query(
        collection(db, 'pembayaran'),
        where('transactionTime', '>=', '2025-04-01 00:00:00')
    );

   const pembayaranSnapshot = await getDocs(pembayaranQuery);

    pembayarans.value = pembayaranSnapshot.docs.map((p) => ({
        id: p.id,
        ...p.data()
    }))
    console.log("pembayaranSnapshot", pembayarans);
    
}

const fetchDataPeserta = async () => {
    try {
        // Ambil semua peserta
        const pesertaQuery = query(collection(db, 'dataSiswa'));
        const pesertaSnapshot = await getDocs(pesertaQuery);

        // Mapping peserta untuk mengambil email
        const pesertaData = await Promise.all(
            pesertaSnapshot.docs.map(async (pesertaDoc) => {
                const peserta = { id: pesertaDoc.id, ...pesertaDoc.data() };

                // 1️⃣ Cari data pembayaran berdasarkan email peserta
                const pembayaranQuery = query(
                    collection(db, 'pembayaran'),
                    where('email', '==', peserta.email)
                );
                const pembayaranSnapshot = await getDocs(pembayaranQuery);

                // Ambil data pembayaran jika ada
                const pembayaranData = pembayaranSnapshot.docs.map((p) => ({
                    id: p.id,
                    ...p.data()
                }));

                // Pilih pembayaran pertama jika ada
                const pembayaran = pembayaranData.length > 0 ? pembayaranData[0] : null;

                // 2️⃣ Cari data kategori lomba berdasarkan **eventId** (Document ID)
                let kategoriLomba = null;

                if (pembayaran?.eventId) {
                    try {
                        console.log("eventId:", pembayaran.eventId);

                        // Ambil dokumen berdasarkan eventId sebagai document ID
                        const kategoriDocRef = doc(db, "dataEvent", pembayaran.eventId);
                        const kategoriDocSnap = await getDoc(kategoriDocRef);

                        if (kategoriDocSnap.exists()) {
                            kategoriLomba = { id: kategoriDocSnap.id, kategoriLomba: kategoriDocSnap.data().kategori };
                        } else {
                            console.warn("Document kategoriLomba tidak ditemukan:", pembayaran.eventId);
                        }
                    } catch (err) {
                        console.error("Error fetching kategoriLomba:", err);
                    }
                }

                // Gabungkan data peserta dengan pembayaran dan kategori lomba
                return {
                    ...peserta,
                    pembayaran, // Data pembayaran (bisa null)
                    kategoriLomba, // Data kategori lomba (bisa null)
                };
            })
        );

        // Simpan hasil ke variabel dataPeserta
        dataPeserta.value = pesertaData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const filteredPeserta = computed(() => {
  return dataPeserta.value.filter((event) => {
    if (
      filters.value.kategoriLomba &&
      event.kategoriLomba?.kategoriLomba !== filters.value.kategoriLomba
    ) {
      return false;
    }

    if (
      searchQuery.value &&
      !(`${event.pembayaran?.firstName || ''} ${event.pembayaran?.lastName || ''} ${event.pembayaran?.email || ''}`
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()))
    ) {
      return false;
    }

    // Filter berdasarkan tanggal pembayaran
    const transaksiTime = event.pembayaran?.transactionTime;
    if (transaksiTime) {
      const transaksiDate = new Date(transaksiTime);

      if (filters.value.startDate && new Date(filters.value.startDate) > transaksiDate) {
        return false;
      }

      if (filters.value.endDate && new Date(filters.value.endDate) < transaksiDate) {
        return false;
      }
    }

    return true;
  });
});


onMounted( () => {
    fetchKategori();
    fetchDataPeserta();
    pembayaran();
} )
</script>
<style lang="">
    
</style>