const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a'); // Seleksi semua tautan di dalam menu

hamburger.addEventListener('click', function () {
    // Toggle ikon antara 'bx-menu' dan 'bx-x'
    if (hamburger.classList.contains('bx-menu')) {
        hamburger.classList.remove('bx-menu');
        hamburger.classList.add('bx-x');
    } else {
        hamburger.classList.remove('bx-x');
        hamburger.classList.add('bx-menu');
    }

    // Tampilkan atau sembunyikan menu
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

// Tambahkan event listener pada setiap tautan di dalam menu
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Sembunyikan menu
        menu.classList.add('hidden');
        menu.classList.remove('flex');

        // Kembalikan ikon ke 'bx-menu'
        hamburger.classList.remove('bx-x');
        hamburger.classList.add('bx-menu');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ambil semua elemen navbar
    const navLinks = document.querySelectorAll(".nav-link");
    const homeLink = document.querySelector(".nav-link-active"); // Tautan "Home"
    const logoLink = document.querySelector("a.w-16"); // Logo toko
  
    // Saat halaman dimuat, arahkan ke bagian atas (#)
    if (window.location.hash !== "#") {
      window.location.href = "#";
    }
  
    // Tambahkan event listener untuk setiap elemen navbar
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Hapus active class dari semua link
        navLinks.forEach((item) => item.classList.remove("nav-link-active"));
  
        // Tambahkan active class ke link yang diklik
        this.classList.add("nav-link-active");
      });
    });
  
    // Tambahkan event listener ke logo toko
    logoLink.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah perilaku default tautan
      // Hapus active class dari semua link
      navLinks.forEach((item) => item.classList.remove("nav-link-active"));
  
      // Tambahkan active class hanya ke "Home"
      homeLink.classList.add("nav-link-active");
  
      // Scroll ke atas halaman
      window.location.href = "#";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          const navHeight = document.querySelector("nav").offsetHeight; // Dapatkan tinggi navbar

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - navHeight, // Kurangi tinggi navbar
                  behavior: "smooth"
              });
          }
      });
  });




    function openModalImage(imageSrc) {
      console.log("Modal Gambar Dibuka:", imageSrc); // Debugging
      document.getElementById("modalImage").src = imageSrc;
      document.getElementById("imageModal").classList.remove("hidden");
  }
  
  function closeModalImage() {
      console.log("Modal Gambar Ditutup"); // Debugging
      document.getElementById("imageModal").classList.add("hidden");
  }
  
  
  function openModalProduct(productName, productImage) {
        console.log("Modal Produk Dibuka:", productName);

        document.getElementById("modalProductName").innerText = productName;
        document.getElementById("modalProductImage").src = productImage; // Tambahkan ini!
        document.getElementById("buyModal").classList.remove("hidden");
    }


    function closeModalProduct() {
        console.log("Modal Produk Ditutup"); // Debugging
        document.getElementById("buyModal").classList.add("hidden");
    }

    document.addEventListener("DOMContentLoaded", function () {
        // DATA PRODUK
        const products = [
            { id: 1, name: "Hanasui Collagen Water Sunscreen SPF 30 PA++++ 30ml", category: "sunscreen", price: 19600, discount: true, oldPrice: 28000, sold: 25, image: "img/produkimg1.webp" },
            { id: 2, name: "Wardah Lightening Powder Light Feel Refill | Two Way Cake Bedak", category: "kosmetik", price: 32100, discount: true, oldPrice: 42100, sold: 10, image: "img/produkimg2.webp" },
            { id: 3, name: "Parfum IZZI Korean Spray Gyeongbok Palace 150 ml", category: "parfum", price: 16000, discount: false, oldPrice: null, sold: 25, image: "img/produkimg3.webp" },
            { id: 4, name: "Parfum IZZI Fine Fragrance 150ml", category: "parfum", price: 22000, discount: false, oldPrice: null, sold: 5, image: "img/produkimg4.webp" },
            { id: 5, name: "Bando Karakter Telinga Hewan Bulu Halus", category: "aksesoris", price: 5000, discount: true, oldPrice: 6000, sold: 22, image: "img/produkimg5.jpg" },
            { id: 6, name: "OMG Coverlast Two way Cake 12g - Bedak Padat", category: "kosmetik", price: 26000, discount: true, oldPrice: 30000, sold: 14, image: "img/produkimg6.jpeg" },
            { id: 7, name: "OMG Booster UV Barrier Sunscreen SPF 50 PA++++", category: "sunscreen", price: 26000, discount: true, oldPrice: 30000, sold: 28, image: "img/produkimg7.webp" },
        ];
    
        let currentPage = 1;
        const itemsPerPage = 4;
    
        // Ambil elemen dari DOM
        const productContainer = document.getElementById("productContainer");
        const searchInput = document.getElementById("searchInput");
        const categoryFilter = document.getElementById("categoryFilter");
        const paginationNumbers = document.getElementById("paginationNumbers");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
    
        if (!productContainer || !searchInput || !categoryFilter || !paginationNumbers || !prevBtn || !nextBtn) {
            console.error("Satu atau lebih elemen tidak ditemukan di DOM.");
            return;
        }
    
        // Event Listener untuk filter
        searchInput.addEventListener("input", filterProducts);
        categoryFilter.addEventListener("change", filterProducts);
    
        function filterProducts() {
            currentPage = 1; // Reset ke halaman pertama saat filter diubah
            displayProducts();
        }
    
        function displayProducts() {
            productContainer.innerHTML = "";
    
            const searchQuery = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
    
            // Filter produk berdasarkan kategori dan pencarian
            let filteredProducts = products.filter(p => 
                (selectedCategory === "all" || p.category === selectedCategory) &&
                p.name.toLowerCase().includes(searchQuery)
            );

            const noResultsMessage = document.getElementById("noResultsMessage");

            if (filteredProducts.length === 0) {
                noResultsMessage.classList.remove("hidden");
            } else {
                noResultsMessage.classList.add("hidden");
            }
    
            console.log("Filtered Products:", filteredProducts); // Debugging
    
            // Hitung total halaman
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            currentPage = Math.min(currentPage, totalPages) || 1;
    
            // Potong produk berdasarkan halaman saat ini
            const start = (currentPage - 1) * itemsPerPage;
            const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);
    
            // Render produk
            paginatedProducts.forEach(product => {
                productContainer.innerHTML += `
                    <div class="relative bg-white rounded-xl border md:p-3 p-2 md:h-[400px] h-auto flex flex-col justify-between font-montserrat">
                        <span class="absolute md:top-4 md:left-4 top-3 left-3 bg-orange-400 text-white md:text-xs text-[9px] md:px-2 md:py-1 px-[4px] py-[2px] font-medium md:rounded-md rounded-[6px]">
                            ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                        ${product.discount ? `<span class="absolute md:top-4 md:right-4 top-3 right-3 bg-red-600 text-white md:text-xs text-[9px] font-medium md:px-2 md:py-1 px-[4px] py-[2px] md:rounded-md rounded-[6px]">Diskon</span>` : ''}
                        <img src="${product.image}" alt="${product.name}" class="w-auto h-36 md:w-auto md:h-56 object-cover mb-3 rounded-lg aspect-[4/3]" />
                        <h3 class="text-sm font-semibold text-[#45474B] mb-1 font-montserrat overflow-hidden text-ellipsis" style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical;">
                            ${product.name}
                        </h3>

                        <div class="flex justify-start items-center truncate md:overflow-visible md:whitespace-normal">
                            <!-- Harga di kiri -->
                            <span class="text-sm font-semibold text-[#379777] font-montserrat">
                                Rp ${product.price.toLocaleString()}
                            </span>

                            <!-- Harga coret di kanan -->
                            ${product.discount ? `
                                <span class="text-xs text-gray-400 line-through italic ml-2">
                                    Rp ${product.oldPrice.toLocaleString()}
                                </span>
                            ` : ''}
                        </div>

                        <p class="text-xs text-gray-500 mt-2">Terjual: ${product.sold} pcs</p>

                        <button onclick="openModalProduct('${product.name}', '${product.image}')" class="mt-3 flex items-center justify-center gap-2 bg-[#379777] text-white font-medium md:px-4 md:py-2 px-[14px] py-[6px] rounded-lg md:text-xs text-[10px] font-montserrat transition-all duration-300 hover:bg-[#2E7562]">
                            <i class='md:block hidden bx bx-shopping-bag text-base'></i> Beli Sekarang
                        </button>
                    </div>
                `;
            });
    
            updatePagination(totalPages);
        }
    
        function updatePagination(totalPages) {
            paginationNumbers.innerHTML = "";
    
            for (let i = 1; i <= totalPages; i++) {
                let pageBtn = document.createElement("button");
                pageBtn.innerText = i;
                pageBtn.className = `w-8 h-8 rounded-lg transition duration-300 text-sm ${
                    i === currentPage ? 'bg-white text-[#379777]' : 'bg-[#379777] text-white hover:bg-white border-[1.5px] border-white hover:text-[#379777]'
                }`;
                pageBtn.onclick = function () { goToPage(i, totalPages); };
                paginationNumbers.appendChild(pageBtn);
            }
    
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage >= totalPages;
        }
    
        function goToPage(page, totalPages) {
            currentPage = Math.max(1, Math.min(page, totalPages));
            displayProducts();
        }
    
        prevBtn.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
            }
        });
    
        nextBtn.addEventListener("click", function () {
            let filteredProducts = products.filter(p => 
                (categoryFilter.value === "all" || p.category === categoryFilter.value) &&
                p.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
            }
        });
    
        // Panggil saat pertama kali
        displayProducts();
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        if (window.innerWidth < 768) {
          document.querySelectorAll('[data-aos-delay]').forEach(el => {
            el.removeAttribute('data-aos-delay');
          });
        }
      });