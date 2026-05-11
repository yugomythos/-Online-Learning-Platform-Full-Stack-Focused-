const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const authButton = document.querySelector("#authButton");
const authDialog = document.querySelector("#authDialog");
const authForm = document.querySelector("#authForm");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const fallbackCourses = [
    {
        id: "spring-mvc-foundations",
        title: "Spring MVC Foundations",
        description: "Build controller-based Java web apps, expose REST endpoints, and organize a clean service layer.",
        category: "Backend",
        level: "Beginner",
        instructor: "Aarav Menon",
        durationMinutes: 180,
        featured: true,
        lessons: [
            { id: "mvc-1", title: "Request flow and controllers", minutes: 32, videoUrl: "https://www.youtube.com/embed/31KTdfRH6nY" },
            { id: "mvc-2", title: "Models, services, and validation", minutes: 44, videoUrl: "https://www.youtube.com/embed/31KTdfRH6nY" },
            { id: "mvc-3", title: "Building REST APIs", minutes: 52, videoUrl: "https://www.youtube.com/embed/31KTdfRH6nY" },
            { id: "mvc-4", title: "Final MVC project", minutes: 52, videoUrl: "https://www.youtube.com/embed/31KTdfRH6nY" }
        ]
    },
    {
        id: "javascript-interactivity",
        title: "JavaScript Interactivity",
        description: "Create dynamic browser experiences with DOM rendering, events, forms, and local persistence.",
        category: "Frontend",
        level: "Beginner",
        instructor: "Maya Rao",
        durationMinutes: 150,
        featured: true,
        lessons: [
            { id: "js-1", title: "DOM rendering basics", minutes: 28, videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk" },
            { id: "js-2", title: "Events and state", minutes: 36, videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk" },
            { id: "js-3", title: "LocalStorage patterns", minutes: 40, videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk" },
            { id: "js-4", title: "Interactive dashboard build", minutes: 46, videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk" }
        ]
    },
    {
        id: "responsive-ui-systems",
        title: "Responsive UI Systems",
        description: "Design course cards, dashboards, and detail views that stay clear on phone, tablet, and desktop.",
        category: "Design",
        level: "Intermediate",
        instructor: "Leah Fernandes",
        durationMinutes: 165,
        featured: true,
        lessons: [
            { id: "ui-1", title: "Layout fundamentals", minutes: 30, videoUrl: "https://www.youtube.com/embed/srvUrASNj0s" },
            { id: "ui-2", title: "Responsive grids", minutes: 42, videoUrl: "https://www.youtube.com/embed/srvUrASNj0s" },
            { id: "ui-3", title: "Accessible controls", minutes: 38, videoUrl: "https://www.youtube.com/embed/srvUrASNj0s" },
            { id: "ui-4", title: "Polished dashboard states", minutes: 55, videoUrl: "https://www.youtube.com/embed/srvUrASNj0s" }
        ]
    },
    {
        id: "mysql-data-design",
        title: "MySQL Data Design",
        description: "Model relational data, write practical SQL queries, and plan persistence for learning apps.",
        category: "Database",
        level: "Intermediate",
        instructor: "Neha Kapoor",
        durationMinutes: 210,
        featured: false,
        lessons: [
            { id: "sql-1", title: "Tables and relationships", minutes: 42, videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA" },
            { id: "sql-2", title: "Queries for dashboards", minutes: 50, videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA" },
            { id: "sql-3", title: "JDBC integration plan", minutes: 56, videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA" },
            { id: "sql-4", title: "Schema review", minutes: 62, videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA" }
        ]
    },
    {
        id: "full-stack-capstone",
        title: "Full Stack Capstone",
        description: "Combine MVC APIs, browser state, progress tracking, and admin workflows into one project.",
        category: "Full Stack",
        level: "Advanced",
        instructor: "Rohan Shah",
        durationMinutes: 240,
        featured: false,
        lessons: [
            { id: "cap-1", title: "App architecture", minutes: 45, videoUrl: "https://www.youtube.com/embed/zJSY8tbf_ys" },
            { id: "cap-2", title: "Enrollment flows", minutes: 55, videoUrl: "https://www.youtube.com/embed/zJSY8tbf_ys" },
            { id: "cap-3", title: "Progress and certificates", minutes: 60, videoUrl: "https://www.youtube.com/embed/zJSY8tbf_ys" },
            { id: "cap-4", title: "Deployment checklist", minutes: 80, videoUrl: "https://www.youtube.com/embed/zJSY8tbf_ys" }
        ]
    }
];

let courses = [];
let state = readState();

function readState() {
    return {
        enrolled: JSON.parse(localStorage.getItem("learnhub.enrolled") || "[]"),
        progress: JSON.parse(localStorage.getItem("learnhub.progress") || "{}"),
        user: JSON.parse(localStorage.getItem("learnhub.user") || "null"),
        adminCourses: JSON.parse(localStorage.getItem("learnhub.adminCourses") || "[]")
    };
}

function persist() {
    localStorage.setItem("learnhub.enrolled", JSON.stringify(state.enrolled));
    localStorage.setItem("learnhub.progress", JSON.stringify(state.progress));
    localStorage.setItem("learnhub.user", JSON.stringify(state.user));
    localStorage.setItem("learnhub.adminCourses", JSON.stringify(state.adminCourses));
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours ? `${hours}h ${mins ? `${mins}m` : ""}`.trim() : `${mins}m`;
}

function notify(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

async function loadCourses() {
    try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
            throw new Error("API unavailable");
        }
        courses = await response.json();
    } catch {
        courses = fallbackCourses;
    }
    const merged = new Map(courses.map((course) => [course.id, course]));
    state.adminCourses.forEach((course) => merged.set(course.id, course));
    courses = [...merged.values()];
}

function getCourse(id) {
    return courses.find((course) => course.id === id);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function progressFor(course) {
    const completed = state.progress[course.id] || [];
    if (!course.lessons.length) {
        return 0;
    }
    return Math.round((completed.length / course.lessons.length) * 100);
}

function isEnrolled(courseId) {
    return state.enrolled.includes(courseId);
}

function enroll(courseId) {
    if (!isEnrolled(courseId)) {
        state.enrolled.push(courseId);
        state.progress[courseId] = state.progress[courseId] || [];
        persist();
    }
    notify("Course added to My Courses.");
    render();
}

function unenroll(courseId) {
    state.enrolled = state.enrolled.filter((id) => id !== courseId);
    delete state.progress[courseId];
    persist();
    notify("Course removed.");
    render();
}

function toggleLesson(courseId, lessonId, checked) {
    const completed = new Set(state.progress[courseId] || []);
    if (checked) {
        completed.add(lessonId);
    } else {
        completed.delete(lessonId);
    }
    state.progress[courseId] = [...completed];
    persist();
    render();
}

function courseCard(course) {
    const progress = progressFor(course);
    return `
        <article class="course-card">
            <div class="stack">
                <span class="pill">${escapeHtml(course.category)} · ${escapeHtml(course.level)}</span>
                <h3>${escapeHtml(course.title)}</h3>
                <p>${escapeHtml(course.description)}</p>
                <div class="course-meta">
                    <span>${escapeHtml(course.instructor)}</span>
                    <span>${formatDuration(course.durationMinutes)}</span>
                    <span>${course.lessons.length} lessons</span>
                </div>
            </div>
            <div class="stack">
                ${isEnrolled(course.id) ? `<div class="progress-row"><div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div><strong>${progress}%</strong></div>` : ""}
                <div class="actions">
                    <a class="secondary-button" href="/courses/${course.id}" data-link>View details</a>
                    <button class="primary-button" data-enroll="${course.id}" type="button">${isEnrolled(course.id) ? "Enrolled" : "Enroll"}</button>
                </div>
            </div>
        </article>
    `;
}

function homeView() {
    const featured = courses.filter((course) => course.featured).slice(0, 3);
    const completedCount = state.enrolled.filter((id) => {
        const course = getCourse(id);
        return course && progressFor(course) === 100;
    }).length;
    return `
        <section class="section hero">
            <div>
                <p class="eyebrow">Full stack focused</p>
                <h1>LearnHub</h1>
                <p class="lead">Browse practical courses, enroll with one click, track lesson progress, and generate a certificate when you complete a course.</p>
                <div class="actions">
                    <a class="primary-button" href="/courses" data-link>Browse courses</a>
                    <a class="secondary-button" href="/my-courses" data-link>Open dashboard</a>
                </div>
                <div class="stats-strip" aria-label="Learning summary">
                    <div class="stat"><strong>${courses.length}</strong><span>Courses</span></div>
                    <div class="stat"><strong>${state.enrolled.length}</strong><span>Enrolled</span></div>
                    <div class="stat"><strong>${completedCount}</strong><span>Completed</span></div>
                </div>
            </div>
            <div class="hero-panel" role="img" aria-label="Students collaborating around laptops"></div>
        </section>
        <section class="section">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Featured</p>
                    <h2>Courses to start with</h2>
                </div>
                <a class="secondary-button" href="/courses" data-link>See all</a>
            </div>
            <div class="grid">${featured.map(courseCard).join("")}</div>
        </section>
    `;
}

function coursesView() {
    const categories = ["All", ...new Set(courses.map((course) => course.category))];
    return `
        <section class="section">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Catalog</p>
                    <h2>Course listing</h2>
                </div>
            </div>
            <div class="toolbar">
                <input class="search-box" id="searchInput" placeholder="Search by title, category, or instructor" value="${new URLSearchParams(location.search).get("q") || ""}">
                <select id="categoryFilter" aria-label="Filter by category">
                    ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
                </select>
            </div>
            <div class="grid" id="courseGrid"></div>
        </section>
    `;
}

function renderCourseGrid() {
    const grid = document.querySelector("#courseGrid");
    if (!grid) {
        return;
    }
    const query = document.querySelector("#searchInput").value.trim().toLowerCase();
    const category = document.querySelector("#categoryFilter").value;
    const filtered = courses.filter((course) => {
        const matchesQuery = [course.title, course.description, course.category, course.instructor].join(" ").toLowerCase().includes(query);
        const matchesCategory = category === "All" || course.category === category;
        return matchesQuery && matchesCategory;
    });
    grid.innerHTML = filtered.length ? filtered.map(courseCard).join("") : `<div class="empty-state"><h3>No courses found</h3><p class="muted">Try a different search or category.</p></div>`;
}

function detailView(courseId) {
    const course = getCourse(courseId);
    if (!course) {
        return `<section class="section"><div class="empty-state"><h2>Course not found</h2><a class="primary-button" href="/courses" data-link>Back to courses</a></div></section>`;
    }
    const progress = progressFor(course);
    const completed = new Set(state.progress[course.id] || []);
    return `
        <section class="section detail-layout">
            <div class="stack">
                <div>
                    <p class="eyebrow">${escapeHtml(course.category)} · ${escapeHtml(course.level)}</p>
                    <h1>${escapeHtml(course.title)}</h1>
                    <p class="lead">${escapeHtml(course.description)}</p>
                    <div class="course-meta">
                        <span>Instructor: ${escapeHtml(course.instructor)}</span>
                        <span>${formatDuration(course.durationMinutes)}</span>
                        <span>${course.lessons.length} lessons</span>
                    </div>
                </div>
                <iframe class="video-frame" title="${escapeHtml(course.title)} video preview" src="${course.lessons[0]?.videoUrl || ""}" allowfullscreen></iframe>
                <div>
                    <h2>Lessons</h2>
                    <div class="lesson-list">
                        ${course.lessons.map((lesson) => `
                            <label class="lesson-item">
                                <input type="checkbox" ${completed.has(lesson.id) ? "checked" : ""} ${isEnrolled(course.id) ? "" : "disabled"} data-lesson="${course.id}:${lesson.id}">
                                <strong>${escapeHtml(lesson.title)}</strong>
                                <span class="muted">${lesson.minutes} min</span>
                            </label>
                        `).join("")}
                    </div>
                </div>
            </div>
            <aside class="dashboard-panel stack">
                <h2>Your progress</h2>
                <div class="progress-row">
                    <div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div>
                    <strong>${progress}%</strong>
                </div>
                <p class="muted">${isEnrolled(course.id) ? "Check off lessons as you complete them." : "Enroll to unlock progress tracking."}</p>
                <button class="primary-button" data-enroll="${course.id}" type="button">${isEnrolled(course.id) ? "Enrolled" : "Enroll now"}</button>
                ${isEnrolled(course.id) ? `<button class="danger-button" data-unenroll="${course.id}" type="button">Remove from My Courses</button>` : ""}
                ${progress === 100 ? certificateMarkup(course) : ""}
            </aside>
        </section>
    `;
}

function dashboardView() {
    const enrolledCourses = state.enrolled.map(getCourse).filter(Boolean);
    if (!enrolledCourses.length) {
        return `
            <section class="section">
                <div class="empty-state">
                    <p class="eyebrow">My Courses</p>
                    <h2>No enrollments yet</h2>
                    <p class="muted">Pick a course from the catalog and it will appear here with progress tracking.</p>
                    <a class="primary-button" href="/courses" data-link>Browse courses</a>
                </div>
            </section>
        `;
    }
    return `
        <section class="section dashboard-layout">
            <div>
                <p class="eyebrow">Dashboard</p>
                <h1>My Courses</h1>
                <p class="lead">Continue lessons, simulate completion, and collect certificates when progress reaches 100%.</p>
                <div class="grid">${enrolledCourses.map(courseCard).join("")}</div>
            </div>
            <aside class="dashboard-panel stack">
                <h2>Account</h2>
                <p class="muted">${state.user ? `Signed in as ${escapeHtml(state.user.name)}` : "You are using local mock authentication."}</p>
                <button class="secondary-button" id="openAuthFromDashboard" type="button">${state.user ? "Edit profile" : "Sign in"}</button>
            </aside>
        </section>
    `;
}

function certificateMarkup(course) {
    const name = escapeHtml(state.user?.name || "Learner");
    return `
        <div class="certificate" id="certificate-${course.id}">
            <p class="eyebrow">Certificate</p>
            <h3>${name}</h3>
            <p class="muted">completed</p>
            <h3>${escapeHtml(course.title)}</h3>
            <p class="muted">${new Date().toLocaleDateString()}</p>
            <div class="certificate-actions">
                <button class="secondary-button" data-print-certificate="${course.id}" type="button">Print</button>
            </div>
        </div>
    `;
}

function adminView() {
    return `
        <section class="section">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Admin</p>
                    <h1>Add a course</h1>
                    <p class="lead">Create a draft course. The app saves it in localStorage and also posts it to the Spring API when the backend is running.</p>
                </div>
            </div>
            <form class="dashboard-panel admin-form" id="adminForm">
                <label>Title<input name="title" required placeholder="Example: JDBC Essentials"></label>
                <label>Instructor<input name="instructor" required placeholder="Instructor name"></label>
                <label>Category<input name="category" required placeholder="Backend"></label>
                <label>Level
                    <select name="level">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </label>
                <label>Duration minutes<input name="durationMinutes" type="number" min="15" value="120" required></label>
                <label class="wide">Description<textarea name="description" rows="4" required placeholder="What learners will build"></textarea></label>
                <button class="primary-button wide" type="submit">Add course</button>
            </form>
        </section>
    `;
}

function navigate(path) {
    history.pushState({}, "", path);
    navLinks.classList.remove("open");
    render();
}

function routeView() {
    const path = location.pathname;
    if (path === "/") {
        return homeView();
    }
    if (path === "/courses") {
        return coursesView();
    }
    if (path.startsWith("/courses/")) {
        return detailView(path.split("/").pop());
    }
    if (path === "/my-courses") {
        return dashboardView();
    }
    if (path === "/admin") {
        return adminView();
    }
    return homeView();
}

function bindPageEvents() {
    const searchInput = document.querySelector("#searchInput");
    const categoryFilter = document.querySelector("#categoryFilter");
    if (searchInput && categoryFilter) {
        searchInput.addEventListener("input", renderCourseGrid);
        categoryFilter.addEventListener("change", renderCourseGrid);
        renderCourseGrid();
    }

    const adminForm = document.querySelector("#adminForm");
    if (adminForm) {
        adminForm.addEventListener("submit", submitAdminCourse);
    }

    const dashboardAuth = document.querySelector("#openAuthFromDashboard");
    if (dashboardAuth) {
        dashboardAuth.addEventListener("click", openAuthDialog);
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.pathname === location.pathname);
    });
}

async function submitAdminCourse(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    data.durationMinutes = Number(data.durationMinutes);
    let createdCourse;
    try {
        const response = await fetch("/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            createdCourse = await response.json();
        }
    } catch {
        createdCourse = null;
    }

    if (!createdCourse) {
        const id = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        createdCourse = {
            ...data,
            id,
            featured: false,
            lessons: [
                { id: `${id}-intro`, title: "Course overview", minutes: 15, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
                { id: `${id}-practice`, title: "Guided practice", minutes: Math.max(20, Math.round(data.durationMinutes / 2)), videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
                { id: `${id}-project`, title: "Mini project", minutes: Math.max(25, Math.round(data.durationMinutes / 3)), videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
            ]
        };
    }

    state.adminCourses = state.adminCourses.filter((course) => course.id !== createdCourse.id);
    state.adminCourses.push(createdCourse);
    persist();
    await loadCourses();
    notify("Course added.");
    navigate(`/courses/${createdCourse.id}`);
}

function openAuthDialog() {
    document.querySelector("#authName").value = state.user?.name || "";
    document.querySelector("#authEmail").value = state.user?.email || "";
    authDialog.showModal();
}

function updateAuthButton() {
    authButton.textContent = state.user ? state.user.name : "Sign in";
}

function render() {
    app.innerHTML = routeView();
    bindPageEvents();
    updateAuthButton();
    app.focus({ preventScroll: true });
}

authButton.addEventListener("click", openAuthDialog);
authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(authForm);
    state.user = {
        name: form.get("name"),
        email: form.get("email")
    };
    persist();
    authDialog.close();
    notify("Profile saved.");
    render();
});

document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");
    if (link) {
        event.preventDefault();
        navigate(link.getAttribute("href"));
        return;
    }

    const enrollButton = event.target.closest("[data-enroll]");
    if (enrollButton) {
        enroll(enrollButton.dataset.enroll);
        return;
    }

    const unenrollButton = event.target.closest("[data-unenroll]");
    if (unenrollButton) {
        unenroll(unenrollButton.dataset.unenroll);
        return;
    }

    const certificateButton = event.target.closest("[data-print-certificate]");
    if (certificateButton) {
        window.print();
    }
});

document.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-lesson]");
    if (checkbox) {
        const [courseId, lessonId] = checkbox.dataset.lesson.split(":");
        toggleLesson(courseId, lessonId, checkbox.checked);
    }
});

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
window.addEventListener("popstate", render);

loadCourses().then(render);
