// Posts Data (would normally be in a database)
let posts = [
    {
        id: 1,
        title: "My Journey from Chemistry to Tech",
        content: "After completing my Master's in Chemistry, I discovered my passion for technology during my cloud computing training at Sterlite Technologies. The transition wasn't easy, but the problem-solving skills I developed in chemistry have been surprisingly applicable in tech roles.",
        date: "June 15, 2023",
        image: "images/post1.jpg"
    },
    {
        id: 2,
        title: "Key Learnings from DevOps Training",
        content: "During my 6-month DevOps training program, I gained hands-on experience with AWS, Docker, and CI/CD pipelines. The most valuable lesson was understanding how automation can transform operational workflows - something I now apply daily in my role at Shadowfax.",
        date: "May 5, 2023",
        image: "images/post2.jpg"
    }
];

// DOM Elements
const postsContainer = document.getElementById('postsContainer');
const addPostForm = document.getElementById('addPostForm');
const addPostBtn = document.getElementById('addPostBtn');
const adminControls = document.getElementById('adminControls');
const adminModal = document.getElementById('adminModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.querySelector('.close');

// Admin Password (in production, use proper authentication)
const ADMIN_PASSWORD = "admin123"; // Change this in production

// Check if admin is logged in
let isAdmin = localStorage.getItem('isAdmin') === 'true';

// Initialize
renderPosts();
toggleAdminControls();

// Render all posts
function renderPosts() {
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-date">${post.date}</span>
                <p class="post-excerpt">${post.content}</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Toggle admin controls based on login status
function toggleAdminControls() {
    if (isAdmin) {
        adminControls.style.display = 'block';
    } else {
        adminControls.style.display = 'none';
        addPostForm.style.display = 'none';
    }
}

// Event Listeners
addPostBtn?.addEventListener('click', function() {
    addPostForm.style.display = addPostForm.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('submitPost')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const imageFile = document.getElementById('postImage').files[0];
    
    if (!title || !content) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create new post object
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: imageFile ? URL.createObjectURL(imageFile) : null
    };
    
    // Add to posts array
    posts.unshift(newPost);
    
    // Re-render posts
    renderPosts();
    
    // Reset form
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
    addPostForm.style.display = 'none';
    
    // In a real app, you would save to a database here
});

// Admin Login
loginBtn?.addEventListener('click', function() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        adminModal.style.display = 'none';
        toggleAdminControls();
        alert('Admin access granted!');
    } else {
        alert('Incorrect password!');
    }
});

closeModal?.addEventListener('click', function() {
    adminModal.style.display = 'none';
});

// Show admin modal when clicking admin access button
document.querySelector('[data-admin-access]')?.addEventListener('click', function(e) {
    e.preventDefault();
    adminModal.style.display = 'block';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
    }
});
