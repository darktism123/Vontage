// Fetch ข้อมูลจาก navbar_vontage.html และแทรกเข้าไปใน element ที่มี id 'header-container'
fetch('navbar_vontage.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
      }

      async function fetchProfile() {
          try {
              const response = await fetch('/profileRoutes/details');
              if (!response.ok) throw new Error('Failed to fetch profile data');

              const data = await response.json();
              document.getElementById('username').innerText = data.username;

              if (data.message === 'Logged in') {
                usernameSpan.textContent = data.username; // ตั้งชื่อผู้ใช้
                profileLink.href = '#'; // ปิดการเปลี่ยนหน้าไปยัง login
              } else {
                usernameSpan.textContent = data.username;
                profileLink.href = '/login'; // ลิงก์ไปที่หน้า login
              }
              // แสดงข้อมูลอื่น ๆ ที่ต้องการ
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        document.addEventListener('DOMContentLoaded', fetchProfile);
    
