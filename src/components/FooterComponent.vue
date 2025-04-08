<template lang="">
    <div>
        <footer class="mt-5 glass-nav">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3">
                        <img src="/assets/images/logo-sf.png" alt="" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-6 col-lg-2">
                        <h3>Menu</h3>
                        <ul class="list-unstyled">
                            <li @click="navigateTo('/about')">About</li>
                            <li @click="navigateTo('/event')">Event</li>
                            <li @click="navigateTo('/gallery')">Gallery</li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <h3>Contact</h3>
                        <ul class="list-unstyled">
                            <li class="d-flex gap-2">
                                <i class="fa-solid fa-location-dot mt-1"></i>
                                <p>Jl. Sukanagara No.22, Antapani Kidul, Kec. Antapani, Kota Bandung, Jawa Barat 40291</p>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fa-solid fa-phone mt-1"></i>
                                <p @click="navigateTo('https://wa.me/6281220659919')">+62812-2065-9919</p>
                            </li>
                            <li class="d-flex gap-2">
                                <i class="fa-solid fa-envelope mt-1"></i>
                                <div class="d-flex flex-column">
                                    <p @click="navigateTo('mailto:info@sindoip.com')">info@sindoip.com</p>
                                    <p @click="navigateTo('mailto:marketing@sindoip.com')">marketing@sindoip.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <h3>Follow Us</h3>
                        <div class="social-media d-flex gap-3">
                            <p @click="navigateTo('https://www.instagram.com/students_fest/')"><i class="fa-brands fa-instagram fa-xl"></i></p>
                            <p @click="navigateTo('https://www.tiktok.com/@studentsfest?_t=ZS-8vLjmZMT1ct&_r=1')"><i class="fa-brands fa-tiktok fa-xl"></i></p>
                            <p @click="navigateTo('https://www.facebook.com/sindoip/')"><i class="fa-brands fa-facebook fa-xl"></i></p>
                        </div>
                    </div>
                    <div class="copyright mt-4">
                        <p class="text-center"> &copy; 2025 All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  const externalSchemes = ['https://', 'http://', 'mailto:', 'tel:'];
  
  // Periksa apakah path termasuk skema eksternal
  const isExternal = externalSchemes.some(scheme => path.startsWith(scheme));

  if (isExternal) {
    // Navigasi ke URL eksternal menggunakan window.location.href
    window.location.href = path;
  } else {
    // Navigasi internal menggunakan router.push
    router.push(path);
  }
};
</script>

<style scoped>
.glass-nav {
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1050;
    transition: background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
}

h3,
.list-unstyled a,
.copyright p {
    transition: color 0.3s ease-in-out;
}

.list-unstyled li {
    margin-bottom: 5px;
}

.list-unstyled a {
    text-decoration: none;
}

body.light-mode {
    --text-color: #000;
    --background-color: #fff;
}

body.dark-mode {
    --text-color: #fff;
    --background-color: #1a1a1a;
}

p, li {
    cursor: pointer;;
}
</style>
