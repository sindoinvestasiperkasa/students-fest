<template lang="">
    <div class="container height-hero">
        <div class="row d-flex align-items-center mt-4 mt-md-2 mt-lg-2 height-hero">
            <div class="col-12 mt-3 mt-lg-0">
                <img src="/assets/images/SF-1.jpg" alt="Hero Image" class="rounded object-fit-cover">
            </div>
        </div>
    </div>      
</template>
<script>
export default {
    
}
</script>
<style scoped>
.padding-hero {
    padding: 25px 0;
}

@media screen and (min-width: 1240px) {
    .padding-hero {
        padding: 50px 0;
    }

    .object-fit-cover {
        object-fit: cover;
        width: 100%;
        height: 80vh;
    }

    .height-hero {
        height: 90vh;
    }
}
</style>