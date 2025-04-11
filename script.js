// Modern Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  // Bottom Navigation Active State
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

  // Function to set active tab based on ID
  function setActiveTab(tabId) {
    // Remove active class from all items
    bottomNavItems.forEach((navItem) => {
      navItem.classList.remove('active');
    });

    // Add active class to specified tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add('active');
      // Save active tab ID to localStorage
      localStorage.setItem('activeTabId', tabId);
    }
  }

  // Get current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Always set home tab as active when page is reloaded
  // Use sessionStorage to detect page reload
  const pageAccessedByReload =
    sessionStorage.getItem('pageReloaded') === 'true';
  sessionStorage.setItem('pageReloaded', 'true');

  // Set active tab based on page reload status
  if (pageAccessedByReload) {
    // If page is reloaded, always set home tab as active
    setActiveTab('home-nav');
  } else {
    // If not a reload, set tab based on current page
    if (currentPage === 'index.html') {
      setActiveTab('home-nav');
    } else if (currentPage === 'baogiaAI.html') {
      setActiveTab('products-nav');
    } else {
      // For other pages, check if we have a saved tab
      const savedTabId = localStorage.getItem('activeTabId');
      if (savedTabId) {
        setActiveTab(savedTabId);
      } else {
        // Default to home tab
        setActiveTab('home-nav');
      }
    }
  }

  // Add click event listeners to bottom nav items
  bottomNavItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      // If this is not a link to another page (e.g. #), prevent default behavior
      if (this.getAttribute('href') === '#') {
        e.preventDefault();

        // Only for links that don't navigate to another page
        // Clear the page reload flag when user clicks a tab
        sessionStorage.setItem('pageReloaded', 'false');

        // Remove active class from all items
        bottomNavItems.forEach((navItem) => {
          navItem.classList.remove('active');
        });

        // Add active class to clicked item
        this.classList.add('active');

        // Save the active tab ID
        localStorage.setItem('activeTabId', this.id);
      } else {
        // For links that navigate to another page
        // Set a flag to indicate this was a navigation, not a reload
        sessionStorage.setItem('pageReloaded', 'false');
        localStorage.setItem('activeTabId', this.id);
      }
    });
  });
  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('mobile-menu-close');

  if (menuToggle && mobileMenu) {
    // Toggle mobile menu
    menuToggle.addEventListener('click', function () {
      // Chỉ thêm class active khi mở menu
      if (!mobileMenu.classList.contains('active')) {
        menuToggle.classList.add('active');
        menuToggle.classList.add('hidden'); // Ẩn nút menu
        menuClose.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        menuToggle.classList.remove('active');
        menuToggle.classList.remove('hidden'); // Hiển thị lại nút menu
        menuClose.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu with close button
    if (menuClose) {
      menuClose.addEventListener('click', function () {
        // Thêm hiệu ứng slide khi đóng menu
        mobileMenu.classList.add('closing');

        // Đợi hiệu ứng hoàn thành rồi mới đóng menu hoàn toàn
        setTimeout(function () {
          menuToggle.classList.remove('active');
          menuToggle.classList.remove('hidden'); // Hiển thị lại nút menu
          menuClose.classList.remove('active');
          mobileMenu.classList.remove('active');
          mobileMenu.classList.remove('closing');
          document.body.style.overflow = '';
        }, 400); // Thời gian phải khớp với transition trong CSS
      });
    }

    // Close menu when clicking on menu items
    const menuItems = mobileMenu.querySelectorAll(
      '.category-box, .quick-link-item, .mobile-cta-button'
    );
    menuItems.forEach((item) => {
      item.addEventListener('click', function () {
        // Thêm hiệu ứng slide khi đóng menu
        mobileMenu.classList.add('closing');

        // Đợi hiệu ứng hoàn thành rồi mới đóng menu hoàn toàn
        setTimeout(function () {
          menuToggle.classList.remove('active');
          menuToggle.classList.remove('hidden'); // Hiển thị lại nút menu
          menuClose.classList.remove('active');
          mobileMenu.classList.remove('active');
          mobileMenu.classList.remove('closing');
          document.body.style.overflow = '';
        }, 400); // Thời gian phải khớp với transition trong CSS
      });
    });
  }

  // Contact popup functionality
  const contactButton = document.getElementById('contactButton');
  const contactPopup = document.getElementById('contactPopup');

  if (contactButton && contactPopup) {
    contactButton.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();

      // Toggle phone popup
      if (contactPopup.classList.contains('show')) {
        contactPopup.classList.remove('show');
        contactButton.classList.remove('active');
      } else {
        contactPopup.classList.add('show');
        contactButton.classList.add('active');
      }

      return false;
    });

    // Close popup when clicking outside
    document.addEventListener('click', function (e) {
      if (
        contactPopup.classList.contains('show') &&
        !contactButton.contains(e.target) &&
        !contactPopup.contains(e.target)
      ) {
        contactPopup.classList.remove('show');
        contactButton.classList.remove('active');
      }
    });
  }

  // FAQ Accordion
  const faqButtons = document.querySelectorAll('.faq-button');

  faqButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Toggle active class on button
      this.classList.toggle('active');

      // Get the content element
      const content = this.nextElementSibling;

      // Toggle active class on content
      content.classList.toggle('active');
    });
  });
});
