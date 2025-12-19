// Shared JavaScript Utilities

// Load JSON data
async function loadJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load data');
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
    return [];
  }
}

// Format date
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Format currency
function formatCurrency(amount) {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Get status display name
function getStatusDisplayName(status) {
  const statusMap = {
    'IN_STOCK': 'In Stock',
    'IN_USE': 'In Use',
    'BROKEN': 'Broken',
    'MAINTENANCE': 'Maintenance',
    'PENDING_RECALL': 'Pending Recall',
    'PENDING_HANDOVER': 'Pending Handover',
    'LOST': 'Lost',
    'LIQUIDATED': 'Liquidated',
    'ACTIVE': 'Active',
    'EXPIRED': 'Expired'
  };
  return statusMap[status] || status;
}

// Get device type icon
function getDeviceIcon(type) {
  const iconMap = {
    'Laptop': '💻',
    'PC Case': '🖥️',
    'Monitor': '🖥️',
    'Keyboard': '⌨️',
    'Mouse': '🖱️',
    'RAM': '🧠',
    'CPU': '⚙️',
    'SSD': '💾',
    'HDD': '💿',
    'Desk': '🪑',
    'Chair': '🪑',
    'Router': '📡',
    'Fan': '🌀'
  };
  return iconMap[type] || '📦';
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
    color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Sidebar toggle functionality
function initSidebarToggle() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const header = document.querySelector('.header');
  
  if (sidebarToggle && sidebar) {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
      sidebar.classList.add('collapsed');
      if (mainContent) {
        mainContent.classList.add('sidebar-collapsed');
      }
      if (header) {
        header.classList.add('collapsed');
      }
    }
    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      if (mainContent) {
        mainContent.classList.toggle('sidebar-collapsed');
      }
      if (header) {
        header.classList.toggle('collapsed');
      }
      
      // Save state to localStorage
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && 
          !sidebar.contains(e.target) && 
          !toggle.contains(e.target) &&
          sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initMobileMenu();
});

// Export for use in other scripts
window.AssetFlowUtils = {
  loadJSON,
  formatDate,
  formatCurrency,
  getStatusDisplayName,
  getDeviceIcon,
  debounce,
  showToast
};

