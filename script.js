// Menjalankan semua skrip setelah konten halaman dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    setupLightbox();
    setupBackToTop();
    setupFormValidation();
    setupProductSelection();
});

/**
 * Mengatur fungsionalitas untuk lightbox galeri.
 * Fungsi ini hanya berjalan jika elemen lightbox ada di halaman.
 */
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // Keluar jika tidak ada lightbox di halaman ini

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = item.src;
            lightboxCaption.innerHTML = item.alt;
        });
    });

    const closeLightbox = () => lightbox.style.display = 'none';

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

/**
 * Mengatur fungsionalitas tombol "Pesan Sekarang" untuk mengisi form.
 */
function setupProductSelection() {
    // Tombol ini hanya ada di index.html, jadi kita cek keberadaannya.
    const orderButtons = document.querySelectorAll('.order-now-btn');
    const productSelect = document.getElementById('produk-pilihan');

    if (!orderButtons.length || !productSelect) return;

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // href="#form-pesan" pada link akan menangani scroll otomatis.
            const productValue = this.dataset.productValue;
            if (productValue) {
                // Atur nilai dropdown
                productSelect.value = productValue;
                // Picu event 'input' agar validasi real-time berjalan
                // dan menampilkan status 'success' (border hijau).
                productSelect.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    });
}

/**
 * Mengatur validasi formulir pemesanan secara interaktif.
 */
function setupFormValidation() {
    const form = document.getElementById('order-form');
    if (!form) return;

    const nameInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const productSelect = document.getElementById('produk-pilihan');

    // Fungsi untuk menampilkan error
    const showError = (input, message) => {
        const formControl = input.parentElement;
        formControl.classList.remove('input-success');
        formControl.classList.add('input-error');
        const errorElement = formControl.querySelector('.error-message');
        errorElement.innerText = message;
    };

    // Fungsi untuk menampilkan sukses
    const showSuccess = (input) => {
        const formControl = input.parentElement;
        formControl.classList.remove('input-error');
        formControl.classList.add('input-success');
        const errorElement = formControl.querySelector('.error-message');
        errorElement.innerText = '';
    };

    // Fungsi untuk validasi format email
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Fungsi untuk memeriksa setiap input
    const checkName = () => {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameInput, 'Nama tidak boleh kosong.');
            return false;
        }
        showSuccess(nameInput);
        return true;
    };

    const checkEmail = () => {
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'Email tidak boleh kosong.');
            return false;
        } else if (!isEmailValid(emailValue)) {
            showError(emailInput, 'Format email tidak valid.');
            return false;
        }
        showSuccess(emailInput);
        return true;
    };

    const checkProduct = () => {
        const productValue = productSelect.value;
        if (productValue === '') {
            showError(productSelect, 'Silakan pilih produk.');
            return false;
        }
        showSuccess(productSelect);
        return true;
    };

    // Event listener untuk submit form
    form.addEventListener('submit', function(e) {
        // Jalankan semua validasi sebelum mengirim
        const isFormValid = checkName() && checkEmail() && checkProduct();

        if (!isFormValid) {
            e.preventDefault(); // Hentikan pengiriman form jika tidak valid
        }
    });

    // Event listener untuk validasi real-time saat pengguna mengetik
    form.addEventListener('input', (e) => {
        switch (e.target.id) {
            case 'nama': checkName(); break;
            case 'email': checkEmail(); break;
            case 'produk-pilihan': checkProduct(); break;
        }
    });
}

/**
 * Mengatur fungsionalitas untuk tombol "Back to Top".
 */
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}