<template>
    <nav class="navbar navbar-expand-lg sticky-top glass-nav">
        <div class="container">
            <RouterLink to="/" class="navbar-brand me-3">
                <img src="/assets/images/logo-sf.png" alt="Logo" height="70" class="d-inline-block align-text-top">
            </RouterLink>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                    <li class="nav-item px-0 px-lg-2">
                        <RouterLink to="/about" class="nav-link">About</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Kategori Lomba
                        </a>
                        <ul class="dropdown-menu">
                            <li v-for="kategori in kategoriLomba" :key="kategori.id">
                                <a class="dropdown-item" href="#" @click.prevent="filterByCategory(kategori.nama)">
                                    {{ kategori.nama }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown px-0 px-lg-2">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Jenjang
                        </a>
                        <ul class="dropdown-menu">
                            <li v-for="jenjangItem in jenjang" :key="jenjangItem.id">
                                <a class="dropdown-item" href="#" @click.prevent="filterByJenjang(jenjangItem.nama)">
                                    {{ jenjangItem.nama }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/event" class="nav-link">Event</RouterLink>
                    </li>
                    <li class="nav-item px-0 px-lg-2">
                        <RouterLink to="/gallery" class="nav-link">Gallery</RouterLink>
                    </li>
                    <li class="nav-item px-0 px-lg-2">
                        <RouterLink to="/juknis" class="nav-link">Juknis</RouterLink>
                    </li>
                </ul>
                <RouterLink to="/event" class="btn gradient-btn px-3">Daftar Sekarang</RouterLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from './../../firebaseConfig.js';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();

const kategoriLomba = ref([]);
const jenjang = ref([]);

const filterByCategory = (category) => {
    router.push({ path: '/event', query: { kategori: category } });
};

const filterByJenjang = (level) => {
    router.push({ path: '/event', query: { jenjang: level } });
};

// Fetch kategori dan jenjang dari database (simulasikan jika belum ada fungsi)
const fetchKategoriLomba = async () => {
    try {
        const q = query(collection(db, 'kategoriLomba'));
        const querySnapshot = await getDocs(q);
        kategoriLomba.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching kategori lomba:', error);
    }
};

const fetchJenjang = async () => {
    try {
        const q = query(collection(db, 'jenjang'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        jenjang.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching jenjang:', error);
    }
};

onMounted(() => {
    fetchKategoriLomba();
    fetchJenjang();
});
</script>

<style scoped>
.glass-nav {
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1050;
    transition: background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
}
.sticky-top.glass-nav.scrolled {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>
