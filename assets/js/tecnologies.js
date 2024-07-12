document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('nav li');
    const techSections = document.querySelectorAll('.tech-section');
  
    navItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Remove active class from all items and sections
        navItems.forEach(i => i.classList.remove('active'));
        techSections.forEach(s => s.classList.remove('active'));
  
        // Add active class to current item
        this.classList.add('active');
  
        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
      });
    });
  });