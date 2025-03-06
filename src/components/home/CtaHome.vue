<template lang="">
  <div class="container text-center padding-cta">
    <h3>Jangan lewatkan kesempatan ini, daftarkan dirimu sekarang!</h3>
    <h1 class="fw-bold">TOTAL HADIAH</h1>
    <h1 class="fw-bold text-total fs-1 animate-total">Rp 50.000.000,-</h1>
    <RouterLink to="/event" class="btn gradient-btn mt-3">Daftar Sekarang</RouterLink>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.padding-cta {
padding: 50px 0;
}

.text-total {
background: linear-gradient(to right, #ffbf00, #00ff44);
background-clip: text;
-webkit-text-fill-color: transparent;
font-weight: bold;
text-transform: uppercase;
}

/* Animasi berdenyut */
@keyframes pulse {
0%, 100% {
  transform: scale(1);
}
50% {
  transform: scale(1.1);
}
}

/* Kelas untuk animasi */
.animate-total {
animation: pulse 1.5s infinite ease-in-out;
}
</style>
