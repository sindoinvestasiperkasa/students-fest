<template lang="">
    <HeaderComponent />
    <div class="container">
      <div class="card my-4 text-center">
        <div class="card-header">
          <b>Data Event</b>
        </div>
        <div class="card-body">
          <h1>{{ dataEvent.nama }}</h1>
          <p>{{ dataEvent.deskripsi }}</p>
          <p> <i class="fa-solid fa-calendar-days"></i> &nbsp; {{ formatDate(dataEvent.akhirPendaftaran) }}</p>
          <p> <i class="fa-solid fa-location-dot"></i> &nbsp; {{ dataEvent.kota }}</p>
          <h1 class="fw-bold">{{ formatPrice(dataEvent.harga) }}</h1>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <b>Data Diri</b>
        </div>
        <div class="card-body">
          <div class="form-group mb-2">
            <input v-model="formDiri.email" type="email" class="form-control" placeholder="Email" required />
            <small class="text-danger">{{ errors.email }}</small>
          </div>
          <div class="form-group mb-2">
            <input v-model="formDiri.first_name" type="text" class="form-control" placeholder="Nama Depan" required />
            <small class="text-danger">{{ errors.first_name }}</small>
          </div>
          <div class="form-group mb-2">
            <input v-model="formDiri.last_name" type="text" class="form-control" placeholder="Nama Belakang" required />
            <small class="text-danger">{{ errors.last_name }}</small>
          </div>
          <div class="form-group mb-2">
            <input v-model="formDiri.phone" type="text" class="form-control" placeholder="Nomor Telepon" required />
            <small class="text-danger">{{ errors.phone }}</small>
          </div>
          <div class="form-group mb-2">
            <select class="form-select" aria-label="Default select example" v-model="formDiri.gender">
              <option value="" disabled selected>Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <small class="text-danger">{{ errors.gender }}</small>
          </div>
          <div class="form-group mb-2">
            <textarea v-model="formDiri.alamat" type="text" class="form-control" placeholder="Alamat" required></textarea>
            <small class="text-danger">{{ errors.alamat }}</small>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <b>Data Sekolah</b>
        </div>
        <div class="card-body">
          <!-- Provinsi -->
          <div class="form-group mb-2">
            <select
              class="form-select"
              v-model="formSekolah.provinsi"
            >
              <option value="" disabled selected>Provinsi</option>
              <option v-for="provinsi in dataProvinsi" :key="provinsi.id" :value="provinsi.id">
                {{ provinsi.nama }}
              </option>
            </select>
            <small class="text-danger">{{ errors.provinsi }}</small>
          </div>

          <!-- Kota -->
          <div class="form-group mb-2">
            <select
              class="form-select"
              v-model="formSekolah.kota"
            >
              <option value="" disabled selected>Kota / Kab</option>
              <option v-for="kota in dataKota" :key="kota.id" :value="kota.id">
                {{ kota.nama }}
              </option>
            </select>
            <small class="text-danger">{{ errors.kota }}</small>
          </div>

          <!-- Kecamatan -->
          <div class="form-group mb-2">
            <select
              class="form-select"
              v-model="formSekolah.kecamatan"
            >
              <option value="" disabled selected>Kecamatan</option>
              <option v-for="kecamatan in dataKecamatan" :key="kecamatan.id" :value="kecamatan.id">
                {{ kecamatan.nama }}
              </option>
            </select>
            <small class="text-danger">{{ errors.kecamatan }}</small>
          </div>

          <!-- Jenjang -->
          <div class="form-group mb-2">
            <select
              class="form-select"
              v-model="formSekolah.jenjang"
              @change="fetchDataTingkatKelas(formSekolah.jenjang)"
            >
              <option value="" disabled selected>Jenjang</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
            <small class="text-danger">{{ errors.jenjang }}</small>
          </div>

          <!-- Sekolah -->
          <div class="form-group mb-2">
            <select
              class="form-select"
              v-model="formSekolah.sekolah"
            >
              <option value="" disabled selected>Sekolah</option>
              <option v-for="sekolah in dataSekolahIndonesia" :key="sekolah.id" :value="sekolah.sekolah">
                {{ sekolah.sekolah }}
              </option>
            </select>
            <small class="text-danger">{{ errors.sekolah }}</small>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <b>Data Kelas</b>
        </div>
        <div class="card-body">
          <div class="form-group mb-2">
            <select class="form-select" aria-label="Default select example" v-model="formKelas.tahunAjaran">
              <option value="" disabled selected>Tahun Ajaran</option>
              <option v-for="tahunAjaran in dataTahunAjaran" :key="tahunAjaran.id" :value="tahunAjaran.tahun">{{ tahunAjaran.tahun }}</option>
            </select>
            <small class="text-danger">{{ errors.tahunAjaran }}</small>
          </div>

          <div class="form-group mb-2">
            <select class="form-select mb-2" aria-label="Default select example" v-model="formKelas.tingkatKelas">
              <option value="" disabled selected>Tingkat Kelas</option>
              <option v-for="tingkatKelas in dataTingkatKelas" :key="tingkatKelas.id" :value="tingkatKelas.id">{{ tingkatKelas.tingkat }}</option>
            </select>
            <small class="text-danger">{{ errors.tingkatKelas }}</small>
          </div>

          <input v-model="formKelas.namaKelas" type="text" class="form-control mb-2" placeholder="contoh: MIPA 1" />
        </div>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          <b>Data Akun</b>
        </div>
        <div class="card-body">
          <div class="form-group mb-2">
            <input type="email" class="form-control mb-2" :value="formDiri.email" placeholder="Email" autocomplete="email" required readonly />
            <small class="text-danger">{{ errors.email }}</small>
          </div>

          <div class="form-group mb-2">
            <input v-model="formAkun.password" type="text" class="form-control mb-2" placeholder="Password" autocomplete="new-password" required />
            <small class="text-danger">{{ errors.password }}</small>
          </div>

          <div class="form-group mb-2">
            <input v-model="formAkun.konfirmasiPassword" type="text" class="form-control mb-2" placeholder="Konfirmasi Password" autocomplete="new-password" required />
            <small class="text-danger">{{ errors.konfirmasiPassword }}</small>
          </div>
        </div>
      </div>

      <span @click="payNow" class="d-block p-2 text-bg-primary text-center btn gradient-btn mt-3">Bayar Sekarang</span>
    </div>
    <FooterComponent />
  </template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db, auth } from './../../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, addDoc, collection, getDocs, query, orderBy, getCountFromServer, writeBatch, where } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();

const eventId = ref(route.params.id);
const dataEvent = ref({});
const dataSekolah = ref([]);
console.log(dataSekolah);


// const dataProvinsi = ref([]);
// const dataKota = ref([]);
// const dataKecamatan = ref([]);
const jenjang = ref([]);
// const dataSekolahIndonesia = ref([]);

const dataTahunAjaran = ref([]);
const dataTingkatKelas = ref([]);

// Form Data Diri
const formDiri = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  gender: '',
  alamat: '',
});

// Form Data Sekolah
const formSekolah = ref({
  provinsi: '',
  kota: '',
  kecamatan: '',
  jenjang: '',
  sekolah: '',
});

// Form Data Kelas
const formKelas = ref({
  tahunAjaran: '',
  tingkatKelas: '',
  namaKelas: '',
});

// Form Data Akun
const formAkun = ref({
  password: '',
  konfirmasiPassword: '',
});

// Validasi
const errors = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: "",
  alamat: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  sekolah: "",
  jenjang: "",
  tahunAjaran: "",
  tingkatKelas: "",
  password: "",
  konfirmasiPassword: ""
});

const countDocuments = async () => {
  const colRef = collection(db, "dataSekolah"); // Ganti "namaKoleksi" dengan nama koleksi Anda
  const snapshot = await getCountFromServer(colRef);
  console.log(`Jumlah dokumen: ${snapshot.data().count}`);
};

// Computed properties for dropdown options
const dataProvinsi = computed(() => {
  const provinsiSet = new Set(dataSekolah.value.map(item => item.propinsi));
  return Array.from(provinsiSet).map(provinsi => ({
    id: provinsi,
    nama: provinsi
  }));
});

const dataKota = computed(() => {
  if (!formSekolah.value.provinsi) return [];
  const kotaSet = new Set(
    dataSekolah.value
      .filter(item => item.propinsi === formSekolah.value.provinsi)
      .map(item => item.kabupaten_kota)
  );
  return Array.from(kotaSet).map(kota => ({
    id: kota,
    nama: kota
  }));
});

const dataKecamatan = computed(() => {
  if (!formSekolah.value.kota) return [];
  const kecamatanSet = new Set(
    dataSekolah.value
      .filter(item => item.kabupaten_kota === formSekolah.value.kota)
      .map(item => item.kecamatan)
  );
  return Array.from(kecamatanSet).map(kecamatan => ({
    id: kecamatan,
    nama: kecamatan
  }));
});

const dataSekolahIndonesia = computed(() => {
  const { kecamatan, jenjang } = formSekolah.value;

  // Jika kecamatan atau jenjang tidak dipilih, kembalikan array kosong
  if (!kecamatan || !jenjang) return [];

  // Filter data berdasarkan kecamatan dan jenjang
  return dataSekolah.value.filter(
    item => item.kecamatan === kecamatan && item.bentuk === jenjang
  );
});

// Fetch dataSekolah once and save to localStorage
const fetchDataSekolah = async () => {
  const sekolahCollection = collection(db, 'dataSekolah');
  
  // Cek apakah data sudah ada di Firestore
  const snapshot = await getDocs(sekolahCollection);
  if (!snapshot.empty) {
    dataSekolah.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Using data from Firestore');
    return;
  } else {
    console.log('Fetching data from API...');
  
    // Jika tidak ada data di Firestore, fetch dari API
    let currentPage = 1;
    const perPage = 1000;
    const allData = [];
  
    try {
      while (allData.length <= 215372) {
        const response = await fetch(
          `https://api-sekolah-indonesia.vercel.app/sekolah?page=${currentPage}&perPage=${perPage}`,
        );
        const result = await response.json();
  
        if (!result.dataSekolah || result.dataSekolah.length === 0) break;
  
        allData.push(...result.dataSekolah);
        currentPage++;
      }
  
      console.log(`Fetched ${allData.length} records from API`);
  
      // Simpan data ke Firestore dalam batch
      for (let i = 0; i < allData.length; i += 500) {
        const batch = writeBatch(db);
        const chunk = allData.slice(i, i + 500); // Ambil chunk data (500 per batch)
  
        chunk.forEach(item => {
          const docRef = doc(
            sekolahCollection,
            item.id || `${item.nama.replace(/\s+/g, '_')}-${item.kecamatan.replace(/\s+/g, '_')}`
          );
          batch.set(docRef, item);
        });
  
        await batch.commit(); // Commit batch
        console.log(`Batch ${Math.floor(i / 500) + 1} committed`);
      }
  
      console.log('Data saved to Firestore');
  
      // Update `dataSekolah`
      dataSekolah.value = allData;
    } catch (error) {
      console.error('Error fetching or saving data:', error);
    }
  }

};

// Fungsi untuk mengambil data jenjang
const fetchDataJenjang = async () => {
  try {
    const q = query(collection(db, 'jenjang'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    jenjang.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
  }
}

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

const fetchdataEvent = async () => {
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
}

// Fungsi untuk mengambil data tahun ajaran
const fetchDataTahunAjaran = async () => {
  try {
    const q = query(collection(db, 'tahunAjaran'), orderBy('tahun', 'asc'));
    const querySnapshot = await getDocs(q);
    dataTahunAjaran.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
  }
}

// Fungsi untuk mengambil data tingkat kelas
const fetchDataTingkatKelas = async (jenjangId) => {
  try {
    const q = query(collection(db, 'tingkatKelas'), where('jenjang', '==', jenjangId), orderBy('tingkat', 'asc'));
    const querySnapshot = await getDocs(q);
    dataTingkatKelas.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching tingkat kelas:', error);
  }
};

onMounted(() => {
  fetchdataEvent();
  fetchDataJenjang();
  fetchDataTahunAjaran();
  fetchDataSekolah();
  countDocuments();
})

// Fungsi untuk melakukan validasi form
const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });

  // Validasi data diri
  if (!formDiri.value.first_name) {
    errors.value.first_name = "Nama depan wajib diisi.";
    isValid = false;
  }
  if (!formDiri.value.last_name) {
    errors.value.last_name = "Nama belakang wajib diisi.";
    isValid = false;
  }
  if (!formDiri.value.email) {
    errors.value.email = "Email wajib diisi.";
    isValid = false;
  }
  if (!formDiri.value.phone) {
    errors.value.phone = "Nomor telepon wajib diisi.";
    isValid = false;
  }
  if (!formDiri.value.gender) {
    errors.value.gender = "Jenis kelamin wajib diisi.";
    isValid = false;
  }
  if (!formDiri.value.alamat) {
    errors.value.alamat = "Alamat wajib diisi.";
    isValid = false;
  }

  // Validasi data sekolah
  if (!formSekolah.value.provinsi) {
    errors.value.provinsi = "Provinsi wajib dipilih.";
    isValid = false;
  }
  if (!formSekolah.value.kota) {
    errors.value.kota = "Kota wajib dipilih.";
    isValid = false;
  }
  if (!formSekolah.value.kecamatan) {
    errors.value.kecamatan = "Kecamatan wajib dipilih.";
    isValid = false;
  }
  if (!formSekolah.value.jenjang) {
    errors.value.jenjang = "Jenjang wajib dipilih.";
    isValid = false;
  }
  if (!formSekolah.value.sekolah) {
    errors.value.sekolah = "Sekolah wajib dipilih.";
    isValid = false;
  }

  // Validasi data kelas
  if (!formKelas.value.tahunAjaran) {
    errors.value.tahunAjaran = "Tahun ajaran wajib dipilih.";
    isValid = false;
  }
  if (!formKelas.value.tingkatKelas) {
    errors.value.tingkatKelas = "Tingkat kelas wajib dipilih.";
    isValid = false;
  }

  // Validasi data akun
  if (!formAkun.value.password) {
    errors.value.password = "Password wajib diisi.";
    isValid = false;
  }
  if (!formAkun.value.konfirmasiPassword) {
    errors.value.konfirmasiPassword = "Konfirmasi password wajib diisi.";
    isValid = false;
  }
  if (formAkun.value.password !== formAkun.value.konfirmasiPassword) {
    errors.value.konfirmasiPassword = "Password dan konfirmasi password tidak cocok.";
    isValid = false;
  }

  return isValid;
};

const payNow = async () => {
  try {
    // Lakukan validasi terlebih dahulu
    if (!validateForm()) {
      return; // Jika validasi gagal, hentikan eksekusi
    }

    // Kirim request ke backend untuk mendapatkan transaction token
    const response = await fetch('http://localhost:3001/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        amount: dataEvent.value.harga,
        customerDetails: {
          first_name: formDiri.value.first_name,
          last_name: formDiri.value.last_name,
          email: formDiri.value.email,
          phone: formDiri.value.phone,
          billing_address: {
            first_name: formDiri.value.first_name,
            last_name: formDiri.value.last_name,
            email: formDiri.value.email,
            phone: formDiri.value.phone,
            address: formDiri.value.alamat,
          },
        },
        itemDetails: {
          id: dataEvent.value.id,
          name: dataEvent.value.nama,
          price: dataEvent.value.harga,
          quantity: 1,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response:', result);

    // Panggil Snap dengan token yang diterima
    if (result.transactionToken) {
        window.snap.pay(result.transactionToken, {
          onSuccess: async function (result) {
            console.log('Success:', result);
            try {
              const paymentData = {
                firstName: formDiri.value.first_name,
                lastName: formDiri.value.last_name,
                email: formDiri.value.email,
                phone: formDiri.value.phone,
                gender: formDiri.value.gender,
                address: formDiri.value.alamat,
                eventId: dataEvent.value.id,
                eventName: dataEvent.value.nama,
                orderId: result.order_id,
                amount: result.gross_amount,
                transactionStatus: result.transaction_status,
                paymentType: result.payment_type,
                transactionTime: result.transaction_time,
              };

              const paymentDocRef = collection(db, 'pembayaran');
              await addDoc(paymentDocRef, paymentData);
              console.log('Successfully saved payment data:', paymentData);

              // Kirim email konfirmasi ke pelanggan
              const emailResponse = await fetch('http://localhost:3001/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: formDiri.value.email,
                  subject: `Bukti Pembayaran untuk ${dataEvent.value.nama}`,
                  text: `Halo ${formDiri.value.first_name} ${formDiri.value.last_name},\n\nTerima kasih telah mendaftar di event ${dataEvent.value.nama}.\n\nDetail Diri:\n- Nama Event: ${dataEvent.value.nama}\n- Harga: Rp ${dataEvent.value.harga}\n- ID Pesanan: ${result.order_id}\n- pdf: ${result.pdf_url}\n\nSalam,\nTim SINDO-IP`,
                }),
              });

              if (!emailResponse.ok) {
                throw new Error(`Failed to send email! Status: ${emailResponse.status}`);
              }

              console.log('Email sent successfully');
              
              // Simpan data siswa
              const dataSiswa = {
                nama: formDiri.value.first_name,
                email: formDiri.value.email,
                phone: formDiri.value.phone,
                alamat: formDiri.value.alamat,
                provinsi: formSekolah.value.provinsi,
                kota: formSekolah.value.kota,
                kecamatan: formSekolah.value.kecamatan,
                jenjang: formSekolah.value.jenjang,
                sekolah: formSekolah.value.sekolah,
                tahunAjaran: formKelas.value.tahunAjaran,
                tingkatKelas: formKelas.value.tingkatKelas,
                namaKelas: formKelas.value.namaKelas,
                password: formAkun.value.password,
                statusSiswa: 'Siswa',
                createdAt: new Date().toISOString(),
              };

              const siswaDocRef = collection(db, 'dataSiswa');
              await addDoc(siswaDocRef, dataSiswa);
              await createUserWithEmailAndPassword(auth, formDiri.value.email, formAkun.value.password);
              console.log('Successfully saved siswa data:', dataSiswa);

              router.push('/event');
            } catch (error) {
              console.error('Error saving payment data:', error);
            }
          },
          onPending: async function (result) {
            const emailResponse = await fetch('http://localhost:3001/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: formDiri.value.email,
                  subject: `Tagihan Pembayaran untuk ${dataEvent.value.nama}`,
                  text: `Halo ${formDiri.value.first_name} ${formDiri.value.last_name},\n\nTerima kasih telah mendaftar di event ${dataEvent.value.nama}.\n\nDetail Diri:\n- Nama Event: ${dataEvent.value.nama}\n- Harga: Rp ${dataEvent.value.harga}\n- ID Pesanan: ${result.order_id}\n- Link Pembayaran: ${result.transactionUrl}\n- Token: ${result.transactionToken}\n\nSalam,\nTim SINDO-IP`,
                }),
              });

              if (!emailResponse.ok) {
                throw new Error(`Failed to send email! Status: ${emailResponse.status}`);
              }

              console.log('Email sent successfully');
          },
          onError: function (result) {
            console.log('Error:', result);
            alert('Payment Failed');
          },
          onClose: function () {
            alert('Payment popup closed');
          },
        });
      } else {
        console.error('Transaction token not found in response:', result);
      }
  } catch (error) {
    console.error('Error processing payment:', error);
  }
};

</script>

<style scoped>

</style>